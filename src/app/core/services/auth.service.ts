import { Injectable, inject, signal, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
// Lógica: Importamos o environment para pegar a base da URL dinamicamente
import { environment } from '../../../environments/environment'; // Ajuste este caminho conforme a pasta do seu projeto

interface LoginResponse {
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  // Lógica: A URL base vem do ambiente + o caminho específico deste serviço
  private readonly API_URL = `${environment.apiUrl}/auth`;

  currentUser = signal<any>(null);

  constructor() {
    this.tryAutoLogin();
  }

  login(credentials: any): Observable<LoginResponse> {
    // A concatenação aqui resultará em ambiente.apiUrl/auth/login
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        this.currentUser.set(response.user);
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.currentUser.set(null);
    this.router.navigate(['/admin/login']);
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private tryAutoLogin() {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (user && token) {
        this.currentUser.set(JSON.parse(user));
      }
    }
  }
}
