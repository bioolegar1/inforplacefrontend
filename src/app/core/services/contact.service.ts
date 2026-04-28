import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactRequest {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly http = inject(HttpClient);

  // Lógica: Construímos a URL final de forma dinâmica
  // Se for DEV: http://localhost:8080/v1/apiemail/enviar
  // Se for PROD: /api/v1/apiemail/enviar
  private readonly API_URL = `${environment.apiEmail}/enviar`;

  sendEmail(data: ContactRequest): Observable<void> {
    return this.http.post<void>(this.API_URL, data);
  }
}
