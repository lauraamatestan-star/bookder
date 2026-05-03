
import { useUser } from '../context/UserContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Profile() {
  const { role, setRole } = useUser();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(role);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setUsername(user.username || '');
    setFullName(user.fullName || '');
    setEmail(user.email || '');
    setSelected(user.role || role);
  }, [role]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value as 'normal' | 'premium');
    setRole(e.target.value as 'normal' | 'premium');
  };


  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = {
      ...user,
      username,
      fullName,
      email,
      role: selected,
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate(-1); // Volver a la página anterior
    }, 1200);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSave} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-indigo-700 text-center">Perfil de usuario</h2>
        <label className="block mb-2 font-medium">Usuario</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
          disabled
        />
        <label className="block mb-2 font-medium">Nombre completo</label>
        <input
          type="text"
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
        />
        <label className="block mb-2 font-medium">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
        />
        <label className="block mb-2 font-medium">Tipo de cuenta</label>
        <select
          value={selected}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded mb-4"
        >
          <option value="normal">Normal</option>
          <option value="premium">Premium</option>
        </select>
        <div className="text-gray-600 text-sm text-center mb-4">
          {selected === 'premium'
            ? '¡Disfrutas de un 10% de descuento en todos los libros!'
            : 'Actualiza a premium para obtener descuentos.'}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={handleBack} className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition">Atrás</button>
          <button type="submit" className="w-1/2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Guardar</button>
        </div>
        {success && <div className="text-green-600 text-center mt-2">¡Perfil guardado!</div>}
      </form>
    </div>
  );
}
