import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { IpValidationService } from '../../../../core/services/ipValidation.service';

@Component({
  selector: 'app-safe-wrapper',
  standalone: true,
  imports: [CommonModule],
  // Ajuste o caminho para o nome correto do arquivo HTML
  templateUrl: './safe-wrapper.component.html',
  // Ajuste também o CSS se ele seguir o mesmo padrão de nome
  styleUrls: ['./safe-wrapper.component.css']
})
export class SafeWrapperComponent implements OnInit {
  // Variável declarada corretamente como SafeResourceUrl ou nula
  iframeUrl: SafeResourceUrl | null = null;

  constructor(
    private ipService: IpValidationService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    // Chamada assíncrona para buscar a URL baseada no IP
    const url = await this.ipService.getFinalUrl();

    // O DomSanitizer é usado para validar que a URL é segura,
    // permitindo que o Angular a insira no src do iframe sem bloqueios de segurança.
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
