import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // =========================================================
  // AREA PUBLICA (Visão do Cliente)
  // =========================================================

  {
    path: '',
    title: 'Inforplace Sistemas',
    loadComponent: () => import('./features/public/home.component').then(m => m.HomeComponent)
  },

  // Logica: O Hub de postagens substitui ou complementa o antigo releases
  {
    path: 'posts',
    title: 'Inforplace - Central de Conteudo',
    loadComponent: () => import('./features/public/post-hub/post-hub.component').then(m => m.PostHubComponent)
  },

  // Logica: Rota dinamica usando :slug para carregar o conteudo do banco
  {
    path: 'posts/:slug',
    title: 'Visualizar Postagem',
    loadComponent: () => import('./features/public/post-detail/post-detail.component').then(m => m.PostDetailComponent)
  },

  // Mantendo rotas antigas de soluções
  {
    path: 'pillar',
    title: 'Sistema Pillar - Gestao de Obras',
    loadComponent: () => import('./features/public/solutions/pillar/pillar.component').then(m => m.PillarComponent)
  },
  {
    path: 'safe',
    title: 'Sistema Safe - Gestao Administrativa',
    loadComponent: () => import('./features/public/solutions/safe/safe.component').then(m => m.SafeComponent)
  },
  {
    path: 'obras',
    title: 'Custo de Obras - Gestao de Imobiliarios',
    loadComponent: () => import('./features/public/solutions/obras/obras.component').then(m => m.ObrasComponent)
  },
  {
    path: 'pvinfo',
    title: 'PDV. Registre vendas,',
    loadComponent: () => import('./features/public/solutions/pvinfo/pvinfo.component').then(m => m.PvinfoComponent)
  },
  {
    path: 'notainfo',
    title: 'NOTAinfo - Emissor Fiscal',
    loadComponent: () => import('./features/public/solutions/notainfo/notainfo.component').then(m => m.NotainfoComponent)
  },
  {
    path: 'coletorxml',
    title: 'Coletor XML',
    loadComponent: () => import('./features/public/solutions/coletorxml/coletorxml.component').then(m => m.ColetorComponent)
  },
  {
    path: 'pillarmobile',
    title: 'Pillar Mobile',
    loadComponent:()=> import('./features/public/solutions/pillar-mobile/pillar-mobile.component').then(m => m.PillarMobileComponent)
  },
  {
    path: 'institucional',
    loadComponent: () => import('./features/public/components/institucional/institucional.component')
      .then(m => m.InstitucionalComponent),
    title: 'Institucional - Inforplace' // Opcional: define o título da aba do navegador
  },

  {
    path: 'fale-conosco',
    loadComponent: () => import('./features/public/components/fale-conosco/fale-conosco.component')
      .then(m => m.FaleConoscoComponent),
    title: 'Institucional - Inforplace' // Opcional: define o título da aba do navegador
  },

  // =========================================================
  // AREA ADMINISTRATIVA (Gestao Interna)
  // =========================================================

  {
    path: 'admin/login',
    title: 'Login - Portal Inforplace',
    loadComponent: () => import('./features/admin/login/login.component').then(m => m.LoginComponent)
  },

  {
    path: 'admin',
    loadComponent: () => import('./features/admin/layout/layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        title: 'Dashboard - Inforplace',
        loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },

      {
        path: 'posts',
        title: 'Gerenciar Conteudo',
        loadComponent: () => import('./features/admin/posts/post-list/post-list.component').then(m => m.PostListComponent)
      },

      {
        path: 'posts/new',
        title: 'Novo Conteudo',
        loadComponent: () => import('./features/admin/posts/post-editor/post-editor.component').then(m => m.PostEditorComponent)
      },

      {
        path: 'posts/:id',
        title: 'Editar Conteudo',
        loadComponent: () => import('./features/admin/posts/post-editor/post-editor.component').then(m => m.PostEditorComponent)
      },

      {
        path: 'users',
        title: 'Gerenciar Usuarios',
        loadComponent: () => import('./features/admin/users/users-list.component').then(m => m.UserListComponent)
      },

      {
        path: 'settings',
        title: 'Configuracoes',
        loadComponent: () => import('./features/admin/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  },
  {
    path: 'gerar-boleto', // Lógica: Um nome de rota diferente para nao carregar o SafeComponent
    title: 'Inforplace - Gerar Boleto',
    loadComponent: () => import('./features/public/components/safe-wrapper/safe-wrapper.component').then(m => m.SafeWrapperComponent)
  },

  // Fallback: Redireciona para a home se a rota nao existir
  {
    path: '**',
    redirectTo: ''
  }
];
