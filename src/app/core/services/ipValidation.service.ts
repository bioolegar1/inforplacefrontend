import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IpValidationService {
  private readonly DDNS_NAME = 'inforplace.ddns.net';
  private readonly PORT = '12019';

  constructor(private http: HttpClient) {}

  async getFinalUrl(): Promise<string> {
    try {
      // 1. Obtém o IP público da máquina do usuário
      const internetData: any = await firstValueFrom(
        this.http.get('https://api.ipify.org?format=json')
      );
      const internetIP = internetData.ip;

      // 2. Resolve o IP do DDNS via Google DNS API
      const dnsData: any = await firstValueFrom(
        this.http.get(`https://dns.google/resolve?name=${this.DDNS_NAME}`)
      );
      const ddnsIP = dnsData.Answer[0].data;

      // 3. Lógica de comparação:
      // Se o IP da internet for igual ao IP que o DDNS aponta,
      // significa que o usuário está na rede local.
      let finalTarget: string;
      if (internetIP === ddnsIP) {
        finalTarget = `http://192.168.40.202:${this.PORT}`;
      } else {
        finalTarget = `http://${this.DDNS_NAME}:${this.PORT}`;
      }

      // Retorna a URL através do nosso proxy seguro para evitar erros de Mixed Content
      return `/api/proxy-boleto?target=${encodeURIComponent(finalTarget)}`;
    } catch (error) {
      // Caso ocorra erro (ex: bloqueio de CORS ou DNS), redireciona para o DDNS via proxy por padrão
      console.error('Erro na validação de IP:', error);
      const fallbackTarget = `http://${this.DDNS_NAME}:${this.PORT}`;
      return `/api/proxy-boleto?target=${encodeURIComponent(fallbackTarget)}`;
    }
  }
}
