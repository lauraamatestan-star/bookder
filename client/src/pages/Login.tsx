
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

export function Login() {

  const { setRole } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Si no hay usuario registrado, redirigir a registro
  const userRegistered = localStorage.getItem('user');
  if (!userRegistered) {
    setTimeout(() => navigate('/register'), 100);
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (username === user.username && password === user.password) {
      setRole('normal');
      navigate('/');
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80 relative">
        <button type="button" onClick={() => navigate(-1)} className="absolute left-2 top-2 text-xl text-indigo-600 hover:text-indigo-900" title="Volver atrás">←</button>
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Entrar</button>
        <div className="mt-4 text-center text-sm">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline">Regístrate</Link>
        </div>
      </form>
    </div>
  );
}
