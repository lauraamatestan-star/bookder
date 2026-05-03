// filepath: client/src/types/index.ts
export interface Bid {
  user: string; // id o nombre de usuario
  amount: number;
  date: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  status: 'nuevo' | 'usado' | 'muy buscado';
  city: string;
  disponible: boolean;
  price: number;
  cover?: string;
  description?: string;
  createdAt: string;
  bids?: Bid[];
}

export interface CreateBookRequest {
  title: string;
  author: string;
  genre: string;
  status: 'nuevo' | 'usado' | 'muy buscado';
  city: string;
  disponible: boolean;
  price: number;
  cover?: string;
  description?: string;
  bids?: Bid[];
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface ApiError {
  message: string;
  code: string;
}