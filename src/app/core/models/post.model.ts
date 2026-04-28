// core/models/post.model.ts

// Lógica: Enums que espelham exatamente o que temos no Java
export enum PostType {
  RELEASE_NOTE = 'RELEASE_NOTE',
  TUTORIAL = 'TUTORIAL',
  TIP = 'TIP',
  NEWS = 'NEWS'
}

export enum ProductSystem {
  PILLAR = 'PILLAR',
  SAFE = 'SAFE',
  SAO = 'SAO',
  PVINFO = 'PVINFO',
  NOTAINFO = 'NOTAINFO',
  COLETORXML = 'COLETORXML',
  PILLAR_MOBILE = 'PILLAR_MOBILE'
}


export interface DashboardStats {
  totalPosts: number;
  totalPublished: number;
  totalDrafts: number;
  totalTutorials: number;
  totalReleaseNotes: number;
  totalTips: number;
  totalNews: number;
  totalViews: number;
  totalUsers: number;
}

// Lógica: Interface para ler dados do Backend (PostResponse no Java)
export interface PostResponse {
  id: number;
  title: string;
  slug: string;
  type: PostType;
  productSystem: ProductSystem;
  version?: string;
  category?: string;
  summary: string;
  coverImage?: string;
  contentBlocks: any[];
  isPublished: boolean;
  publishedAt?: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// Lógica: Interface para criar novos conteúdos (Resolve o erro TS2552)
export interface CreatePostRequest {
  title: string;
  slug: string;
  type: PostType;
  productSystem: ProductSystem;
  version?: string;
  category?: string;
  summary: string;
  coverImage?: string;
  contentBlocks: any[];
  isPublished: boolean;
}
export interface PostRequest {
  title: string;
  slug: string;
  type: PostType;
  productSystem: ProductSystem;
  version?: string;
  category?: string;
  summary: string;
  coverImage?: string;
  contentBlocks: any[];
  isPublished: boolean;
}

// Lógica: Interface para atualizar conteúdos existentes
export interface CreatePostRequest extends PostRequest {}
export interface UpdatePostRequest extends PostRequest {}

// Lógica: Interface leve para a tabela de listagem
export interface PostListItem {
  id: number;
  title: string;
  slug: string;
  summary: string;      // Logica: Necessario para exibir a breve descricao no card do Hub.
  coverImage?: string;  // Logica: Necessario para carregar a miniatura no grid publico.
  type: PostType;
  productSystem: ProductSystem;
  version?: string;
  isPublished: boolean;
  publishedAt?: string;
  viewCount: number;
  createdAt: string;
}


export interface Post {
  id: number;
  title: string;
  slug: string;
  type: PostType;
  productSystem: ProductSystem;
  version?: string;
  category?: string;
  summary: string;
  coverImage?: string;
  contentBlocks: any[];
  isPublished: boolean;
  publishedAt?: string;
  viewCount: number;
  createdBy?: number;
  createdAt: string;
  updatedAt: string;
}

// Lógica: Alias para manter compatibilidade se você usar o nome PostResponse
export interface PostResponse extends Post {}

