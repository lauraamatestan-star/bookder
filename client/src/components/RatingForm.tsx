import { useState } from 'react';

interface RatingProps {
  onRate: (stars: number, comment: string) => void;
}

export function RatingForm({ onRate }: RatingProps) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (stars === 0) {
      setError('Selecciona una puntuación');
      return;
    }
    setError('');
    onRate(stars, comment);
    setStars(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            type="button"
            key={n}
            className={`text-2xl ${stars >= n ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => setStars(n)}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        className="w-full border rounded p-2 mb-2"
        rows={2}
        placeholder="Comentario (opcional)"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Valorar</button>
    </form>
  );
}
