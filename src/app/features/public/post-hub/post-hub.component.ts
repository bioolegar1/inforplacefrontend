import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../core/services/post.service';
import { PostListItem, PostType, ProductSystem } from '../../../core/models/post.model';

@Component({
  selector: 'app-post-hub',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './post-hub.component.html',
  styleUrl: './post-hub.component.css'
})
export class PostHubComponent implements OnInit {
  private postService = inject(PostService);

  // Estados principais
  private allPosts = signal<PostListItem[]>([]);
  isLoading = signal(true);

  // Estados de Filtro
  searchTerm = signal('');
  selectedType = signal<PostType | null>(null);
  selectedSystem = signal<ProductSystem | null>(null);

  // Listas para os botões de filtro
  postTypes = Object.values(PostType);
  systems = Object.values(ProductSystem);

  // Lógica: Filtro reativo que combina busca por nome, tipo e sistema
  filteredPosts = computed(() => {
    return this.allPosts().filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(this.searchTerm().toLowerCase());
      const matchesType = !this.selectedType() || post.type === this.selectedType();
      const matchesSystem = !this.selectedSystem() || post.productSystem === this.selectedSystem();
      return matchesSearch && matchesType && matchesSystem;
    });
  });

  ngOnInit() {
    this.loadPublicPosts();
  }

  loadPublicPosts() {
    this.isLoading.set(true);
    // Lógica: Busca as últimas 10 postagens publicadas
    this.postService.getPublishedPosts(0, 10).subscribe({
      next: (page) => {
        this.allPosts.set(page.content);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  // Lógica: Alterna o filtro de tipo (se clicar no mesmo, limpa o filtro)
  toggleType(type: PostType) {
    this.selectedType.update(current => current === type ? null : type);
  }

  // Lógica: Alterna o filtro de sistema
  toggleSystem(system: ProductSystem) {
    this.selectedSystem.update(current => current === system ? null : system);
  }

  // Utilitário para ícones baseado no tipo (Sincronizado com o Admin)
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
