import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { DashboardService } from '../../../core/services/dashboard.service';
// IMPORTANTE: Importamos o modelo centralizado
import { DashboardStats } from '../../../core/models/post.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  public authService = inject(AuthService);

  isLoading = signal(true);
  error = signal('');

  greeting = computed(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  });

  // LÓGICA: Atualizamos o Array de Stats para refletir todos os tipos de posts do Inforplace
  stats = signal([
    { title: 'Total Geral', value: 0, icon: '📊', color: 'bg-slate-500' },
    { title: 'Tutoriais', value: 0, icon: '📚', color: 'bg-blue-500' },
    { title: 'Notas de Release', value: 0, icon: '📝', color: 'bg-green-500' },
    { title: 'Dicas Rápidas', value: 0, icon: '💡', color: 'bg-amber-500' },
    { title: 'Notícias', value: 0, icon: '📰', color: 'bg-cyan-500' },
    { title: 'Total Views', value: 0, icon: '👁️', color: 'bg-orange-500' },
    { title: 'Editores', value: 0, icon: '👥', color: 'bg-purple-500' }
  ]);

  recentActivities = signal([
    { text: 'Painel administrativo carregado', time: 'Agora mesmo', type: 'info' },
    { text: 'Conexão com API estabelecida', time: '5 min atrás', type: 'success' }
  ]);

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.isLoading.set(true);

    // LÓGICA: O 'data' agora segue o contrato da interface DashboardStats do post.model.ts
    this.dashboardService.getStats().subscribe({
      next: (data: DashboardStats) => {
        this.stats.set([
          { title: 'Total Geral', value: data.totalPosts, icon: '📊', color: 'bg-slate-500' },
          { title: 'Tutoriais', value: data.totalTutorials, icon: '📚', color: 'bg-blue-500' },
          { title: 'Notas de Release', value: data.totalReleaseNotes, icon: '📝', color: 'bg-green-500' },
          { title: 'Dicas Rápidas', value: data.totalTips, icon: '💡', color: 'bg-amber-500' },
          { title: 'Notícias', value: data.totalNews, icon: '📰', color: 'bg-cyan-500' },
          { title: 'Total Views', value: data.totalViews, icon: '👁️', color: 'bg-orange-500' },
          { title: 'Editores', value: data.totalUsers, icon: '👥', color: 'bg-purple-500' }
        ]);

        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar dashboard', err);
        this.error.set('Erro na comunicação com o servidor. Verifique se o backend está rodando.');
        this.isLoading.set(false);
      }
    });
  }
}
