import { Component,ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router'; // <--- Importante

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // <--- ADICIONE ISSO
  imports: [RouterLink], // <--- Adicione aqui
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {}
