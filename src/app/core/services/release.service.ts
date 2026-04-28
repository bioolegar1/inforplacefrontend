import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { HttpParams } from '@angular/common/http';
import {
  ReleaseNote,
  ReleaseNoteListItem,
  CreateReleaseNoteRequest,
  UpdateReleaseNoteRequest,
  Page
} from '../models/release-note.model';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService extends ApiService {
  private apiUrl = 'http://localhost:8080/api/admin/releases';
  private publicUrl = 'http://localhost:8080/api/public/releases';

  // ========== ENDPOINTS PÚBLICOS ==========

  getPublishedReleases(page: number = 0, size: number = 10): Observable<Page<ReleaseNoteListItem>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', 'publishedAt,desc');

    return this.get<Page<ReleaseNoteListItem>>('/public/releases', params);
  }

  getReleaseBySlug(slug: string): Observable<ReleaseNote> {
    return this.get<ReleaseNote>(`/public/releases/${slug}`);
  }

  incrementViewCount(slug: string): Observable<void> {
    return this.post<void>(`/public/releases/${slug}/view`, {});
  }

  // ========== ENDPOINTS ADMIN ==========

  getAllReleases(published?: boolean, page: number = 0, size: number = 10): Observable<Page<ReleaseNoteListItem>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (published !== undefined) {
      params = params.set('published', published.toString());
    }

    return this.get<Page<ReleaseNoteListItem>>('/admin/releases', params);
  }

  createRelease(request: CreateReleaseNoteRequest): Observable<ReleaseNote> {
    return this.post<ReleaseNote>('/admin/releases', request);
  }
  getReleaseById(id: number): Observable<ReleaseNote> {
    return this.http.get<ReleaseNote>(`${this.apiUrl}/${id}`);
  }

  updateRelease(id: number, request: UpdateReleaseNoteRequest): Observable<ReleaseNote> {
    return this.put<ReleaseNote>(`/admin/releases/${id}`, request);
  }

  deleteRelease(id: number): Observable<void> {
    return this.delete<void>(`/admin/releases/${id}`);
  }
}
