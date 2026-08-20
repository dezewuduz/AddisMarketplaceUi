import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { BuyerGuide } from './components/buyer-guide/buyer-guide';
import { MyOrders } from './components/my-orders/my-orders';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'buyer-guide', component: BuyerGuide },
  { path: 'my-orders', component: MyOrders },
  { path: '', redirectTo: '', pathMatch: 'full' }
];