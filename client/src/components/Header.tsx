import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useI18n } from '../context/I18nContext';
import { useState } from 'react';

export function Header() {
  const { itemCount } = useCart();
  const { lang, setLang } = useI18n();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-indigo-600 text-white shadow-lg w-full">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-indigo-200 flex items-center gap-2">
          <span role="img" aria-label="libro">📚</span> Bookder
        </Link>
        {/* Botón hamburguesa solo en móvil */}
        <button
          className="md:hidden flex flex-col justify-center items-center ml-2 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Abrir menú"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
        {/* Navegación principal */}
        <nav
          className={`fixed md:static top-0 right-0 h-full md:h-auto w-2/3 max-w-xs md:max-w-none bg-indigo-700 md:bg-transparent z-40 flex flex-col md:flex-row gap-6 items-start md:items-center p-8 md:p-0 transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}
        >
          <Link to="/" className="hover:text-indigo-200 transition w-full md:w-auto mb-4 md:mb-0" onClick={() => setMenuOpen(false)}>
            <span role="img" aria-label="inicio">🏠</span> Inicio
          </Link>
          <Link to="/catalog" className="hover:text-indigo-200 transition w-full md:w-auto mb-4 md:mb-0" onClick={() => setMenuOpen(false)}>
            <span role="img" aria-label="catálogo">📖</span> Catálogo
          </Link>
          <Link to="/upload" className="hover:text-indigo-200 transition w-full md:w-auto mb-4 md:mb-0" onClick={() => setMenuOpen(false)}>
            <span role="img" aria-label="subir">⬆️</span> Subir Libro
          </Link>
          <Link
            to="/cart"
            className="relative bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-500 transition w-full md:w-auto mb-4 md:mb-0"
            onClick={() => setMenuOpen(false)}
          >
            <span role="img" aria-label="carrito">🛒</span> Carrito
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <select
            value={lang}
            onChange={e => setLang(e.target.value as 'es' | 'en')}
            className="ml-0 md:ml-4 px-2 py-1 rounded text-gray-800 w-full md:w-auto mb-4 md:mb-0"
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
          {user ? (
            <div className="relative ml-0 md:ml-4 w-full md:w-auto">
              <button
                className="flex items-center gap-2 text-2xl hover:text-indigo-200 focus:outline-none w-full md:w-auto"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span role="img" aria-label="usuario">👤</span>
                <span className="text-base font-medium">Bienvenida, {user.username}</span>
                <span className="text-lg">▼</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-indigo-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Mi perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-indigo-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="ml-0 md:ml-4 text-2xl hover:text-indigo-200 w-full md:w-auto" title="Iniciar sesión" onClick={() => setMenuOpen(false)}>
              <span role="img" aria-label="usuario">👤</span>
            </Link>
          )}
        </nav>
        {/* Fondo oscuro al abrir menú en móvil */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden" onClick={() => setMenuOpen(false)}></div>
        )}
      </div>
    </header>
  );
}