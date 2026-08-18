import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

export interface CreateOrderRequest {
  productId: number;
  buyerId: number;
  quantity: number;
}

export interface CreateBuyerRequest {
  name: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:5161/api/Orders';
  private buyersUrl = 'http://localhost:5161/api/Buyers';

  constructor(private http: HttpClient) {}

  createBuyer(data: CreateBuyerRequest): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.buyersUrl, data);
  }

  createOrder(data: CreateOrderRequest): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, data);
  }

  getOrdersBySeller(sellerId: number): Observable<Order[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.get<Order[]>(`${this.ordersUrl}/seller/${sellerId}`, { headers });
  }

  updateStatus(orderId: number, status: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put(`${this.ordersUrl}/${orderId}/status`, { status }, { headers });
  }

  confirmPayment(orderId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http.put(`${this.ordersUrl}/${orderId}/confirm-payment`, {}, { headers });
  }
}