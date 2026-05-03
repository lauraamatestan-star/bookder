// filepath: client/src/hooks/useBooks.ts
import { useState, useEffect, useCallback } from 'react';
import type { Book, CreateBookRequest } from '../types';
import { bookApi } from '../api/client';

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

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await bookApi.getAll();
      setBooks(data);
    } catch (err) {
      setError('Error al cargar los libros. Por favor, intenta de nuevo.');
      console.error('Error fetching books:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addBook = async (bookData: CreateBookRequest): Promise<Book | null> => {
    try {
      const newBook = await bookApi.create(bookData);
      setBooks(prev => [...prev, newBook]);
      return newBook;
    } catch (err) {
      setError('Error al crear el libro.');
      console.error('Error creating book:', err);
      return null;
    }
  };

  const deleteBook = async (id: string): Promise<void> => {
    try {
      await bookApi.delete(id);
      setBooks(prev => prev.filter(book => book.id !== id));
    } catch (err) {
      setError('Error al eliminar el libro.');
      console.error('Error deleting book:', err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return { books, loading, error, refetch: fetchBooks, addBook, deleteBook };
}