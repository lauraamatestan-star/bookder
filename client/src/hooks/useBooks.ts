// filepath: client/src/hooks/useBooks.ts
import { useState, useEffect, useCallback } from 'react';
import type { Book, CreateBookRequest } from '../types';

interface UseBooksReturn {
  books: Book[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  addBook: (book: CreateBookRequest) => Promise<Book | null>;
  deleteBook: (id: string) => Promise<void>;
}

export function useBooks(): UseBooksReturn {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Clave de localStorage
  const STORAGE_KEY = 'books';

  // Cargar libros desde localStorage o inicializar con algunos por defecto
  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let data: Book[] = [];
      if (stored) {
        data = JSON.parse(stored);
      } else {
        // Libros por defecto
        data = [
          {
            id: '1',
            title: 'El Principito',
            author: 'Antoine de Saint-Exupéry',
            price: 15.99,
            cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
            description: 'Una historia poética sobre un pequeño príncipe que visita diferentes planetas.',
            createdAt: new Date().toISOString(),
            city: 'Madrid',
            disponible: true,
            genre: 'Novela',
            status: 'nuevo',
          },
        ];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      }
      setBooks(data);
    } catch (err) {
      setError('Error al cargar los libros.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addBook = async (bookData: CreateBookRequest): Promise<Book | null> => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const current: Book[] = stored ? JSON.parse(stored) : [];
      const newBook: Book = {
        ...bookData,
        id: (current.length > 0 ? (parseInt(current[current.length - 1].id) + 1).toString() : '1'),
        createdAt: new Date().toISOString(),
      };
      const updated = [...current, newBook];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setBooks(updated);
      return newBook;
    } catch (err) {
      setError('Error al crear el libro.');
      return null;
    }
  };

  const deleteBook = async (id: string): Promise<void> => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const current: Book[] = stored ? JSON.parse(stored) : [];
      const updated = current.filter(book => book.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setBooks(updated);
    } catch (err) {
      setError('Error al eliminar el libro.');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { books, loading, error, refetch: fetchBooks, addBook, deleteBook };
}