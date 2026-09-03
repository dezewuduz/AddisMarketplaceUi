import { Component } from '@angular/core';
import { Hero } from '../hero/hero';
import { CategoryChips } from '../category-chips/category-chips';
import { ProductGrid } from '../product-grid/product-grid';

@Component({
  selector: 'app-home',
  imports: [Hero, CategoryChips, ProductGrid],
  templateUrl: './home.html',
})
export class Home {}