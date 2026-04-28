import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { TestimonialsComponent } from '../../../../core/layout/testmonials/testmonials.component';
import {CtaContactComponent} from '../../../../core/layout/cta-contact/cta-contact.component';
import {LatestUpdatesComponent} from '../../components/latest-updates/latest-updates.component';
import {FaqAccordionComponent} from '../../../../core/layout/faq-accordion/faq-accordion.component';
import {SolutionFeaturesComponent} from '../../../../core/layout/solution-features/solution-features.component';
import {HeroSolutionComponent} from '../../../../core/layout/hero-solution/hero-solution.component';



export interface FeatureItem {
  title: string;
  desc: string;
  icon: string;
}
// Interface para tipar o FAQ (boa prática)
interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-safe',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule,
    CtaContactComponent,
    LatestUpdatesComponent,
    TestimonialsComponent,
    FaqAccordionComponent,
    SolutionFeaturesComponent, HeroSolutionComponent],
  templateUrl: './safe.component.html',
  styles: []
})
export class SafeComponent implements OnInit {

  activeAccordion = signal<number | null>(null);

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Sistema SAFE - Gestão Empresarial | Inforplace');
    this.meta.updateTag({ name: 'description', content: 'Gestão completa para o seu negócio. O SAFE integra estoque, financeiro e fiscal para garantir eficiência e resultados.' });
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

  // 3. Funcionalidades (Dados do SAFE)
  features = signal<FeatureItem[]>([
    { icon: 'shopping_cart', title: 'Compra', desc: 'Realiza compra, controle de estoque, produção.' },
    { icon: 'inventory_2', title: 'Estoque', desc: 'Inventário de estoque, custo médio do estoque, ajuste de estoque etc.' },
    { icon: 'factory', title: 'Produção', desc: 'Orçamento de produção, ordem de produção, apontamento, etc.' },
    { icon: 'attach_money', title: 'Financeiro', desc: 'Pagamento, recebimento, adiantamento e tesouraria.' },
    { icon: 'storefront', title: 'Comercial', desc: 'Orçamento de venda, pedido de venda, faturamento, etc.' },
    { icon: 'domain', title: 'Controle de patrimônio', desc: 'Baixa de bens, venda de bens, cálculo de depreciação, etc.' },
    { icon: 'receipt_long', title: 'Escrita fiscal', desc: 'Entrada/saída de documentos fiscais, apuração de imposto, emissão de NF-e, CT-e e MDF-e.' },
    { icon: 'account_balance', title: 'Contabilidade', desc: 'Lançamentos, balancetes, sped ECD, etc.' },
    { icon: 'local_shipping', title: 'Manifesto eletrônico', desc: 'Realiza a emissão do manifesto de entrega eletrônico.' },
    { icon: 'description', title: 'Conhecimento de frete', desc: 'Realiza a emissão de conhecimento eletrônica automaticamente através do pedido de venda.' },
    { icon: 'point_of_sale', title: 'Ponto de venda', desc: 'Ponto de venda com emissão de NFC-e.' },
    { icon: 'hub', title: 'Integrador ponto de venda', desc: 'Ponto de venda integra, através do integrador ao SAFE.' },
  ]);

  // 4. FAQ (Dados do SAFE)
  faqs = signal<FaqItem[]>([
    {
      question: 'A quem interessa o software SAFE?',
      answer: 'O SAFE é ideal para gestores que buscam eficiência em varejo, atacado e indústrias, integrando estoque, financeiro e fiscal em uma única plataforma.',
    },
    {
      question: 'Em que SAFE pode me ajudar?',
      answer: 'Ele elimina o retrabalho e erros manuais. Ajuda na apuração correta de impostos, controle rigoroso de estoque e fornece relatórios precisos para tomada de decisão.',
    },
    {
      question: 'Como é feito a integração do SAFE com o ponto de venda?',
      answer: 'A integração é automática através do nosso módulo integrador. Vendas realizadas no PDV baixam o estoque e alimentam o financeiro do SAFE em tempo real.',
    }
  ]);

}
