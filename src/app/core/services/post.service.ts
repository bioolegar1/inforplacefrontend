// core/services/post.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import {
  Post,
  PostListItem,
  CreatePostRequest,
  UpdatePostRequest,
  PostType
} from '../models/post.model';
import { Page } from '../models/release-note.model';

@Injectable({
  providedIn: 'root'
})
export class PostService extends ApiService {

  // ========== ENDPOINTS PÚBLICOS (Sem Token) ==========

  getPublishedPosts(page: number = 0, size: number = 10): Observable<Page<PostListItem>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'publishedAt,desc');

    // Lógica: O ApiService deve concatenar o path com a URL base (ex: http://localhost:8080/api)
    return this.get<Page<PostListItem>>('/public/posts', params);
  }

  getPostBySlug(slug: string): Observable<Post> {
    return this.get<Post>(`/public/posts/${slug}`);
  }

  incrementViewCount(slug: string): Observable<void> {
    return this.post<void>(`/public/posts/${slug}/view`, {});
  }

  // ========== ENDPOINTS ADMIN (Com Token) ==========

  getAllPosts(type?: PostType, page: number = 0, size: number = 10): Observable<Page<PostListItem>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (type) params = params.set('type', type);

    return this.get<Page<PostListItem>>('/admin/posts', params);
  }

  // Lógica: Envia o CreatePostRequest para o endpoint POST do Admin
  createPost(request: CreatePostRequest): Observable<Post> {
    return this.post<Post>('/admin/posts', request);
  }

  getPostById(id: number): Observable<Post> {
    return this.get<Post>(`/admin/posts/${id}`);
  }

  // Lógica: Envia o UpdatePostRequest para o endpoint PUT com ID na URL
  updatePost(id: number, request: UpdatePostRequest): Observable<Post> {
    return this.put<Post>(`/admin/posts/${id}`, request);
  }

  deletePost(id: number): Observable<void> {
    return this.delete<void>(`/admin/posts/${id}`);
  }
}
