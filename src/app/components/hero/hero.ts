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
    { num: '014', label: 'ልብስ', category: 'ልብስ' },
    { num: '027', label: 'ጫማ', category: 'ጫማ' },
    { num: '031', label: 'ኤሌክትሮ.', category: 'ኤሌክትሮኒክስ' },
    { num: '045', label: 'የቤት እቃ', category: 'የቤት እቃ' },
    { num: '052', label: 'ኮስሜቲክስ', category: 'ኮስሜቲክስ' },
    { num: '063', label: 'ጌጣጌጥ', category: 'ጌጣጌጥ' },
    { num: '071', label: 'ስፖርት', category: 'ሌላ' },
    { num: '084', label: 'ስልክ', category: 'ኤሌክትሮኒክስ' },
    { num: '099', label: 'ሌላ', category: 'ሌላ' },
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