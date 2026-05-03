import { useState } from 'react';
import { RatingForm } from '../components/RatingForm';

interface Rating {
  stars: number;
  comment: string;
  user: string;
  date: string;
}

export function RatingsDemo() {
  const [ratings, setRatings] = useState<Rating[]>([]);

  const handleRate = (stars: number, comment: string) => {
    setRatings(prev => [
      ...prev,
      {
        stars,
        comment,
        user: 'UsuarioDemo',
        date: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Valoraciones de usuario</h2>
      <RatingForm onRate={handleRate} />
      <ul className="mt-4">
        {ratings.map((r, i) => (
          <li key={i} className="mb-2 border-b pb-2">
            <div className="flex gap-2 items-center">
              <span className="text-yellow-400">{'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}</span>
              <span className="text-xs text-gray-500">{r.user} - {new Date(r.date).toLocaleString()}</span>
            </div>
            {r.comment && <p className="text-gray-700 text-sm mt-1">{r.comment}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
