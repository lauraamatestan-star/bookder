import { useState } from 'react';
import { BookCard } from '../components/BookCard';

interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: { thumbnail?: string };
  };
}

export function ExternalBookSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=12`
      );
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      setError('Error al buscar libros externos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Buscar libros en Google Books</h2>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Título, autor, ISBN..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Buscar</button>
      </form>
      {loading && <p className="text-gray-500">Buscando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {results.map(book => (
          <div key={book.id} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
              className="h-40 w-32 object-cover mb-2 rounded"
            />
            <h3 className="font-bold text-lg mb-1 text-center">{book.volumeInfo.title}</h3>
            <p className="text-gray-600 text-sm mb-2 text-center">
              {book.volumeInfo.authors?.join(', ')}
            </p>
            <p className="text-gray-500 text-xs line-clamp-3 mb-2 text-center">
              {book.volumeInfo.description}
            </p>
            {/* Aquí podrías añadir botón para importar */}
          </div>
        ))}
      </div>
    </div>
  );
}
