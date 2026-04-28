import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReleaseService} from '../../../../core/services/release.service';
import { ReleaseNoteListItem } from '../../../../core/models/release-note.model';

@Component({
  selector: 'app-release-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Hero Section -->
      <div class="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div class="container mx-auto px-4">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-center">
            📢 Notas de Atualização
          </h1>
          <p class="text-xl text-center text-primary-100 max-w-2xl mx-auto">
            Acompanhe todas as novidades, melhorias e correções do sistema Inforplace
          </p>
        </div>
      </div>

      <!-- Releases List -->
      <div class="container mx-auto px-4 py-12">
        @if (loading()) {
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (i of [1,2,3,4,5,6]; track i) {
              <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            }
          </div>
        } @else if (error()) {
          <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p class="text-red-800 font-semibold mb-2">❌ Erro ao carregar releases</p>
            <p class="text-red-600 text-sm">{{ error() }}</p>
            <button
              (click)="loadReleases()"
              class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Tentar novamente
            </button>
          </div>
        } @else if (releases().length === 0) {
          <div class="text-center py-16">
            <div class="text-6xl mb-4">📭</div>
            <h3 class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Nenhuma atualização disponível
            </h3>
            <p class="text-gray-500 dark:text-gray-400">
              Em breve teremos novidades por aqui!
            </p>
          </div>
        } @else {
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (release of releases(); track release.id) {
              <article
                class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                (click)="navigateToDetail(release.slug)"
              >
                <!-- Cover Image -->
                @if (release.coverImage) {
                  <div class="h-48 overflow-hidden">
                    <img
                      [src]="release.coverImage"
                      [alt]="release.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                } @else {
                  <div class="h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                    <span class="text-6xl">🚀</span>
                  </div>
                }

                <div class="p-6">
                  <!-- Version Badge -->
                  <span class="inline-block px-3 py-1 bg-primary-100 text-primary-800 text-xs font-semibold rounded-full mb-3">
                    {{ release.version }}
                  </span>

                  <!-- Title -->
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                    {{ release.title }}
                  </h2>

                  <!-- Summary -->
                  @if (release.summary) {
                    <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {{ release.summary }}
                    </p>
                  }

                  <!-- Footer -->
                  <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>📅 {{ formatDate(release.publishedAt || release.createdAt) }}</span>
                    <span>👁️ {{ release.viewCount }} visualizações</span>
                  </div>
                </div>
              </article>
            }
          </div>

          <!-- Pagination -->
          @if (totalPages() > 1) {
            <div class="flex justify-center gap-2 mt-8">
              <button
                [disabled]="currentPage() === 0"
                (click)="changePage(currentPage() - 1)"
                class="px-4 py-2 bg-white dark:bg-gray-800 rounded shadow disabled:opacity-50"
              >
                ← Anterior
              </button>

              <span class="px-4 py-2 bg-primary-600 text-white rounded">
                {{ currentPage() + 1 }} / {{ totalPages() }}
              </span>

              <button
                [disabled]="currentPage() >= totalPages() - 1"
                (click)="changePage(currentPage() + 1)"
                class="px-4 py-2 bg-white dark:bg-gray-800 rounded shadow disabled:opacity-50"
              >
                Próxima →
              </button>
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class ReleaseListComponent implements OnInit {
  releases = signal<ReleaseNoteListItem[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  currentPage = signal(0);
  totalPages = signal(0);

  constructor(
    private releaseService: ReleaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReleases();
  }

  loadReleases(): void {
    this.loading.set(true);
    this.error.set(null);

    this.releaseService.getPublishedReleases(this.currentPage(), 12).subscribe({
      next: (page) => {
        this.releases.set(page.content);
        this.totalPages.set(page.totalPages);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      }
    });
  }

  changePage(page: number): void {
    this.currentPage.set(page);
    this.loadReleases();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateToDetail(slug: string): void {
    this.router.navigate(['/releases', slug]);
  }

  formatDate(dateStr: string | undefined): string {
    // @ts-ignore
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}
