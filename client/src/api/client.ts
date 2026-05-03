// filepath: client/src/api/client.ts
import axios from 'axios';
import type { Book, CreateBookRequest } from '../types';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
});

export const bookApi = {
  getAll: async (): Promise<Book[]> => {
    const response = await client.get<Book[]>('/books');
    return response.data;
  },

  getById: async (id: string): Promise<Book> => {
    const response = await client.get<Book>(`/books/${id}`);
    return response.data;
  },

  create: async (data: CreateBookRequest): Promise<Book> => {
    const response = await client.post<Book>('/books', data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await client.delete(`/books/${id}`);
  },
};