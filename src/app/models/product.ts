export interface Product {
  id: number;
  sellerId: number;
  sellerName: string;
  name: string;
  description: string;
  price: number;
  photoUrl: string | null;
  category: string;
  isActive: boolean;
  createdAt: string;
}