import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { LoginRequest } from '../../models/auth';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  isOpen = signal(false);
  form: LoginRequest = { phoneNumber: '', password: '' };
  errorMessage = signal('');

  constructor(private authService: AuthService) {}

  open(): void {
    this.isOpen.set(true);
    this.errorMessage.set('');
  }

  close(): void {
    this.isOpen.set(false);
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe({
      next: () => {
        this.close();
        this.form = { phoneNumber: '', password: '' };
      },
      error: (err) => {
        this.errorMessage.set('ስልክ ቁጥር ወይም የይለፍ ቃል ልክ አይደለም።');
      }
    });
  }
}