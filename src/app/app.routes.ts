import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Dashboard } from './components/dashboard/dashboard';
import { BuyerGuide } from './components/buyer-guide/buyer-guide';
import { MyOrders } from './components/my-orders/my-orders';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'dashboard', component: Dashboard },
  { path: 'buyer-guide', component: BuyerGuide },
  { path: 'my-orders', component: MyOrders },
  { path: 'admin', component: AdminDashboard },
];