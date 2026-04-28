import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../../core/services/contact.service';

@Component({
  selector: 'app-fale-conosco',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fale-conosco.component.html',
  styleUrl: './fale-conosco.component.css'
})
export class FaleConoscoComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly isSubmitting = signal(false);
  readonly showSuccess = signal(false);
  readonly contactForm: FormGroup;

  readonly contactInfo = {
    phone: '(62) 3285-1464',
    whatsapp: '556232851464',
    email: 'contato@inforplace.com.br',
    address: 'Goiânia - GO, Brasil'
  };

  constructor() {
    this.contactForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      // Logica: Adicionamos uma Regex para validar o formato (00) 00000-0000
      telefone: ['', [
        Validators.required,
        Validators.pattern(/^\(\d{2}\) \d{5}-\d{4}$/)
      ]],
      assunto: ['', [Validators.required]],
      mensagem: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Logica: Funcao chamada a cada tecla digitada no campo de telefone
  onTelefoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // 1. Remove tudo que nao for numero
    value = value.replace(/\D/g, '');

    // 2. Aplica a mascara progressivamente conforme a quantidade de numeros
    if (value.length > 0) {
      value = '(' + value;
    }
    if (value.length > 3) {
      value = value.substring(0, 3) + ') ' + value.substring(3);
    }
    if (value.length > 10) {
      value = value.substring(0, 10) + '-' + value.substring(10, 14);
    }

    // 3. Limita o tamanho maximo (11 digitos + caracteres da mascara)
    input.value = value.substring(0, 15);

    // 4. Atualiza o valor no Angular Reactive Form
    this.contactForm.get('telefone')?.setValue(input.value);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);

      // Logica: Opcional - Se o seu backend preferir apenas numeros,
      // voce pode limpar a mascara antes de enviar:
      const dadosParaEnvio = {
        ...this.contactForm.value,
        telefone: this.contactForm.value.telefone.replace(/\D/g, '')
      };

      this.contactService.sendEmail(dadosParaEnvio).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.showSuccess.set(true);
          this.contactForm.reset();
          setTimeout(() => this.closeModal(), 5000);
        },
        error: (error) => {
          this.isSubmitting.set(false);
          if (error.status === 429) {
            alert('Limite de envios excedido. Tente novamente em 5 minutos.');
          } else {
            alert('Falha ao conectar com o servidor da Inforplace.');
          }
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.showSuccess.set(false);
  }
}
