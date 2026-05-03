import { useLikes } from '../context/LikesContext';
import { useBooks } from '../hooks/useBooks';
import { BookCard } from '../components/BookCard';

export function Recommendations() {
  const { likes } = useLikes();
  const { books } = useBooks();

  if (likes.length === 0) return null;

  // Recomendaciones por género o autor
  const likedGenres = new Set(likes.map(b => b.genre));
  const likedAuthors = new Set(likes.map(b => b.author));

  const recommended = books.filter(
    b =>
      !likes.some(l => l.id === b.id) &&
      (likedGenres.has(b.genre) || likedAuthors.has(b.author))
  );

  if (recommended.length === 0) return null;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Recomendados para ti</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommended.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
