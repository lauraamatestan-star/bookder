# Formularios en Bookder

## Ejemplo: Formulario para subir libro

- Se utiliza un formulario controlado con useState para gestionar los campos.
- Se valida que los campos obligatorios estén completos.
- Se muestra mensaje de error si falta algún campo.

```tsx
import { useState } from 'react';

export function UploadBookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) {
      setError('Todos los campos son obligatorios');
      return;
    }
    // Lógica para subir libro
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título" />
      <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Autor" />
      {error && <div>{error}</div>}
      <button type="submit">Subir libro</button>
    </form>
  );
}
```

---

*Documento generado como parte de la explicación de formularios en Bookder.*
