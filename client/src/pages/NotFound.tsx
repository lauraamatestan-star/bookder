// filepath: client/src/pages/NotFound.tsx
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
        <Link
          to="/"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Volver al Inicio
        </Link>
      </main>
    </div>
  );
}