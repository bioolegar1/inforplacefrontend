import { Component, OnInit, OnDestroy, signal, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cta-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cta-contact.component.html',
  styles: [`
    /* Mantive apenas o cursor da máquina de escrever */
    .typewriter-cursor {
      border-right: 3px solid rgba(255, 255, 255, 0.8);
      animation: blink-caret 0.75s step-end infinite;
    }
    @keyframes blink-caret {
      from, to { border-color: transparent }
      50% { border-color: rgba(255, 255, 255, 0.8); }
    }
  `]
})
export class CtaContactComponent implements OnInit, OnDestroy {

  titleText = signal('');
  private readonly fullTitle = "Precisa de Atendimento Especializado?";
  private titleIndex = 0;
  private typewriterInterval: any;

  dynamicWord = signal('agilidade');
  private words = ['agilidade', 'segurança', 'eficiência', 'resultados', 'confiança'];
  private wordIndex = 0;
  private wordInterval: any;
  // Removi o isAnimatingWord pois não é mais necessário

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.startTypewriter();
      this.startWordSwitcher();
    } else {
      this.titleText.set(this.fullTitle);
    }
  }

  ngOnDestroy() {
    if (this.typewriterInterval) clearInterval(this.typewriterInterval);
    if (this.wordInterval) clearInterval(this.wordInterval);
  }

  private startTypewriter() {
    this.typewriterInterval = setInterval(() => {
      if (this.titleIndex < this.fullTitle.length) {
        this.titleText.update(t => t + this.fullTitle.charAt(this.titleIndex));
        this.titleIndex++;
      } else {
        clearInterval(this.typewriterInterval);
        setTimeout(() => {
          this.titleText.set('');
          this.titleIndex = 0;
          this.startTypewriter();
        }, 5000);
      }
    }, 100);
  }

  // Lógica simplificada: Troca a palavra direto, sem animação de entrada
  private startWordSwitcher() {
    this.wordInterval = setInterval(() => {
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      this.dynamicWord.set(this.words[this.wordIndex]);
    }, 2000); // Acelerei um pouco (2s) já que não tem animação, fica mais dinâmico
  }
}
