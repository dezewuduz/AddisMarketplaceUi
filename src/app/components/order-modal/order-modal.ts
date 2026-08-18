import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order';
import { Product } from '../../models/product';

@Component({
  selector: 'app-order-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './order-modal.html',
  styleUrl: './order-modal.css',
})
export class OrderModal {
  isOpen = signal(false);
  product: Product | null = null;
  buyerName = '';
  buyerPhone = '';
  quantity = 1;
  errorMessage = signal('');
  successMessage = signal('');
  submitting = signal(false);

  constructor(private orderService: OrderService) {}

  open(product: Product): void {
    this.product = product;
    this.isOpen.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.buyerName = '';
    this.buyerPhone = '';
    this.quantity = 1;
  }

  close(): void {
    this.isOpen.set(false);
  }

  onSubmit(): void {
    if (!this.product) return;
    this.submitting.set(true);
    this.errorMessage.set('');

    this.orderService.createBuyer({ name: this.buyerName, phoneNumber: this.buyerPhone }).subscribe({
      next: (buyer) => {
        this.orderService.createOrder({
          productId: this.product!.id,
          buyerId: buyer.id,
          quantity: this.quantity
        }).subscribe({
          next: () => {
            this.successMessage.set('ትዕዛዝህ ተመዝግቧል! ሻጩ በስልክ ያገኝሃል።');
            this.submitting.set(false);
          },
          error: () => {
            this.errorMessage.set('ትዕዛዝ መስጠት አልተሳካም።');
            this.submitting.set(false);
          }
        });
      },
      error: () => {
        this.errorMessage.set('እባክህ ትክክለኛ ስልክ ቁጥር (09... ወይም 07...) አስገባ።');
        this.submitting.set(false);
      }
    });
  }
}