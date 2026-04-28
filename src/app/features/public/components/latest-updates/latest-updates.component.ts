import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {PostListItem} from '../../../../core/models/post.model';
import {PostService} from '../../../../core/services/post.service';


@Component({
  selector: 'app-latest-updates',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './latest-updates.component.html'
})
export class LatestUpdatesComponent implements OnInit {
  private postService = inject(PostService);
  updates = signal<PostListItem[]>([]);
  isLoading = signal(true);

  // Logica: Centralizacao das classes Tailwind para facilitar a manutencao visual.
  // As chaves sao normalizadas para bater com o banco de dados.
  readonly systemConfig: any = {
    'pillar': {
      card: 'group hover:bg-blue-700 hover:border-blue-700 hover:shadow-blue-900/40 transition-all duration-300',
      iconBg: 'bg-blue-50 text-blue-600 group-hover:bg-blue-800 group-hover:text-white',
      title: 'group-hover:text-white',
      text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-blue-50',
      detail: 'text-blue-600 group-hover:text-white',
      btn: 'bg-blue-600 hover:bg-blue-800 text-white'
    },
    'safe': {
      card: 'group hover:bg-[#15803d] hover:border-[#15803d] hover:shadow-green-900/40 transition-all duration-300',
      iconBg: 'bg-green-50 text-[#16a34a] group-hover:bg-green-900 group-hover:text-white',
      title: 'group-hover:text-white',
      text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-green-50',
      detail: 'text-[#16a34a] group-hover:text-white',
      btn: 'bg-[#16a34a] hover:bg-[#14532d] text-white'
    },
    'obras': {
      card: 'group hover:bg-teal-700 hover:border-teal-700 hover:shadow-teal-900/40 transition-all duration-300',
      iconBg: 'bg-teal-50 text-teal-600 group-hover:bg-teal-900 group-hover:text-white',
      title: 'group-hover:text-white',
      text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-teal-50',
      detail: 'text-teal-600 group-hover:text-white',
      btn: 'bg-teal-500 hover:bg-teal-700 text-white'
    },
    'pvinfo': {
      card: 'group hover:bg-gray-800 hover:border-gray-900 hover:shadow-black/50 transition-all duration-300',
      iconBg: 'bg-gray-100 text-gray-700 group-hover:bg-black group-hover:text-white',
      title: 'group-hover:text-white',
      text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-gray-200',
      detail: 'text-gray-500 group-hover:text-white',
      btn: 'bg-gray-600 hover:bg-gray-950 text-white'
    },
    'notainfo': {
      card: 'group hover:bg-sky-600 hover:border-sky-600 hover:shadow-sky-900/40 transition-all duration-300',
      iconBg: 'bg-sky-50 text-sky-600 group-hover:bg-sky-900 group-hover:text-white',
      title: 'group-hover:text-white',
      text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-sky-50',
      detail: 'text-sky-600 group-hover:text-white',
      btn: 'bg-sky-500 hover:bg-sky-700 text-white'
    },
    'coletorxml': {
      card: 'group hover:bg-orange-700 hover:border-orange-700 hover:shadow-orange-900/40 transition-all duration-300',
      iconBg: 'bg-orange-50 text-orange-600 group-hover:bg-orange-900 group-hover:text-white',
      title: 'group-hover:text-white',
      text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-orange-50',
      detail: 'text-orange-600 group-hover:text-white',
      btn: 'bg-orange-600 hover:bg-orange-800 text-white'
    },
    'pillarmobile': {
      card: 'group hover:bg-blue-800 hover:border-blue-800 hover:shadow-blue-950/40 transition-all duration-300',
      iconBg: 'bg-blue-50 text-blue-600 group-hover:bg-blue-800 group-hover:text-white',
      title: 'group-hover:text-white',
      text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-blue-50',
      detail: 'text-blue-600 group-hover:text-white',
      btn: 'bg-blue-500 hover:bg-blue-950 text-white'
    }
  };

  ngOnInit() {
    this.postService.getPublishedPosts(0, 3).subscribe({
      next: (page) => this.updates.set(page.content),
      complete: () => this.isLoading.set(false)
    });
  }

  // Logica: Normaliza a string do banco (ex: NOTA_INFO -> notainfo) para encontrar no objeto de cores.
  getStyle(productSystem: string) {
    const key = productSystem.toLowerCase().replace('_', '');
    return this.systemConfig[key] || this.systemConfig['pillar'];
  }
}
