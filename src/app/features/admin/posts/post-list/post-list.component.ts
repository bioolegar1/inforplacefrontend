// features/admin/posts/post-list/post-list.component.ts

import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {PostService} from '../../../../core/services/post.service';
import {PostListItem} from '../../../../core/models/post.model';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  private postService = inject(PostService);

  posts = signal<PostListItem[]>([]);
  isLoading = signal(true);

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.isLoading.set(true);
    // Lógica: Busca todos os conteúdos (Admin), independente do tipo
    this.postService.getAllPosts(undefined, 0, 100).subscribe({
      next: (page) => {
        this.posts.set(page.content);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Erro ao carregar postagens:', err);
        this.isLoading.set(false);
      }
    });
  }

  deletePost(id: number) {
    if (confirm('Tem certeza que deseja excluir este conteúdo?')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts.update(list => list.filter(p => p.id !== id));
        },
        error: (err: any) => console.error('Erro ao excluir:', err)
      });
    }
  }

  // Lógica: Utilitário para retornar o ícone baseado no tipo
  getTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      'TUTORIAL': '📚',
      'TIP': '💡',
      'NEWS': '📰',
      'RELEASE_NOTE': '📝'
    };
    return icons[type] || '📄';
  }
}
