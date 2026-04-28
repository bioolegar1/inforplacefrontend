import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReleaseService } from '../../../../core/services/release.service';
import { ReleaseNote } from '../../../../core/models/release-note.model';
import {BlockRendererComponent} from '../../../../ui/blocks/block-renderer/block-renderer.component';
// 👇 Importação do seu Renderizador de Blocos
@Component({
  selector: 'app-release-detail',
  standalone: true,
  imports: [CommonModule, BlockRendererComponent],
  template: `
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12 transition-colors duration-300">

      @if (loading()) {
        <div class="container mx-auto px-4 py-8 animate-pulse max-w-4xl">
          <div class="h-64 bg-gray-200 dark:bg-gray-800 w-full rounded-2xl mb-8"></div>
          <div class="h-8 bg-gray-200 dark:bg-gray-800 w-32 mb-6 rounded"></div>
          <div class="h-10 bg-gray-200 dark:bg-gray-800 w-3/4 mb-4 rounded"></div>
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 dark:bg-gray-800 w-full rounded"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-800 w-full rounded"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-800 w-2/3 rounded"></div>
          </div>
        </div>
      }

      @else if (error()) {
        <div class="container mx-auto px-4 py-20 text-center">
          <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 inline-block max-w-md">
            <div class="text-4xl mb-4">😕</div>
            <h2 class="text-xl font-bold text-red-800 dark:text-red-400 mb-2">Ops! Algo deu errado.</h2>
            <p class="text-red-600 dark:text-red-300 mb-6">{{ error() }}</p>
            <button
              (click)="goBack()"
              class="px-6 py-2 bg-white dark:bg-slate-800 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors shadow-sm"
            >
              Voltar para a lista
            </button>
          </div>
        </div>
      }

      @else {
        @if (release(); as item) {

          <div class="relative w-full h-[400px] md:h-[500px] bg-slate-900 overflow-hidden">
            @if (item.coverImage) {
              <div class="absolute inset-0">
                <img [src]="item.coverImage" [alt]="item.title" class="w-full h-full object-cover opacity-50 blur-sm scale-105">
              </div>
            } @else {
              <div class="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center opacity-50">
                <span class="text-white/5 text-9xl font-black tracking-tighter select-none">IP</span>
              </div>
            }

            <div class="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 via-transparent to-black/30"></div>

            <button
              (click)="goBack()"
              class="absolute top-6 left-6 z-30 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium transition-all border border-white/20"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
              Voltar
            </button>

            <div class="absolute bottom-0 left-0 w-full z-20 pb-16 pt-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent">
              <div class="container mx-auto px-4 max-w-4xl">

                <div class="flex flex-wrap items-center gap-3 mb-4 animate-fade-in-up">
                  <span class="px-3 py-1 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-blue-900/20">
                    {{ item.category || 'Geral' }}
                  </span>

                  <span class="px-3 py-1 bg-white/20 backdrop-blur-md text-slate-800 dark:text-white border border-white/30 text-xs font-mono font-semibold rounded-full">
                    v{{ item.version }}
                  </span>

                  <span class="text-slate-500 dark:text-slate-400 text-sm font-medium ml-auto flex items-center gap-1.5">
                    <svg class="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    {{ formatDate(item.publishedAt || item.createdAt) }}
                  </span>
                </div>

                <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-6 animate-fade-in-up delay-100 drop-shadow-sm">
                  {{ item.title }}
                </h1>

                @if (item.summary) {
                  <p class="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light leading-relaxed max-w-3xl animate-fade-in-up delay-200">
                    {{ item.summary }}
                  </p>
                }
              </div>
            </div>
          </div>

          <article class="container mx-auto px-4 max-w-4xl relative z-10">
            <div class="prose prose-lg dark:prose-invert max-w-none">

              @if (item.blocks && item.blocks.length > 0) {
                <app-block-renderer [blocks]="item.blocks"></app-block-renderer>
              }

              @else if (item.content) {
                <div [innerHTML]="item.content"></div>
              }

              @else {
                <div class="py-12 text-center text-slate-400 italic bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                  Esta nota de atualização não possui conteúdo detalhado.
                </div>
              }

            </div>
          </article>
        }
      }
    </div>
  `
})
export class ReleaseDetailComponent implements OnInit {
  release = signal<ReleaseNote | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private releaseService = inject(ReleaseService);

  ngOnInit(): void {
    // Escuta mudanças na rota para recarregar se o slug mudar
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.fetchRelease(slug);
      } else {
        this.error.set('Identificador da nota não encontrado.');
        this.loading.set(false);
      }
    });
  }

  fetchRelease(slug: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.releaseService.getReleaseBySlug(slug).subscribe({
      next: (data) => {
        // =========================================================
        // 🔧 MAPEAMENTO CRÍTICO (Backend Java -> Frontend Angular)
        // =========================================================
        // O Java manda 'contentBlocks'. O Front espera 'blocks'.
        // Mapeamos aqui para garantir que o renderizador funcione.
        const blocksMapped = data.contentBlocks || data.blocks || [];

        const safeData: ReleaseNote = {
          ...data,
          blocks: blocksMapped,
          // Garante uma categoria padrão se o backend mandar null
          category: data.category || 'Geral'
        };

        this.release.set(safeData);
        this.loading.set(false);

        // (Opcional) Registrar visualização silenciosamente
        // this.releaseService.incrementViewCount(slug).subscribe();
      },
      error: (err) => {
        console.error('Erro ao buscar release:', err);
        this.error.set('Não foi possível carregar os detalhes desta atualização. Verifique sua conexão.');
        this.loading.set(false);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  formatDate(dateStr: string | undefined): string {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  }
}
