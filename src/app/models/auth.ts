export interface RegisterRequest {
  name: string;
  location: string;
  phoneNumber: string;
  password: string;
}

export interface LoginRequest {
  phoneNumber: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  sellerId: number;
  name: string;
}