import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, CreateProductRequest } from '../../services/product';
import { AuthService } from '../../services/auth';
import { UploadService } from '../../services/upload';
import { OrderService } from '../../services/order';
import { Product } from '../../models/product';
import { Order, OrderStatusLabels } from '../../models/order';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  activeTab = signal<'products' | 'orders'>('products');

  myProducts = signal<Product[]>([]);
  loading = signal(true);
  showAddForm = signal(false);
  errorMessage = signal('');
  uploading = signal(false);

  myOrders = signal<Order[]>([]);
  ordersLoading = signal(true);
  statusLabels = OrderStatusLabels;

  newProduct: CreateProductRequest = {
    name: '',
    description: '',
    price: 0,
    photoUrl: null,
    category: ''
  };

  constructor(
    private productService: ProductService,
    private uploadService: UploadService,
    private orderService: OrderService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMyProducts();
    this.loadMyOrders();
  }

  loadMyProducts(): void {
    const sellerId = localStorage.getItem('sellerId');
    if (!sellerId) return;

    this.loading.set(true);
    this.productService.getProductsBySeller(Number(sellerId)).subscribe({
      next: (data) => {
        this.myProducts.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  loadMyOrders(): void {
    const sellerId = localStorage.getItem('sellerId');
    if (!sellerId) return;

    this.ordersLoading.set(true);
    this.orderService.getOrdersBySeller(Number(sellerId)).subscribe({
      next: (data) => {
        this.myOrders.set(data);
        this.ordersLoading.set(false);
      },
      error: () => this.ordersLoading.set(false)
    });
  }

  onConfirmOrder(orderId: number): void {
    this.orderService.updateStatus(orderId, 1).subscribe({
      next: () => this.loadMyOrders(),
      error: () => this.errorMessage.set('ትዕዛዝ ማረጋገጥ አልተሳካም።')
    });
  }

  onCompleteOrder(orderId: number): void {
    this.orderService.updateStatus(orderId, 2).subscribe({
      next: () => this.loadMyOrders(),
      error: () => this.errorMessage.set('ትዕዛዝ ማጠናቀቅ አልተሳካም።')
    });
  }

  onCancelOrder(orderId: number): void {
    this.orderService.updateStatus(orderId, 3).subscribe({
      next: () => this.loadMyOrders(),
      error: () => this.errorMessage.set('ትዕዛዝ መሰረዝ አልተሳካም።')
    });
  }

  onConfirmPayment(orderId: number): void {
    this.orderService.confirmPayment(orderId).subscribe({
      next: () => this.loadMyOrders(),
      error: () => this.errorMessage.set('ክፍያ ማረጋገጥ አልተሳካም።')
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.uploading.set(true);
    this.uploadService.uploadPhoto(file).subscribe({
      next: (res) => {
        this.newProduct.photoUrl = res.url;
        this.uploading.set(false);
      },
      error: () => {
        this.errorMessage.set('ፎቶ መጫን አልተሳካም።');
        this.uploading.set(false);
      }
    });
  }

  onAddProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.showAddForm.set(false);
        this.newProduct = { name: '', description: '', price: 0, photoUrl: null, category: '' };
        this.loadMyProducts();
      },
      error: () => this.errorMessage.set('ምርት መጨመር አልተሳካም።')
    });
  }

  onDelete(id: number): void {
    if (!confirm('እርግጠኛ ነህ ይህን ምርት መሰረዝ ትፈልጋለህ?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadMyProducts(),
      error: () => this.errorMessage.set('መሰረዝ አልተሳካም።')
    });
  }
}