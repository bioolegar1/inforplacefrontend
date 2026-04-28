import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

import { CtaContactComponent } from '../../../../core/layout/cta-contact/cta-contact.component';
import { LatestUpdatesComponent } from '../../components/latest-updates/latest-updates.component';
import { TestimonialsComponent } from '../../../../core/layout/testmonials/testmonials.component';
import {FaqAccordionComponent} from '../../../../core/layout/faq-accordion/faq-accordion.component';
import {SolutionFeaturesComponent} from '../../../../core/layout/solution-features/solution-features.component';
import {HeroSolutionComponent} from '../../../../core/layout/hero-solution/hero-solution.component';

@Component({
  selector: 'app-pvinfo',
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
  templateUrl: './pvinfo.component.html',
})
export class PvinfoComponent implements OnInit {

  activeAccordion = signal<number | null>(null);

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('PDV e Gestão Fiscal - Alta Performance | Inforplace');
    this.meta.addTags([
      { name: 'description', content: 'Aumente a eficiência de seu ponto de venda. Registre vendas, estoque e ofereça um atendimento rápido aos clientes.' },
      { name: 'keywords', content: 'pdv, ponto de venda, compras, financeiro, escrita fiscal, gestão, inforplace' }
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

  features = signal([
    {
      title: 'Compras',
      desc: 'Pedido de compra com entrada de nota fiscal automatizada.',
      icon: 'shopping_cart' // Ícone relacionado a compras
    },
    {
      title: 'Financeiro',
      desc: 'Controle completo de Contas a pagar, contas a receber e Tesouraria.',
      icon: 'attach_money' // Ícone solicitado
    },
    {
      title: 'Integração de Gestão',
      desc: 'Integração total com sistema de gestão e Escrita Fiscal.',
      icon: 'integration_instructions'
    },
    // Adicionei estes para completar o grid visualmente, baseado no contexto "Alta Performance"
    {
      title: 'Ponto de Venda',
      desc: 'Registre vendas rapidamente e controle o estoque em tempo real.',
      icon: 'point_of_sale'
    },
    {
      title: 'Atendimento Rápido',
      desc: 'Agilidade no checkout para reduzir filas e melhorar a experiência.',
      icon: 'speed'
    },
    {
      title: 'Escrita Fiscal',
      desc: 'Geração de arquivos fiscais e conformidade com a legislação.',
      icon: 'receipt_long'
    }
  ]);

  faqs = signal([
    {
      question: 'O que é o ponto de venda?',
      answer: 'É o sistema utilizado na frente de caixa para registrar as vendas, processar pagamentos e emitir o documento fiscal.'
    },
    {
      question: 'A quem se destina o ponto de venda?',
      answer: 'A todo comércio varejista que necessita de agilidade, controle de estoque e gestão financeira integrada.'
    },
    {
      question: 'O ponto de venda emite nota fiscal?',
      answer: 'Sim, o sistema realiza a emissão de documentos fiscais (NFC-e/NF-e) conforme a legislação vigente.'
    },
    {
      question: 'O sistema tem integração com pagamento eletrônico (TEF)?',
      answer: 'Sim, permitindo transações com cartões de crédito e débito de forma integrada e segura.'
    },
    {
      question: 'O ponto de venda tem integração com o sistema SAFE?',
      answer: 'Sim, possui integração nativa com o sistema de retaguarda SAFE para gestão completa.'
    }
  ]);
}
