import { createContext, useContext, useState } from 'react';
import type { Book } from '../types';

interface LikesContextType {
  likes: Book[];
  addLike: (book: Book) => void;
  removeLike: (bookId: string) => void;
}

const LikesContext = createContext<LikesContextType | undefined>(undefined);

export function LikesProvider({ children }: { children: React.ReactNode }) {
  const [likes, setLikes] = useState<Book[]>([]);

  const addLike = (book: Book) => {
    setLikes(prev => prev.some(b => b.id === book.id) ? prev : [...prev, book]);
  };

  const removeLike = (bookId: string) => {
    setLikes(prev => prev.filter(b => b.id !== bookId));
  };

  return (
    <LikesContext.Provider value={{ likes, addLike, removeLike }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  const ctx = useContext(LikesContext);
  if (!ctx) throw new Error('useLikes debe usarse dentro de LikesProvider');
  return ctx;
}
