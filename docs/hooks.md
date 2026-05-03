# Hooks - Bookder

## Hooks de React

### useState

Usado para estado local en componentes.

```typescript
// Ejemplo: Estado simple
const [books, setBooks] = useState<Book[]>([]);

// Ejemplo: Estado con tipo
const [loading, setLoading] = useState<boolean>(false);
const [error, setError] = useState<string | null>(null);
```

### useEffect

Efectos secundarios: llamadas API, suscripciones, manipulación del DOM.

```typescript
useEffect(() => {
  fetchBooks();
}, []); // Array vacío = ejecutar solo en mount
```

---

## Custom Hooks

### useBooks

Hook personalizado para gestionar la lista de libros.

```typescript
// Ubicación: src/hooks/useBooks.ts
import { useState, useEffect } from 'react';
import { Book } from '../types';
import { bookApi } from '../api/client';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await bookApi.getAll();
      setBooks(data);
    } catch (err) {
      setError('Error al cargar libros');
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: Omit<Book, 'id'>) => {
    const newBook = await bookApi.create(book);
    setBooks(prev => [...prev, newBook]);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return { books, loading, error, refetch: fetchBooks, addBook };
}
```

**Uso en componente**:

```tsx
const { books, loading, error, addBook } = useBooks();
```

---

### useCart (Context)

Hook para acceder al estado global del carrito.

```typescript
// Ubicación: src/context/CartContext.tsx
import { useContext } from 'react';
import { CartContext } from './CartContext';

export function useCart() {
  return useContext(CartContext);
}
```

**Uso**:

```tsx
const { items, addItem, removeItem, total } = useCart();
```

---

## Patrones Recomendados

1. **Separar lógica de presentación**: hooks para lógica, componentes para UI
2. **Manejar tres estados**: loading, data, error
3. **Limpiar efectos**: usar cleanup function en useEffect
4. **Tipar siempre**: usar TypeScript en todas las props y estados