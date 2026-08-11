import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { ProductGrid } from './components/product-grid/product-grid';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Hero, ProductGrid],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('addis-marketplace-ui');
}