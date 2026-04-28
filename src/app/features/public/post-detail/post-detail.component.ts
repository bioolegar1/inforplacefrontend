// features/public/post-detail/post-detail.component.ts

import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { PostResponse } from '../../../core/models/post.model';
import {BlockRendererComponent} from '../../../ui/blocks/block-renderer/block-renderer.component';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, BlockRendererComponent],
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private postService = inject(PostService);

  // Lógica: Declaramos a propriedade 'post' como um Signal para resolver o erro TS2339.
  post = signal<PostResponse | null>(null);
  isLoading = signal(true);

  ngOnInit() {
    // Lógica: Corrigido de 'snapshotMap' para 'snapshot.paramMap' para resolver o erro TS2551.
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.loadPost(slug);
    } else {
      this.isLoading.set(false);
    }
  }

  private loadPost(slug: string) {
    this.postService.getPostBySlug(slug).subscribe({
      next: (data) => {
        this.post.set(data);
        this.isLoading.set(false);

        // Lógica: Incrementa visualizações após o carregamento bem-sucedido.
        this.postService.incrementViewCount(slug).subscribe();
      },
      error: (err) => {
        console.error('Erro ao carregar postagem:', err);
        this.isLoading.set(false);
      }
    });
  }
}
