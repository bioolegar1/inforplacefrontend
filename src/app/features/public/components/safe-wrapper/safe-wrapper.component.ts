import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IpValidationService } from '../../../../core/services/ipValidation.service';

@Component({
  selector: 'app-safe-wrapper',
  standalone: true,
  templateUrl: './safe-wrapper.component.html',
  styleUrls: ['./safe-wrapper.component.css']
})
export class SafeWrapperComponent implements OnInit {
  private ipValidation = inject(IpValidationService);
  private platformId = inject(PLATFORM_ID);

  async ngOnInit() {
    // Lógica: O redirecionamento só pode acontecer no navegador (no SSR não existe window).
    if (!isPlatformBrowser(this.platformId)) return;

    window.location.href = await this.ipValidation.getFinalUrl();
  }
}
