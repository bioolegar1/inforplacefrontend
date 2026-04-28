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
    // Em desenvolvimento local (localhost), usamos a URL direta.
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return `http://${this.DDNS_NAME}:${this.PORT}/`;
    }

    // Na Vercel, usamos o nosso proxy fixo para carregar o conteúdo via HTTPS
    return `/api/proxy-boleto/`;
  }
}
