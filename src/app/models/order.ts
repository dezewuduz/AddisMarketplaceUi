export interface Buyer {
  id: number;
  name: string;
  phoneNumber: string;
}

export interface Order {
  id: number;
  productId: number;
  buyerId: number;
  buyer: Buyer | null;
  quantity: number;
  totalPrice: number;
  status: number;
  isPaid: boolean;
  createdAt: string;
}

export const OrderStatusLabels: Record<number, string> = {
  0: 'በመጠባበቅ ላይ',
  1: 'ተረጋግጧል',
  2: 'ተጠናቋል',
  3: 'ተሰርዟል'
};