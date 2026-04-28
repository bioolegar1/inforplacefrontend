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
  constructor() {}

  ngOnInit() {
    // Redireciona o usuário diretamente para o sistema de boletos
    window.location.href = 'http://inforplace.ddns.net:12019/';
  }
}
