import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Importacao do arquivo de ambiente para controle dinamico de URL

// IMPORTANTE: Importamos o que criamos no model
import {
  CreatePostRequest,
  UpdatePostRequest,
  PostResponse,
  DashboardStats,
  PostRequest
} from '../models/post.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);

  // A variavel API_URL agora e montada unindo a base do ambiente com o endpoint especifico
  private readonly API_URL = `${environment.apiUrl}/admin/posts`;

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.API_URL}/stats`);
  }

  getPosts(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(this.API_URL, { params });
  }

  createPost(post: PostRequest): Observable<PostResponse> {
    return this.http.post<PostResponse>(this.API_URL, post);
  }

  updatePost(id: number, post: PostRequest): Observable<PostResponse> {
    return this.http.put<PostResponse>(`${this.API_URL}/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
