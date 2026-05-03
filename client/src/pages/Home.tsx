// filepath: client/src/pages/Home.tsx
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            📚 Bienvenido a <span className="text-indigo-600">Bookder</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tu plataforma favorite para comprar y vender libros. 
            Explora nuestro catálogo o publica tus propios libros.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/catalog"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-700 transition"
            >
              Ver Catálogo
            </Link>
            <Link
              to="/upload"
              className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-indigo-50 transition"
            >
              Subir un Libro
            </Link>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="text-xl font-bold mb-2">Gran Variedad</h3>
            <p className="text-gray-600">Miles de libros de todos los géneros</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Precios Justos</h3>
            <p className="text-gray-600">Los mejores precios del mercado</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-2">Envío Rápido</h3>
            <p className="text-gray-600">Recibe tus libros en casa</p>
          </div>
        </div>
      </main>
    </div>
  );
}