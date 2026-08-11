import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryFilterService {
  selectedCategory = signal<string>('ሁሉም');
}