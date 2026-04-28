import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import {CtaContactComponent} from '../../../../core/layout/cta-contact/cta-contact.component';

@Component({
  selector: 'app-institucional',
  standalone: true,
  imports: [CommonModule, CtaContactComponent],
  templateUrl: './institucional.component.html',
  styleUrls: ['./institucional.component.css'],
  animations: [
    trigger('tabAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class InstitucionalComponent {
  readonly activePillar = signal<'missao' | 'visao' | 'valores'>('missao');

  // Textos expandidos baseados na história da Inforplace
  readonly companyInfo = {
    desde: 1987,
    titulo: 'Inforplace: Desde 1987',
    subtitulo: 'Mais de 35 anos simplificando a gestão empresarial com inovação e segurança.',
    resumo: 'Fundada em 1987 e sustentada  pelas necessidades de um grupo de contadores, a Inforplace pretende atender, de forma prática e rápida, aos processos contábeis e fiscais, oferecendo sistemas simples e versáteis. Chegou assim, ao novo milênio com um olhar crítico em seus processos e inovando  cada vez mais, mantendo a credibilidade dos clientes, sem alterar a legislação de um país em crescimento.',
    detalhes: `Nossa jornada começou acompanhando as primeiras grandes mudanças na automação comercial brasileira. Hoje, evoluímos para uma estrutura que atende desde o pequeno varejo até indústrias de grande porte, sempre com o pé no chão e foco no suporte humanizado.`
  };

  readonly diferenciais = [
    { icon: 'speed', title: 'Alta Performance', desc: 'Sistemas otimizados para máxima agilidade em processos críticos.' },
    { icon: 'shield_person', title: 'Segurança Total', desc: 'Proteção rigorosa de dados e conformidade com legislações fiscais.' },
    { icon: 'support_agent', title: 'Suporte Humano', desc: 'Atendimento direto por especialistas que entendem o seu negócio.' },
    { icon: 'handshake', title: 'Credibilidade', desc: 'Trajetória sólida construída com ética e transparência desde 1987.' }
  ];

  setFocus(pillar: 'missao' | 'visao' | 'valores') {
    this.activePillar.set(pillar);
  }
}
