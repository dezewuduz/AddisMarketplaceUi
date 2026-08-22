import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CategoryFilterService } from '../../services/category-filter';
import { ModalStateService } from '../../services/modal-state';

@Component({
  selector: 'app-hero',
  imports: [FormsModule, RouterLink],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  searchQuery = '';

 stalls = [
  { num: '014', label: 'Clothing', category: 'Clothing' },
  { num: '027', label: 'Shoes', category: 'Shoes' },
  { num: '031', label: 'Electro.', category: 'Electronics' },
  { num: '045', label: 'Household', category: 'Household Items' },
  { num: '052', label: 'Cosmetics', category: 'Cosmetics' },
  { num: '063', label: 'Jewelry', category: 'Jewelry' },
  { num: '071', label: 'Sports', category: 'Other' },
  { num: '084', label: 'Phones', category: 'Electronics' },
  { num: '099', label: 'Other', category: 'Other' },
];

  constructor(
    public filterService: CategoryFilterService,
    public modalState: ModalStateService
  ) {}

  onSearch(): void {
    this.filterService.searchQuery.set(this.searchQuery);
    document.querySelector('.product-section')?.scrollIntoView({ behavior: 'smooth' });
  }

  onStallClick(category: string): void {
    this.filterService.selectedCategory.set(category);
    document.querySelector('.product-section')?.scrollIntoView({ behavior: 'smooth' });
  }
}