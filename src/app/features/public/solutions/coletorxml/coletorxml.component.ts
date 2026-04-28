import {Component, ElementRef, signal, ViewChild} from '@angular/core';
import {FaqAccordionComponent, FaqItem} from '../../../../core/layout/faq-accordion/faq-accordion.component';
import {LatestUpdatesComponent} from '../../components/latest-updates/latest-updates.component';
import {CtaContactComponent} from '../../../../core/layout/cta-contact/cta-contact.component';
import {SolutionFeaturesComponent} from '../../../../core/layout/solution-features/solution-features.component';
import {CommonModule} from '@angular/common';
import {HeroSolutionComponent} from '../../../../core/layout/hero-solution/hero-solution.component';

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

@Component({
  selector: 'app-coletor',
  standalone: true,
  imports: [CommonModule, FaqAccordionComponent, LatestUpdatesComponent, CtaContactComponent, SolutionFeaturesComponent, HeroSolutionComponent],
  templateUrl: './coletorxml.component.html'
})
export class ColetorComponent {

  handleHeroContact() {
    const element = document.getElementById('contato'); // Certifique-se que sua seção de contato tenha id="contato"
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Lógica: Criamos um sinal que armazena o array de funcionalidades.
  // No HTML, ao usar coletorFeatures(), o Angular lê o conteúdo deste sinal.
  features = signal<FeatureItem[]>([    {
      icon: 'description',
      title: 'Baixa de Resumo',
      desc: 'Captura as informações essenciais do XML antes mesmo da manifestação completa.'
    },
    {
      icon: 'analytics',
      title: 'Dados do Fornecedor',
      desc: 'Identifica automaticamente emissor, valores e data de emissão.'
    },
    {
      icon: 'verified',
      title: 'Ciência Automática',
      desc: 'Realiza a ciência do documento recebido de forma programada e segura.'
    },
    {
      icon: 'input',
      title: 'Importação ERP',
      desc: 'Dá a ciência e baixa o XML, podendo ser importado diretamente no seu ERP.'
    }
  ]);

  // Lógica: Mesmo princípio para o FAQ.
  // O componente filho <app-faq-accordion> receberá este sinal.
  coletorFaqs = signal<FaqItem[]>([
    {
      question: 'O sistema baixa CT-e também?',
      answer: 'Sim, o coletor monitora e baixa tanto NF-e quanto CT-e emitidos contra seu CNPJ.'
    },
    {
      question: 'Como funciona a integração?',
      answer: 'O sistema baixa o arquivo e disponibiliza em uma pasta ou banco de dados para seu ERP ler.'
    }
  ]);

  @ViewChild('cta') ctaElement!: ElementRef;

  scrollToCta(): void {
    this.ctaElement.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
