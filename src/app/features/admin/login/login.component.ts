import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // ✅ CORREÇÃO: Adicionado 'rememberMe' ao grupo
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false] // O HTML procurava por isso e não achava
  });

  // Signals
  loading = signal(false);
  error = signal<string>('');
  showPassword = signal(false);

  // Getters
  get emailControl(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get passwordControl(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  // Getter opcional para o rememberMe (se precisar validar algo)
  get rememberMeControl(): AbstractControl | null {
    return this.loginForm.get('rememberMe');
  }

  togglePasswordVisibility() {
    this.showPassword.update(value => !value);
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set('');

    // Pegamos também o valor do rememberMe, caso queira usar no futuro
    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
        if (err.status === 403 || err.status === 401) {
          this.error.set('E-mail ou senha incorretos.');
        } else {
          this.error.set('Erro de conexão com o servidor.');
        }
      }
    });
  }
}
