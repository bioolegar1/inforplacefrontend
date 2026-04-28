import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  PLATFORM_ID,
  NgZone,
  input,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule, isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './hero.component.html',
  styles: [`
    :host { display: block; }
    :host ::ng-deep swiper-container::part(bullet) {
      background-color: rgba(255, 255, 255, 0.4);
      opacity: 1;
    }
    :host ::ng-deep swiper-container::part(bullet-active) {
      background-color: #ffffff;
      width: 24px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }
    :host ::ng-deep swiper-container::part(button-prev),
    :host ::ng-deep swiper-container::part(button-next) {
      color: rgba(255, 255, 255, 0.7);
    }
    :host ::ng-deep swiper-container::part(button-prev):hover,
    :host ::ng-deep swiper-container::part(button-next):hover {
      color: #ffffff;
    }
  `]
})
export class HeroComponent implements AfterViewInit {

  // Recebe os dados via Input Signal
  solutions = input.required<any[]>();

  @ViewChild('heroSwiper') heroSwiperRef!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  getHeroTheme(id: string) {
    const themes: any = {
      'pillar': { bg: 'bg-gradient-to-br from-[#0a1a3b] to-[#1e40af]', btn: 'bg-blue-600 hover:bg-blue-800 text-white', imgPanel:  'hover:bg-[#0a1a3b]/80 hover:border-blue-400/50' },
      'safe': { bg: 'bg-gradient-to-br from-[#052e16] to-[#15803d]', btn: 'bg-[#16a34a] hover:bg-[#14532d] text-white', imgPanel: 'hover:bg-[#052e16]/80 hover:border-green-400/50' },
      'obras': { bg: 'bg-gradient-to-br from-[#042f2e] to-[#0d9488]', btn: 'bg-teal-500 hover:bg-teal-700 text-white', imgPanel: 'hover:bg-[#042f2e]/80 hover:border-teal-400/50' },
      'pvinfo': { bg: 'bg-gradient-to-br from-[#111827] to-[#374151]', btn: 'bg-gray-600 hover:bg-gray-950 text-white', imgPanel: 'hover:bg-gray-900/90 hover:border-gray-500/50' },
      'notainfo': { bg: 'bg-gradient-to-br from-[#0c4a6e] to-[#0284c7]', btn: 'bg-sky-500 hover:bg-sky-700 text-white', imgPanel: 'hover:bg-[#0c4a6e]/80 hover:border-sky-400/50' },
      'coletorxml': { bg: 'bg-gradient-to-br from-[#431407] to-[#ea580c]', btn: 'bg-orange-600 hover:bg-orange-800 text-white', imgPanel: 'hover:bg-[#431407]/80 hover:border-orange-400/50' }
    };
    return themes[id] || themes['safe'];
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(async () => {
        // Importação dinâmica do Swiper
        const { register } = await import('swiper/element/bundle');
        register();

        requestAnimationFrame(() => {
          if (this.heroSwiperRef?.nativeElement) {
            const swiperEl = this.heroSwiperRef.nativeElement;

            const params = {
              slidesPerView: 1,
              loop: true,
              // ALTERAÇÃO AQUI: Mudado de 'fade' para 'slide'
              effect: 'slide',
              speed: 800, // Aumentei um pouco o tempo para ficar mais suave

              autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              },

              pagination: {
                clickable: true,
                dynamicBullets: true
              },

              navigation: true, // Garante que as setas funcionem
              observer: true,
              observeParents: true,
            };

            Object.assign(swiperEl, params);

            if (typeof swiperEl.initialize === 'function') {
              swiperEl.initialize();
            }
          }
        });
      });
    }
  }
}
