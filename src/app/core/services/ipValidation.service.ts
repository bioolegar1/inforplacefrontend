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
      if (internetIP === ddnsIP) {
        return `http://192.168.40.202:${this.PORT}`;
      }

      return `http://${this.DDNS_NAME}:${this.PORT}`;
    } catch (error) {
      // Caso ocorra erro (ex: bloqueio de CORS ou DNS), redireciona para o DDNS por padrão
      console.error('Erro na validação de IP:', error);
      return `http://${this.DDNS_NAME}:${this.PORT}`;
    }
  }
}
