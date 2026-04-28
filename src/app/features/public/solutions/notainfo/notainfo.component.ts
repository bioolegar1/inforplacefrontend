import {Component, OnInit, signal, ChangeDetectionStrategy, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';


// Certifique-se que os caminhos estão corretos na sua estrutura
import { CtaContactComponent } from '../../../../core/layout/cta-contact/cta-contact.component';
import { LatestUpdatesComponent } from '../../components/latest-updates/latest-updates.component';
import { TestimonialsComponent } from '../../../../core/layout/testmonials/testmonials.component';
import {FaqAccordionComponent, FaqItem} from '../../../../core/layout/faq-accordion/faq-accordion.component';
import {SolutionFeaturesComponent} from '../../../../core/layout/solution-features/solution-features.component';
import {HeroSolutionComponent} from '../../../../core/layout/hero-solution/hero-solution.component';

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-notainfo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CtaContactComponent,
    LatestUpdatesComponent,
    TestimonialsComponent,
    FaqAccordionComponent,
    SolutionFeaturesComponent,
    HeroSolutionComponent
  ],
  templateUrl: './notainfo.component.html',
})
export class NotainfoComponent implements OnInit {

  activeAccordion = signal<number | null>(null);

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Notainfo - Emissor de Nota Fiscal Eletrônica | Inforplace');
    this.meta.addTags([
      { name: 'description', content: 'Sistema emissor de nota fiscal eletrônica NF-e. Emita notas, cupons e conhecimentos de transporte em poucos cliques.' },
      { name: 'keywords', content: 'nfe, nf-e, cupom eletronico, manifesto, cte, conhecimento de transporte, emissor fiscal' }
    ]);
  }

  toggleAccordion(index: number) {
    this.activeAccordion.update(current => current === index ? null : index);
  }

  handleHeroContact() {
    const element = document.getElementById('contato'); // Certifique-se que sua seção de contato tenha id="contato"
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --- DADOS FORNECIDOS ---
  features = signal<FeatureItem[]>([    {
      title: 'Nota Fiscal Eletrônica',
      desc: 'Emissão de nota fiscal eletrônica modelo 55.',
      icon: 'description'
    },
    {
      title: 'Cupom Eletrônico',
      desc: 'Emissão de documento eletrônico, modelo 65 (NFC-e).',
      icon: 'receipt_long'
    },
    {
      title: 'Manifesto de Entrega',
      desc: 'Emissão de manifesto de entrega modelo 59.',
      icon: 'local_shipping'
    },
    {
      title: 'Conhecimento Eletrônico',
      desc: 'Emissão de conhecimento de frete rodoviário, modelo 57 (CT-e).',
      icon: 'commute'
    },
    // Adicionando 2 itens extras para manter o grid de 3 colunas visualmente equilibrado
    // baseados no contexto de emissor fiscal
    {
      title: 'Simples e Fácil',
      desc: 'Emita nota fiscal em poucos cliques para sua empresa.',
      icon: 'touch_app'
    },
    {
      title: 'Envio Automático',
      desc: 'Envio de XML e PDF por e-mail para o cliente e contador.',
      icon: 'forward_to_inbox'
    }
  ]);

  faqs = signal<FaqItem[]>([
    {
      question: 'Quais são os documentos emitidos pelo Emissor?',
      answer: 'O sistema emite NF-e (Modelo 55), NFC-e (Modelo 65), Manifesto (Modelo 59) e CT-e (Modelo 57).'
    },
    {
      question: 'Como faço para adquirir o Emissor?',
      answer: 'Entre em contato com a Inforplace através do botão "Falar com Consultor" nesta página, teremos o maior prazer em atendê-lo e lhe assessorar na escolha do plano ideal.'
    }
  ]);


  @ViewChild('cta') ctaElement!: ElementRef;

  scrollToCta(): void {
    setTimeout(() => {
      this.ctaElement.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center', // Centraliza melhor na tela
        inline: 'nearest'
      });
    }, 100); // Pequeno delay para garantir que o elemento existe
  }
}
