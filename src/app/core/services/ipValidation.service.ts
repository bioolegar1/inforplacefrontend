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
    // Retorna diretamente a URL solicitada
    return `http://${this.DDNS_NAME}:${this.PORT}`;
  }
}
