import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryFilterService } from '../../services/category-filter';

@Component({
  selector: 'app-category-chips',
  imports: [CommonModule],
  templateUrl: './category-chips.html',
  styleUrl: './category-chips.css',
})
export class CategoryChips {
  categories = ['ሁሉም', 'ልብስ', 'ጫማ', 'ኤሌክትሮኒክስ', 'የቤት እቃ', 'ኮስሜቲክስ', 'ጌጣጌጥ'];

  constructor(public filterService: CategoryFilterService) {}

  selectCategory(category: string): void {
    this.filterService.selectedCategory.set(category);
  }
}