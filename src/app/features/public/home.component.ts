import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'; // <--- Adicionado NgOptimizedImage
import { RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

// Import do novo Hero
import { HeroComponent } from '../../core/layout/hero/hero.component';

import { LatestUpdatesComponent } from './components/latest-updates/latest-updates.component';
import { CtaContactComponent } from '../../core/layout/cta-contact/cta-contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage, // <--- Importante para corrigir o erro NG8002
    HeroComponent,
    LatestUpdatesComponent,
    CtaContactComponent
  ],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  solutions = signal([

    {
      id: 'safe',
      name: 'Sistema SAFE',
      description: 'O segredo dos bons resultados de uma empresa está na eficiência. Gestão completa para o seu negócio.',
      icon: 'safe.png',
      print: 'Safe-tela.avif'
    },
    {
      id: 'notainfo',
      name: 'Nota INFO',
      description: 'Emita nota fiscal eletrônica em poucos cliques. Uma solução simples e fácil de usar para sua empresa.',
      icon: 'custodeobras.png',
      print: 'nfi-01.avif'
    },
    {
      id: 'pillar',
        name: 'Sistema Pillar',
      description: 'Sistema de gestão de construtoras e incorporadoras. O Sistema Pillar inovará a administração da sua empresa.',
      icon: 'pillar42x42.png',
      print: 'Pillar-tela.avif'
    },
    {
      id: 'pillarmobile',
      name: 'Pillar Mobile',
      description: 'Faça a sua gestão de compras de materiais de onde você estiver. Simples e prático! Controle solicitações, autorizações e ordens de compra em tempo real.',
      icon: 'pillar42x42.png',
      print: 'app-03.png'
    },
    {
      id: 'pvinfo',
      name: 'PVInfo - Ponto de Venda',
      description: 'Aumente a eficiência de seu PDV. Registre vendas, estoque e ofereça um atendimento rápido aos clientes.',
      icon: 'vendafacil.png',
      print: 'pvinfo-03.avif'
    },
    {
      id: 'coletorxml',
      name: 'Coletor XML',
      description: 'Programa que faz a baixa automática de XML de NF-e e CT-e, dando ciência da operação instantaneamente.',
      icon: 'Coletorxml.png',
      print: 'print-coletor.png'
    },
    {
      id: 'obras',
      name: 'SAO - Custo de Obras',
      description: 'Gestão contábil e fiscal da construção civil e empreendimentos imobiliários, de acordo com as normas.',
      icon: 'custodeobras.png',
      print: 'Sao-tela.jpg'
    },


  ]);

  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Inforplace Sistemas - Tecnologia em Alta Performance');
    this.meta.addTags([
      { name: 'description', content: 'Soluções focadas em levar o melhor da tecnologia, considerando a segurança e a confiabilidade.' }
    ]);
  }

  getCardTheme(id: string) {
    const defaultTheme = {
      card: 'group hover:bg-blue-700',
      iconBg: 'bg-blue-50',
      title: 'group-hover:text-white',
      text: 'text-gray-600',
      detail: 'text-blue-600',
      btn: 'bg-blue-600 hover:bg-blue-800 text-white' // Default btn
    };

    const cardThemes: any = {
      'safe': {
        card: 'group hover:bg-[#15803d] hover:border-[#15803d] hover:shadow-green-900/40 transition-all duration-300',
        iconBg: 'bg-green-50 text-[#16a34a] group-hover:bg-green-900 group-hover:text-white',
        title: 'group-hover:text-white',
        text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-green-50',
        detail: 'text-[#16a34a] group-hover:text-white',
        btn: 'bg-[#16a34a] hover:bg-[#14532d] text-white'
      },
      'notainfo': {
        card: 'group hover:bg-sky-600 hover:border-sky-600 hover:shadow-sky-900/40 transition-all duration-300',
        iconBg: 'bg-sky-50 text-sky-600 group-hover:bg-sky-900 group-hover:text-white',
        title: 'group-hover:text-white',
        text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-sky-50',
        detail: 'text-sky-600 group-hover:text-white',
        btn: 'bg-sky-500 hover:bg-sky-700 text-white'
      },
      'pillar': {
        card: 'group hover:bg-blue-700 hover:border-blue-700 hover:shadow-blue-900/40 transition-all duration-300',
        iconBg: 'bg-blue-50 text-blue-600 group-hover:bg-blue-800 group-hover:text-white',
        title: 'group-hover:text-white',
        text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-blue-50',
        detail: 'text-blue-600 group-hover:text-white',
        btn: 'bg-blue-600 hover:bg-blue-800 text-white'
      },
        'pillarmobile': {
          card: 'group hover:bg-blue-800 hover:border-blue-800 hover:shadow-blue-950/40 transition-all duration-300',
          iconBg: 'bg-blue-50 text-blue-600 group-hover:bg-blue-800 group-hover:text-white',
          title: 'group-hover:text-white',
          text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-blue-50',
          detail: 'text-blue-600 group-hover:text-white',
          btn: 'bg-blue-500 hover:bg-blue-950 text-white'
        },
        'pvinfo': {
          card: 'group hover:bg-gray-800 hover:border-gray-900 hover:shadow-black/50 transition-all duration-300',
          iconBg: 'bg-gray-100 text-gray-700 group-hover:bg-black group-hover:text-white',
          title: 'group-hover:text-white',
          text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-gray-200',
          detail: 'text-gray-500 group-hover:text-white',
          btn: 'bg-gray-600 hover:bg-gray-950 text-white'
        },
        'coletorxml': {
          card: 'group hover:bg-orange-700 hover:border-orange-700 hover:shadow-orange-900/40 transition-all duration-300',
          iconBg: 'bg-orange-50 text-orange-600 group-hover:bg-orange-900 group-hover:text-white',
          title: 'group-hover:text-white',
          text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-orange-50',
          detail: 'text-orange-600 group-hover:text-white',
          btn: 'bg-orange-600 hover:bg-orange-800 text-white'
        },
        'obras': {
          card: 'group hover:bg-teal-700 hover:border-teal-700 hover:shadow-teal-900/40 transition-all duration-300',
          iconBg: 'bg-teal-50 text-teal-600 group-hover:bg-teal-900 group-hover:text-white',
          title: 'group-hover:text-white',
          text: 'text-gray-600 text-[10px] md:text-sm group-hover:text-teal-50',
          detail: 'text-teal-600 group-hover:text-white',
          btn: 'bg-teal-500 hover:bg-teal-700 text-white'
        },
    };
      return cardThemes[id] || defaultTheme;
    }
}
