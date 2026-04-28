import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpValidationService {
  private readonly DDNS_NAME = 'inforplace.ddns.net';
  private readonly PORT = '12019';

  constructor() {}

  async getFinalUrl(): Promise<string> {
    const finalTarget = `http://${this.DDNS_NAME}:${this.PORT}/`;

    // Em desenvolvimento local (localhost), usamos a URL direta.
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return finalTarget;
    }

    // Na Vercel, passamos pelo nosso proxy para converter HTTP em HTTPS e evitar o bloqueio do navegador.
    // Adicionamos a barra final para que caminhos relativos no iframe (ex: ext/js) resolvam para /api/proxy-boleto/ext/js
    return `/api/proxy-boleto/?target=${encodeURIComponent(finalTarget)}`;
  }
}
