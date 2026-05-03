import { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import { useUser } from '../context/UserContext';
import type { Book } from '../types';

interface SwipeCardProps {
  book: Book;
  onSwipe: (direction: 'left' | 'right', book: Book) => void;
}

function SwipeCard({ book, onSwipe }: SwipeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
      <img src={book.cover} alt={book.title} className="h-40 w-32 object-cover mb-4 rounded" />
      <h3 className="font-bold text-lg mb-1">{book.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{book.author}</p>
      <p className="text-indigo-600 font-bold text-xl mb-2">${book.price.toFixed(2)}</p>
      <div className="flex gap-4 mt-4">
        <button
          className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-bold text-lg hover:bg-red-200"
          onClick={() => onSwipe('left', book)}
        >
          ❌
        </button>
        <button
          className="bg-green-100 text-green-600 px-4 py-2 rounded-lg font-bold text-lg hover:bg-green-200"
          onClick={() => onSwipe('right', book)}
        >
          ✅
        </button>
      </div>
    </div>
  );
}

export function SwapTinder() {
  const { books } = useBooks();
  const { role } = useUser();
  const [index, setIndex] = useState(0);
  const [matches, setMatches] = useState<Book[]>([]);
  const [swiped, setSwiped] = useState<Book[]>([]);

  // Premium: más matches y prioridad (simulado)
  let availableBooks = books.filter(b => b.disponible);
  if (role === 'premium') {
    // Prioridad: primero los "muy buscado"
    availableBooks = [
      ...availableBooks.filter(b => b.status === 'muy buscado'),
      ...availableBooks.filter(b => b.status !== 'muy buscado'),
    ];
  }
  const maxMatches = role === 'premium' ? 10 : 3;
  const currentBook = availableBooks[index];

  const handleSwipe = (direction: 'left' | 'right', book: Book) => {
    setSwiped(prev => [...prev, book]);
    if (direction === 'right' && matches.length < maxMatches) {
      setMatches(prev => [...prev, book]);
    }
    setIndex(i => i + 1);
  };

  if (!currentBook) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Trueques tipo Tinder</h2>
        {matches.length > 0 ? (
          <div>
            <p className="mb-2">¡Has hecho match con estos libros!</p>
            <ul className="flex flex-wrap gap-4 justify-center">
              {matches.map(book => (
                <li key={book.id} className="bg-green-100 px-3 py-2 rounded-lg">
                  {book.title} ({book.author})
                </li>
              ))}
            </ul>
            <p className="mt-4 text-indigo-700 font-semibold">{role === 'premium' ? '¡Eres usuario premium! Tienes más matches y prioridad.' : 'Hazte premium para más ventajas.'}</p>
          </div>
        ) : (
          <p>No hay más libros para mostrar.</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Trueques tipo Tinder</h2>
      <SwipeCard book={currentBook} onSwipe={handleSwipe} />
      <p className="mt-4 text-gray-500">Libro {index + 1} de {availableBooks.length}</p>
      {role === 'premium' && <p className="mt-2 text-green-600 font-semibold">Ventaja premium: más matches y prioridad</p>}
    </div>
  );
}
