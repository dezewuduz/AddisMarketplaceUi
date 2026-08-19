import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { ModalStateService } from '../../services/modal-state';
import { RegisterRequest, LoginRequest } from '../../models/auth';

@Component({
  selector: 'app-register-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  form: RegisterRequest = { name: '', location: '', phoneNumber: '', password: '' };
  errorMessage = '';

  constructor(
    private authService: AuthService,
    public modalState: ModalStateService
  ) {}

  close(): void {
    this.modalState.closeRegister();
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe({
      next: () => {
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
        this.errorMessage = err.error ?? 'ምዝገባ አልተሳካም። እባክህ እንደገና ሞክር።';
      }
    });
  }
}