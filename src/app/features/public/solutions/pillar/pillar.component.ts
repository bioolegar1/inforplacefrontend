import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
// 1. Importe o componente novo (Ajuste o caminho se sua pasta for diferente)
import { TestimonialsComponent } from '../../../../core/layout/testmonials/testmonials.component';
import {CtaContactComponent} from '../../../../core/layout/cta-contact/cta-contact.component';
import {LatestUpdatesComponent} from '../../components/latest-updates/latest-updates.component';
import {FaqAccordionComponent, FaqItem} from '../../../../core/layout/faq-accordion/faq-accordion.component';
import {SolutionFeaturesComponent} from '../../../../core/layout/solution-features/solution-features.component';
import {HeroSolutionComponent} from '../../../../core/layout/hero-solution/hero-solution.component';

// Interface do FAQ
interface FeatureItem {
  title: string;
  desc: string;
  icon: string;
}

@Component({
  selector: 'app-pillar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // 2. Adicione o TestimonialsComponent nos imports
  imports: [CommonModule, TestimonialsComponent, CtaContactComponent, LatestUpdatesComponent, FaqAccordionComponent, SolutionFeaturesComponent, HeroSolutionComponent],
  templateUrl: './pillar.component.html',
})
export class PillarComponent implements OnInit {

  constructor(private title: Title, private meta: Meta) {}
  ngOnInit(): void {
    this.title.setTitle('Sistema Pillar - Gestão para Construtoras | Inforplace');
    this.meta.updateTag({ name: 'description', content: 'O Sistema Pillar inova a administração da sua construtora. Controle de obras, financeiro e compras integrado.' });
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

  // Features (Mantido)
  features = signal<FeatureItem[]>([
    {
      title: 'Compra', desc: 'Realiza solicitação de compra, cotação de preço e ordem de compra.', icon: 'shopping_cart' },
    { title: 'Estoque', desc: 'Controla as entradas e saídas de mercadoria aplicada na obra.', icon: 'inventory_2' },
    { title: 'Contábil', desc: 'Maior conforto, segurança e agilidade na integração do Sistema Contábil.', icon: 'calculate' },
    { title: 'Planejamento de Obra', desc: 'Controla todos elementos de receita de venda por período e acumulada.', icon: 'architecture' },
    { title: 'Financeiro', desc: 'Contas a pagar e receber, adiantamento financeiro e fluxo de caixa.', icon: 'payments' },
    { title: 'Escrita Fiscal', desc: 'Entrada e saída de documentos fiscais totalmente integrado ao financeiro.', icon: 'receipt_long' },
    { title: 'Manutenção', desc: 'Controle de manutenção de equipamentos e emissão de ordem de serviço.', icon: 'build' },
    { title: 'Patrimônio', desc: 'Venda, baixa, cálculo de depreciação e transferência de imobilizado.', icon: 'domain' },
    { title: 'Gestão de Clientes', desc: 'Sistema completo para construtoras, incorporadoras e administradoras.', icon: 'groups' }
  ]);


  faqs = signal<FaqItem[]>([
    {
      question: 'O que é o planejamento de obra?',
      answer: 'É o módulo onde você define o cronograma físico-financeiro, controlando etapas, custos previstos e realizados para garantir a saúde financeira do empreendimento.',
    },
    {
      question: 'Como faço para acessar o sistema remotamente?',
      answer: 'O Pillar permite acesso remoto seguro via TS (Terminal Service) ou VPN, garantindo que você gerencie suas obras de qualquer lugar.',
    },
    {
      question: 'Quantas empresas posso ter no meu sistema?',
      answer: 'O sistema é multiempresa. Você pode gerenciar múltiplas obras e CNPJs diferentes dentro da mesma licença, conforme seu plano.',
    },
    {
      question: 'Quais clientes podem utilizar o Pillar?',
      answer: 'Construtoras, Incorporadoras, Empreiteiras e Administradoras de Carteira Imobiliária que buscam gestão profissional.',
    },
    {
      question: 'Qual o custo mensal do Pillar?',
      answer: 'Nós da Inforplace mantemos a política de preço conforme o número de usuários e quantidade de empresas. Nosso preço é competitivo e oferecemos atendimento personalizado.',
    }
  ]);
}
