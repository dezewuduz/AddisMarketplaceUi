import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryFilterService {
  selectedCategory = signal<string>('All');
  searchQuery = signal<string>('');
}