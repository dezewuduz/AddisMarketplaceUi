import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  imports: [FormsModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  searchQuery = '';

  onSearch(): void {
    console.log('Search:', this.searchQuery);
    // ወደፊት፦ ProductService.searchProducts() ወይም route ወደ /products?q=...
  }
}