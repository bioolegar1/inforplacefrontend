import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { TestimonialsComponent } from '../../../../core/layout/testmonials/testmonials.component';
import { CtaContactComponent } from '../../../../core/layout/cta-contact/cta-contact.component';
import { LatestUpdatesComponent } from '../../components/latest-updates/latest-updates.component';
import { FaqAccordionComponent, FaqItem } from '../../../../core/layout/faq-accordion/faq-accordion.component';
import { SolutionFeaturesComponent } from '../../../../core/layout/solution-features/solution-features.component';
import { HeroSolutionComponent } from '../../../../core/layout/hero-solution/hero-solution.component';

interface FeatureItem {
  title: string;
  desc: string;
  icon: string;
}

@Component({
  selector: 'app-pillar-mobile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TestimonialsComponent,
    CtaContactComponent,
    LatestUpdatesComponent,
    FaqAccordionComponent,
    SolutionFeaturesComponent,
    HeroSolutionComponent
  ],
  templateUrl: './pillar-mobile.component.html',
})
export class PillarMobileComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    // Título focado na mobilidade
    this.title.setTitle('Pillar Mobile - Gestão de Obras na Palma da Mão | Inforplace');

    // Meta tag atualizada para destacar a facilidade de uso em campo
    this.meta.updateTag({
      name: 'description',
      content: 'Leve a gestão da sua construtora para o canteiro de obras. Solicite materiais e autorize compras em tempo real com o Pillar Mobile.'
    });
  }

  activeAccordion = signal<number | null>(null);

  toggleAccordion(index: number) {
    this.activeAccordion.update(current => current === index ? null : index);
  }

  handleHeroContact() {
    const element = document.getElementById('contato'); // Certifique-se que sua seção de contato tenha id="contato"
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Features adaptadas para as funções que aparecem nas suas imagens (Mobile)
  features = signal<FeatureItem[]>([
    {
      title: 'Solicitação de Compra',
      desc: 'Cadastre pedidos de materiais diretamente do canteiro de obras com rapidez.',
      icon: 'add_shopping_cart'
    },
    {
      title: 'Autorização em Real-Time',
      desc: 'Aprove ou reprove solicitações de compra instantaneamente pelo smartphone.',
      icon: 'verified_user'
    },
    {
      title: 'Lista de Empreendimentos',
      desc: 'Visualize todas as suas obras e o status de cada pedido em uma interface limpa.',
      icon: 'apartment'
    },
    {
      title: 'Liberação de Ordem',
      desc: 'Agilize o processo de compra liberando ordens para o setor de suprimentos.',
      icon: 'assignment_turned_in'
    },
    {
      title: 'Simplicidade e Prática',
      desc: 'Interface desenhada para o uso em campo, com botões grandes e leitura clara.',
      icon: 'touch_app'
    },
    {
      title: 'Sincronização Total',
      desc: 'Tudo o que é feito no celular reflete instantaneamente no Sistema Pillar Desktop.',
      icon: 'sync'
    }
  ]);

  // FAQs focadas em dúvidas de uso mobile
  faqs = signal<FaqItem[]>([
    {
      question: 'O Pillar Mobile funciona offline?',
      answer: 'O aplicativo necessita de conexão com a internet para sincronizar as autorizações e solicitações em tempo real com o servidor da construtora.',
    },
    {
      question: 'Preciso de uma licença separada para o Mobile?',
      answer: 'O acesso ao Pillar Mobile é um módulo integrado ao Sistema Pillar. Verifique com nosso suporte a ativação para seus usuários.',
    },
    {
      question: 'Posso autorizar compras de qualquer lugar?',
      answer: 'Sim, desde que tenha conexão à internet, você pode autorizar ou negar solicitações de qualquer lugar do mundo.',
    },
    {
      question: 'O app está disponível para Android e iOS?',
      answer: 'Sim, o Pillar Mobile foi desenvolvido para ser acessível em ambas as plataformas, garantindo flexibilidade para sua equipe.',
    }
  ]);
}
