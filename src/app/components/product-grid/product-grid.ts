import { Component, OnInit, signal, computed, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { CategoryFilterService } from '../../services/category-filter';
import { Product } from '../../models/product';
import { OrderModal } from '../order-modal/order-modal';

@Component({
  selector: 'app-product-grid',
  imports: [CommonModule, OrderModal],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.css',
})
export class ProductGrid implements OnInit {
  allProducts = signal<Product[]>([]);
  loading = signal(true);
  error = signal(false);

  @ViewChild('orderModal') orderModal!: OrderModal;

  filteredProducts = computed(() => {
  const category = this.filterService.selectedCategory();
  const query = this.filterService.searchQuery().trim().toLowerCase();
  let result = this.allProducts();

  if (category !== 'ሁሉም') {
    result = result.filter(p => p.category === category);
  }
  if (query) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }
  return result;
});

  constructor(
    private productService: ProductService,
    public filterService: CategoryFilterService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.allProducts.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      }
    });
  }

  onBuyClick(product: Product): void {
    this.orderModal.open(product);
  }
}