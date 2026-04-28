import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Adicionado HttpParams
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // A base URL agora e dinamica, puxando a configuracao do arquivo de environment ativo.
  protected baseUrl = environment.apiUrl;

  protected http = inject(HttpClient);

  // CORRECAO: Adicionado 'params?' como segundo argumento opcional
  protected get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, { params });
  }

  protected post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, body);
  }

  protected put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${url}`, body);
  }

  protected patch<T>(url: string, body: any = {}): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${url}`, body);
  }

  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${url}`);
  }
}
