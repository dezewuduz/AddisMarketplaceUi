import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order';
import { Order, OrderStatusLabels } from '../../models/order';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {
  phoneNumber = '';
  orders = signal<Order[]>([]);
  loading = signal(false);
  searched = signal(false);
  errorMessage = signal('');
  statusLabels = OrderStatusLabels;

  constructor(private orderService: OrderService) {}

  onSearch(): void {
    if (!this.phoneNumber.trim()) return;

    this.loading.set(true);
    this.searched.set(true);
    this.errorMessage.set('');

    this.orderService.getOrdersByBuyerPhone(this.phoneNumber.trim()).subscribe({
      next: (data) => {
        this.orders.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Could not load orders.');
        this.loading.set(false);
      }
    });
  }
}