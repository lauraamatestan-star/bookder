import { render, screen } from '@testing-library/react';
import { BookCard } from '../components/BookCard';
import type { Book } from '../types';

describe('BookCard', () => {
  const book: Book = {
    id: '1',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    genre: 'Novela',
    status: 'nuevo',
    city: 'Madrid',
    disponible: true,
    price: 15.99,
    cover: '',
    description: 'Una historia poética sobre un pequeño príncipe.',
    createdAt: new Date().toISOString(),
  };

  it('muestra el título y autor', () => {
    render(<BookCard book={book} />);
    expect(screen.getByText('El Principito')).toBeInTheDocument();
    expect(screen.getByText('Antoine de Saint-Exupéry')).toBeInTheDocument();
  });

  it('muestra el precio', () => {
    render(<BookCard book={book} />);
    expect(screen.getByText('$15.99')).toBeInTheDocument();
  });
});
