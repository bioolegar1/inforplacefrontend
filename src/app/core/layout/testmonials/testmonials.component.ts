import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  signal,
  ElementRef,
  ViewChild,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  Input,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-testimonials',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule],
  // Mantendo o nome do arquivo conforme sua pasta
  templateUrl: './testmonials.component.html',
  styles: [`
    :host { display: block; }
    :host ::ng-deep swiper-container::part(container) {
      padding-top: 20px !important;
      padding-bottom: 40px !important;
    }
  `]
})
export class TestimonialsComponent implements AfterViewInit {
  @ViewChild('swiperRef') swiperRef!: ElementRef;

  @Input() title: string = 'O que dizem nossos clientes';
  @Input() color: string = 'blue'; // Cor padrão

  get colorClasses() {
    const c = this.color;

    // Mapa de cores para o fundo da seção e detalhes (aspas/empresa)
    const colorMap: { [key: string]: { bg: string, detail: string } } = {
      orange:   { bg: 'bg-[#7c2d12]', detail: 'text-[#fb923c]' }, // Laranja escuro
      blue:     { bg: 'bg-[#1e40af]', detail: 'text-[#4ade80]' }, // Original (Verde sobre Azul)
      sky:      { bg: 'bg-[#0c4a6e]', detail: 'text-[#38bdf8]' }, // Azul Céu escuro
      verde:    { bg: 'bg-[#064e3b]', detail: 'text-[#4ade80]' }, // Verde Profundo
      preto:    { bg: 'bg-[#0f172a]', detail: 'text-[#94a3b8]' }, // Escuro Slate
      teal:     { bg: 'bg-[#134e4a]', detail: 'text-[#2dd4bf]' }  // Teal Profundo
    };

    return colorMap[c] || colorMap['blue'];
  }


  testimonials = signal([
    // --- Cópia 1 ---
    {
      name: 'David Alkmim',
      company: 'FonteNet',
      text: 'Fico feliz em ver que está no mercado profissionais de excelente qualidade e compromisso.'
    },
    {
      name: 'Maria Dolores',
      company: 'Web Treinamentos - PA',
      text: 'Uso o Pillar há algum tempo, tive algumas dificuldades no início, mas hoje estou feliz com o sistema.'
    },
    {
      name: 'Carlos Silva',
      company: 'Construtora Silva',
      text: 'O sistema Pillar mudou a forma como gerenciamos nossas obras. Incrível!'
    },
    {
      name: 'Ana Souza',
      company: 'Incorporadora Souza',
      text: 'A facilidade de uso e a precisão dos relatórios são os pontos fortes da Inforplace.'
    },
    {
      name: 'Roberto Dias',
      company: 'Engenharia R.D.',
      text: 'Suporte técnico impecável e sistema sempre atualizado com as normas.'
    },

    // --- Cópia 2 (Para garantir o Loop) ---
    {
      name: 'David Alkmim',
      company: 'FonteNet',
      text: 'Fico feliz em ver que está no mercado profissionais de excelente qualidade e compromisso.'
    },
    {
      name: 'Maria Dolores',
      company: 'Web Treinamentos - PA',
      text: 'Uso o Pillar há algum tempo, tive algumas dificuldades no início, mas hoje estou feliz com o sistema.'
    },
    {
      name: 'Carlos Silva',
      company: 'Construtora Silva',
      text: 'O sistema Pillar mudou a forma como gerenciamos nossas obras. Incrível!'
    },
    {
      name: 'Ana Souza',
      company: 'Incorporadora Souza',
      text: 'A facilidade de uso e a precisão dos relatórios são os pontos fortes da Inforplace.'
    },
    {
      name: 'Roberto Dias',
      company: 'Engenharia R.D.',
      text: 'Suporte técnico impecável e sistema sempre atualizado com as normas.'
    },

    // --- Cópia 3 (Segurança para telas Ultrawide) ---
    {
      name: 'David Alkmim',
      company: 'FonteNet',
      text: 'Fico feliz em ver que está no mercado profissionais de excelente qualidade e compromisso.'
    },
    {
      name: 'Maria Dolores',
      company: 'Web Treinamentos - PA',
      text: 'Uso o Pillar há algum tempo, tive algumas dificuldades no início, mas hoje estou feliz com o sistema.'
    }
  ]);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {

      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          if (this.swiperRef?.nativeElement) {
            const swiperEl = this.swiperRef.nativeElement;

            const params = {
              slidesPerView: 'auto',
              spaceBetween: 20,
              loop: true,     // Agora vai funcionar pois a lista é longa
              speed: 1000,    // Velocidade da transição

              autoplay: {
                delay: 2000, // 2.5s lendo
                disableOnInteraction: false, // Não para se clicar
                pauseOnMouseEnter: true // Pausa se passar o mouse
              },

              autoHeight: true,
              calculateHeight: true,
              observer: true,
              observeParents: true,
              allowTouchMove: true,
              grabCursor: true
            };

            Object.assign(swiperEl, params);
            swiperEl.initialize();
          }
        }, 100);
      });
    }
  }
}
