import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { ModalStateService } from '../../services/modal-state';
import { LoginRequest } from '../../models/auth';

@Component({
  selector: 'app-login-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  form: LoginRequest = { phoneNumber: '', password: '' };
  errorMessage = '';

  constructor(
    private authService: AuthService,
    public modalState: ModalStateService
  ) {}

  close(): void {
    this.modalState.closeLogin();
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe({
      next: () => {
        this.close();
        this.form = { phoneNumber: '', password: '' };
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'it is not correct password and phone no';
      }
    });
  }
}