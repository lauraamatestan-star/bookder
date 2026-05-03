// filepath: client/src/components/BookCard.tsx
import type { Book } from '../types';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import { useUser } from '../context/UserContext';
import { BookBids } from './BookBids';
import { useLikes } from '../context/LikesContext';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { addItem } = useCart();
  const [bids, setBids] = useState(book.bids || []);
  const { likes, addLike, removeLike } = useLikes();
  const isLiked = likes.some(b => b.id === book.id);
  const { lang } = useI18n();
  const { role } = useUser();
  const currency = lang === 'es' ? 'EUR' : 'USD';
  const discount = role === 'premium' ? 0.9 : 1;
  const finalPrice = book.price * discount;
  const priceFormatted = new Intl.NumberFormat(lang === 'es' ? 'es-ES' : 'en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(finalPrice);

  // Badge de estado
  const statusColors: Record<string, string> = {
    'nuevo': 'bg-green-100 text-green-800 border-green-400',
    'usado': 'bg-yellow-100 text-yellow-800 border-yellow-400',
    'muy buscado': 'bg-red-100 text-red-800 border-red-400',
  };

  // Simulación de usuario logueado
  const USER = 'UsuarioDemo';

  // Handler para pujar (solo frontend, no persistente)
  const handleBid = (amount: number) => {
    const newBid = {
      user: USER,
      amount,
      date: new Date().toISOString(),
    };
    setBids(prev => [...prev, newBid]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 bg-gray-200 flex items-center justify-center relative">
        {book.cover ? (
          <img
            src={book.cover}
            alt={book.title}
            className="h-full w-full object-cover transition-opacity duration-700 opacity-0"
            loading="lazy"
            onLoad={e => e.currentTarget.classList.add('opacity-100')}
          />
        ) : (
          <span className="text-4xl">📖</span>
        )}
        {/* Badge de estado */}
        <span
          className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-semibold border ${statusColors[book.status] || 'bg-gray-200 text-gray-700 border-gray-300'}`}
        >
          {book.status}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 truncate">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">{book.author}</p>
        <p className="text-indigo-600 font-bold text-xl">{priceFormatted}</p>
        {book.description && (
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">{book.description}</p>
        )}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => addItem(book)}
            className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Agregar al Carrito
          </button>
          <button
            onClick={() => isLiked ? removeLike(book.id) : addLike(book)}
            className={`flex items-center px-3 py-2 rounded-lg border transition ${isLiked ? 'bg-pink-100 text-pink-600 border-pink-400' : 'bg-white text-gray-500 border-gray-300 hover:bg-pink-50'}`}
            title={isLiked ? 'Quitar de favoritos' : 'Me gusta'}
          >
            <span className="mr-1">❤️</span>
          </button>
        </div>

        {/* Solo mostrar pujas si es muy buscado */}
        {book.status === 'muy buscado' && (
          <BookBids book={{ ...book, bids }} onBid={handleBid} />
        )}
      </div>
    </div>
  );
}