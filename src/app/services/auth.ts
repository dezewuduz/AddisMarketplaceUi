import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { RegisterRequest, LoginRequest, LoginResponse } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5161/api/Auth';

  isLoggedIn = signal<boolean>(false);
  sellerName = signal<string>('');

  constructor(private http: HttpClient) {
    // ገጹ ዳግም ሲጫን (refresh) ካለ token ግባ (login) ሁኔታ አስቀጥል
    const savedToken = localStorage.getItem('token');
    const savedName = localStorage.getItem('sellerName');
    if (savedToken && savedName) {
      this.isLoggedIn.set(true);
      this.sellerName.set(savedName);
    }
  }

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('sellerId', response.sellerId.toString());
        localStorage.setItem('sellerName', response.name);
        this.isLoggedIn.set(true);
        this.sellerName.set(response.name);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('sellerId');
    localStorage.removeItem('sellerName');
    this.isLoggedIn.set(false);
    this.sellerName.set('');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}