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
  isAdmin = signal<boolean>(false);

  constructor(private http: HttpClient) {
    // Check if there's a saved token and seller name when the app loads (refresh)
    const savedToken = localStorage.getItem('token');
    const savedName = localStorage.getItem('sellerName');
    if (savedToken && savedName) {
      this.isLoggedIn.set(true);
      this.sellerName.set(savedName);
      this.isAdmin.set(this.decodeRole(savedToken) === 'Admin');
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
        this.isAdmin.set(this.decodeRole(response.token) === 'Admin');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('sellerId');
    localStorage.removeItem('sellerName');
    this.isLoggedIn.set(false);
    this.sellerName.set('');
    this.isAdmin.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // JWT token inside role claim how to decode it and check if the user is an admin
  private decodeRole(token: string): string | null {
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? null;
    } catch {
      return null;
    }
  }
}