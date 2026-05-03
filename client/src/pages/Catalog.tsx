// filepath: client/src/pages/Catalog.tsx
import { Header } from '../components/Header';
import { BookCard } from '../components/BookCard';
import { InfiniteBooks } from '../components/InfiniteBooks';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useBooks } from '../hooks/useBooks';

import { useState } from 'react';
import { Recommendations } from './Recommendations';

// Simulación: ciudad del usuario logueado
const USER_CITY = 'Madrid';
export function Catalog() {
  const { books, loading, error, refetch } = useBooks();
  const [selectedGenre, setSelectedGenre] = useState('');

  const genres = Array.from(new Set(books.map(b => b.genre).filter(Boolean)));

  // Filtrado por género, ciudad y disponibilidad
  const filteredBooks = books
    .filter(book => book.disponible)
    .filter(book => book.city === USER_CITY)
    .filter(book => (selectedGenre ? book.genre === selectedGenre : true));

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">📚 Catálogo de Libros</h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center">
          <label className="font-medium text-gray-700">Filtrar por género:</label>
          <select
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300"
          >
            <option value="">Todos</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        {loading && <LoadingSpinner size="lg" />}

        {error && <ErrorMessage message={error} onRetry={refetch} />}

        {/* Recomendaciones por me gusta */}
        {!loading && !error && <Recommendations />}

        {!loading && !error && filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay libros disponibles para este género.</p>
            <p className="text-gray-400">¡Prueba con otro filtro o sube un libro!</p>
          </div>
        )}

        {!loading && !error && filteredBooks.length > 0 && (
          <InfiniteBooks books={filteredBooks} />
        )}
      </main>
    </div>
  );
}