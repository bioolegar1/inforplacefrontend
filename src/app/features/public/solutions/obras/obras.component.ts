import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

// Componentes Filhos
import { CtaContactComponent } from '../../../../core/layout/cta-contact/cta-contact.component';
import {LatestUpdatesComponent} from '../../components/latest-updates/latest-updates.component';
import {TestimonialsComponent} from '../../../../core/layout/testmonials/testmonials.component';
import {SolutionFeaturesComponent} from '../../../../core/layout/solution-features/solution-features.component';
import {FaqAccordionComponent, FaqItem} from '../../../../core/layout/faq-accordion/faq-accordion.component';
import {HeroSolutionComponent} from '../../../../core/layout/hero-solution/hero-solution.component';

export interface FeaturesItem {
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-obras',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host { display: block; }
    /* ATENÇÃO AQUI: Reduzimos o padding interno do Swiper */
    :host ::ng-deep swiper-container::part(container) {
      /* Era 60px, mudamos para 30px para ficar mais compacto */
      padding-top: 30px !important;
      padding-bottom: 30px !important;
    }
  `],
  imports: [
    CommonModule,
    CtaContactComponent,
    LatestUpdatesComponent,
    TestimonialsComponent,
    SolutionFeaturesComponent,
    FaqAccordionComponent,
    HeroSolutionComponent,
  ],
  templateUrl: './obras.component.html',
})
export class ObrasComponent implements OnInit {

  // Controle do FAQ
  activeAccordion = signal<number | null>(null);

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('SAO - Sistema de Apuração de Obras | Inforplace');
    this.meta.addTags([
      { name: 'description', content: 'Gestão contábil e fiscal da construção civil. Apuração de custo de obras de acordo com as normas fiscais (POC).' },
      { name: 'keywords', content: 'custo de obras, construção civil, gestão fiscal, contabilidade imobiliária, SAO' }
    ]);
  }


  // --- DADOS ---

  features = signal<FeaturesItem[]>([
    {
      title: 'Controle de Inventário',
      desc: 'Relação completa das unidades disponíveis, vendidas e em estoque.',
      icon: 'inventory_2'
    },
    {
      title: 'Resultado Contábil',
      desc: 'Resumo preciso com lançamentos contábeis automatizados.',
      icon: 'calculate'
    },
    {
      title: 'Relatório Detalhado',
      desc: 'Detalhamento profundo do cálculo para análise gerencial.',
      icon: 'analytics'
    },
    {
      title: 'Conformidade Fiscal',
      desc: 'Apuração 100% alinhada às normas fiscais vigentes (POC).',
      icon: 'gavel'
    },
    {
      title: 'Integração Simples',
      desc: 'Exporte dados facilmente para os principais sistemas contábeis.',
      icon: 'integration_instructions'
    },
    {
      title: 'Análise de Custos',
      desc: 'Monitore os custos diretos e indiretos de cada obra em tempo real.',
      icon: 'trending_up'
    }
  ]);


  toggleAccordion(index: number) {
    this.activeAccordion.update(current => current === index ? null : index);
  }

  handleHeroContact() {
    const element = document.getElementById('contato'); // Certifique-se que sua seção de contato tenha id="contato"
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // OBS: Removi a variável 'testimonials' daqui pois o componente filho usa seus próprios dados.

  faqs = signal<FaqItem[]>([
    {
      question: 'O que é apuração de obra?',
      answer: 'É o processo de levantamento de custos e receitas para determinar o lucro real e impostos (POC).'
    },
    {
      question: 'Como faço para incluir as unidades?',
      answer: 'Módulo de importação simplificado onde você define frações ideais e valores.'
    },
    {
      question: 'Como faço para pedir ajuda?',
      answer: 'Suporte via chamado, WhatsApp ou telefone.'
    },
    {
      question: 'Integra com contabilidade?',
      answer: 'Sim! Gera arquivos para os principais sistemas contábeis.'
    },
    {
      question: 'Quem pode usar?',
      answer: 'Construtoras, Incorporadoras e Escritórios de Contabilidade.'
    }
  ]);
}
