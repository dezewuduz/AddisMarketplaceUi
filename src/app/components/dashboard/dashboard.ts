import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, CreateProductRequest } from '../../services/product';
import { AuthService } from '../../services/auth';
import { UploadService } from '../../services/upload';
import { Product } from '../../models/product';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  myProducts = signal<Product[]>([]);
  loading = signal(true);
  showAddForm = signal(false);
  errorMessage = signal('');
  uploading = signal(false);

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
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadMyProducts();
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