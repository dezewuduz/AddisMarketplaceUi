import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ModalStateService } from '../../services/modal-state';
import { LoginForm } from '../login-form/login-form';
import { RegisterForm } from '../register-form/register-form';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LoginForm, RegisterForm, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  constructor(
    public authService: AuthService,
    public modalState: ModalStateService,
    private router: Router
  ) {}

  scrollToProducts(): void {
    document.querySelector('.product-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  onSellersClick(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.modalState.openRegister();
    }
  }
}