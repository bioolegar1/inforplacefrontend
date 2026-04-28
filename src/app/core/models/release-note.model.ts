import { ContentBlock } from './blocks/content-block.interface';

// =========================================================
// 1. DTOs DE RESPOSTA (GET)
// =========================================================

export interface ReleaseNoteListItem {
  id: number;
  title: string;
  slug: string;
  version: string;
  summary: string;
  coverImage?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt?: string;   // <--- ADICIONE ESTA LINHA AQUI
  viewCount?: number;
  category?: string; // Opcional
}

export interface ReleaseNote {
  id: number;
  title: string;
  slug: string;
  version: string;
  summary: string;
  coverImage?: string;
  isPublished: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  viewCount?: number;

  // --- Campos de Compatibilidade Front/Back ---
  // O Backend manda 'contentBlocks'. O Front antigo usava 'blocks'.
  // Declaramos ambos para fazer o mapeamento no componente.
  contentBlocks?: ContentBlock[];
  blocks?: ContentBlock[];

  // Campos opcionais que podem não vir do backend, mas o front usa
  category?: string;
  content?: string; // HTML legado
}

// =========================================================
// 2. DTOs DE ENVIO (POST/PUT)
// =========================================================

export interface CreateReleaseNoteRequest {
  title: string;
  slug: string;
  version: string;
  summary: string;
  coverImage?: string;
  contentBlocks: ContentBlock[];
  isPublished: boolean;
}

export interface UpdateReleaseNoteRequest extends CreateReleaseNoteRequest {}

// =========================================================
// 3. PAGINAÇÃO
// =========================================================

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
