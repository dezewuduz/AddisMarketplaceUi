import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { RegisterRequest, LoginRequest } from '../../models/auth';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  isOpen = signal(false);
  form: RegisterRequest = { name: '', location: '', phoneNumber: '', password: '' };
  errorMessage = signal('');
  successMessage = signal('');

  constructor(private authService: AuthService) {}

  open(): void {
    this.isOpen.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  close(): void {
    this.isOpen.set(false);
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe({
      next: () => {
        // ምዝገባ ካለቀ በኋላ በራስ-ሰር login ያድርግ
        const loginData: LoginRequest = {
          phoneNumber: this.form.phoneNumber,
          password: this.form.password
        };
        this.authService.login(loginData).subscribe({
          next: () => {
            this.close();
            this.form = { name: '', location: '', phoneNumber: '', password: '' };
          }
        });
      },
      error: (err) => {
        this.errorMessage.set(err.error ?? 'ምዝገባ አልተሳካም። እባክህ እንደገና ሞክር።');
      }
    });
  }
}