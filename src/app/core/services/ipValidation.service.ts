import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IpValidationService {
  private readonly DDNS_NAME = 'inforplace.ddns.net';
  private readonly URL_INTERNA = 'http://192.168.40.202:12019';
  private readonly URL_EXTERNA = 'http://inforplace.ddns.net:12019';

  // Lógica: Se o IP público do cliente for o mesmo do DDNS, ele está na rede interna da Inforplace
  // e acessa o sistema de boletos pelo IP local; caso contrário (ou se falhar), usa o DDNS.
  async getFinalUrl(): Promise<string> {
    const [internetIP, ddnsIP] = await Promise.all([this.getInternetIP(), this.getDDNSIP()]);

    if (internetIP && ddnsIP && internetIP === ddnsIP) {
      return this.URL_INTERNA;
    }
    return this.URL_EXTERNA;
  }

  private async getInternetIP(): Promise<string | null> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Erro ao obter o IP da Internet:', error);
      return null;
    }
  }

  private async getDDNSIP(): Promise<string | null> {
    try {
      const response = await fetch(`https://dns.google/resolve?name=${this.DDNS_NAME}`);
      const data = await response.json();
      return data.Answer[0].data;
    } catch (error) {
      console.error('Erro ao obter o IP do DDNS:', error);
      return null;
    }
  }
}
