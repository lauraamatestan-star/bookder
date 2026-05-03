import { useState } from 'react';
import type { Book } from '../types';

interface BookBidsProps {
  book: Book;
  onBid: (amount: number) => void;
}

export function BookBids({ book, onBid }: BookBidsProps) {
  const [bidAmount, setBidAmount] = useState('');
  const [error, setError] = useState('');

  const handleBid = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Introduce una cantidad válida');
      return;
    }
    setError('');
    onBid(amount);
    setBidAmount('');
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold text-sm mb-2">Pujas</h4>
      <ul className="mb-2 max-h-24 overflow-y-auto text-xs">
        {book.bids && book.bids.length > 0 ? (
          book.bids.slice().sort((a, b) => b.amount - a.amount).map((bid, idx) => (
            <li key={idx} className="mb-1">
              <span className="font-bold">{bid.user}:</span> ${bid.amount} <span className="text-gray-400">({new Date(bid.date).toLocaleString()})</span>
            </li>
          ))
        ) : (
          <li className="text-gray-400">Sin pujas aún</li>
        )}
      </ul>
      <form onSubmit={handleBid} className="flex gap-2">
        <input
          type="number"
          min="0.01"
          step="0.01"
          value={bidAmount}
          onChange={e => setBidAmount(e.target.value)}
          className="border px-2 py-1 rounded w-24"
          placeholder="Tu puja"
        />
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-xs">Pujar</button>
      </form>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
