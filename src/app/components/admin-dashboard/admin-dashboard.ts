import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerService } from '../../services/seller';
import { Seller } from '../../models/seller';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  sellers = signal<Seller[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.loadSellers();
  }

  loadSellers(): void {
    this.loading.set(true);
    this.sellerService.getSellers().subscribe({
      next: (data) => {
        this.sellers.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('sellers could not be loaded');
        this.loading.set(false);
      }
    });
  }

  onVerify(id: number): void {
    this.sellerService.verifySeller(id).subscribe({
      next: () => this.loadSellers(),
      error: () => this.errorMessage.set('could not verify seller')
    });
  }
}