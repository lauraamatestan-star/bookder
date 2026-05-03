import { useState, useRef, useCallback, useEffect } from 'react';
import { BookCard } from '../components/BookCard';
import type { Book } from '../types';

interface InfiniteBooksProps {
  books: Book[];
  batchSize?: number;
}

export function InfiniteBooks({ books, batchSize = 8 }: InfiniteBooksProps) {
  const [visible, setVisible] = useState(batchSize);
  const loader = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setVisible(v => Math.min(v + batchSize, books.length));
    }
  }, [books.length, batchSize]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    };
    const observer = new window.IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  useEffect(() => {
    setVisible(batchSize);
  }, [books, batchSize]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.slice(0, visible).map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      <div ref={loader} />
      {visible < books.length && (
        <div className="text-center text-gray-400 py-4">Cargando más libros...</div>
      )}
    </>
  );
}
