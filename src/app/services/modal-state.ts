import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalStateService {
  loginOpen = signal(false);
  registerOpen = signal(false);

  openLogin(): void {
    this.registerOpen.set(false);
    this.loginOpen.set(true);
  }

  openRegister(): void {
    this.loginOpen.set(false);
    this.registerOpen.set(true);
  }

  closeLogin(): void {
    this.loginOpen.set(false);
  }

  closeRegister(): void {
    this.registerOpen.set(false);
  }
}