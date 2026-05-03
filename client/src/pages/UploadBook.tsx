// filepath: client/src/pages/UploadBook.tsx
import { useState, type FormEvent } from 'react';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useBooks } from '../hooks/useBooks';
import type { CreateBookRequest } from '../types';

interface FormErrors {
  title?: string;
  author?: string;
  genre?: string;
  status?: string;
  price?: string;
}

export function UploadBook() {
  const { addBook } = useBooks();
  const [formData, setFormData] = useState<CreateBookRequest>({
    title: '',
    author: '',
    genre: '',
    status: 'nuevo',
    city: '',
    disponible: true,
    price: 0,
    cover: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'El título es requerido';
    } else if (formData.title.length < 2) {
      newErrors.title = 'El título debe tener al menos 2 caracteres';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'El autor es requerido';
    } else if (formData.author.length < 2) {
      newErrors.author = 'El autor debe tener al menos 2 caracteres';
    }
    if (!formData.genre.trim()) {
      newErrors.genre = 'El género es requerido';
    }
    if (!formData.status) {
      newErrors.status = 'El estado es requerido';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'La ciudad es requerida';
    }
    if (formData.price <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSuccessMessage('');
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    const result = await addBook(formData);
    setIsSubmitting(false);
    
    if (result) {
      setSuccessMessage('¡Libro subido exitosamente!');
      setFormData({ title: '', author: '', genre: '', status: 'nuevo', price: 0, cover: '', description: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'price'
          ? parseFloat(value) || 0
          : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">📤 Subir un Libro</h1>
        
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            ✅ {successMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <Input
            label="Título *"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            placeholder="Ej: El Principito"
            required
          />
          
          <Input
            label="Autor *"
            name="author"
            value={formData.author}
            onChange={handleChange}
            error={errors.author}
            placeholder="Ej: Antoine de Saint-Exupéry"
            required
          />
          
          <Input
            label="Precio ($) *"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price || ''}
            onChange={handleChange}
            error={errors.price}
            placeholder="Ej: 15.99"
            required
          />

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Género *</label>
            <select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.genre ? 'border-red-500' : 'border-gray-300'}`}
              required
            >
              <option value="">Selecciona un género</option>
              <option value="Novela">Novela</option>
              <option value="Fantasía">Fantasía</option>
              <option value="Historia">Historia</option>
              <option value="Ciencia ficción">Ciencia ficción</option>
              <option value="Romance">Romance</option>
              <option value="Misterio">Misterio</option>
              <option value="Infantil">Infantil</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
          </div>
          

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Estado *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
              required
            >
              <option value="nuevo">Nuevo</option>
              <option value="usado">Usado</option>
              <option value="muy buscado">Muy buscado</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Ciudad *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Ej: Madrid, Barcelona..."
              required
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="disponible"
              checked={formData.disponible}
              onChange={handleChange}
              className="mr-2"
              id="disponible"
            />
            <label htmlFor="disponible" className="text-gray-700 font-medium">Disponible para intercambio/compra</label>
          </div>

          <Input
            label="URL de portada"
            name="cover"
            type="url"
            value={formData.cover || ''}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Descripción</label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Una breve descripción del libro..."
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Subiendo...' : 'Subir Libro'}
          </Button>
        </form>
      </main>
    </div>
  );
}