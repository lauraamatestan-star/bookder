# API - Bookder

## Endpoints

### Base URL

```
Development: http://localhost:3000/api
Production:  https://bookder-api.onrender.com/api
```

---

## Books

### GET /books

Obtener todos los libros.

**Response**:
```json
[
  {
    "id": "1",
    "title": "El Principito",
    "author": "Antoine de Saint-Exupéry",
    "price": 15.99,
    "cover": "https://...",
    "description": "Una historia poética...",
    "createdAt": "2024-01-15T10:00:00Z"
  }
]
```

### GET /books/:id

Obtener un libro por ID.

**Response**: `Book` object

### POST /books

Crear un nuevo libro.

**Request**:
```json
{
  "title": "string",
  "author": "string",
  "price": "number",
  "cover": "string (opcional)",
  "description": "string (opcional)"
}
```

**Response**: `Book` object creado

---

## Contratos de Datos

### Book

```typescript
interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  cover?: string;
  description?: string;
  createdAt: string;
}
```

### CreateBookRequest

```typescript
interface CreateBookRequest {
  title: string;
  author: string;
  price: number;
  cover?: string;
  description?: string;
}
```

### ApiError

```typescript
interface ApiError {
  message: string;
  code: string;
}
```

---

## Códigos de Estado

| Código | Significado |
|--------|-------------|
| 200    | OK          |
| 201    | Created     |
| 400    | Bad Request |
| 404    | Not Found   |
| 500    | Server Error |

---

## Cliente HTTP Tipado

```typescript
// src/api/client.ts
import axios from 'axios';
import { Book, CreateBookRequest } from '../types';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

export const bookApi = {
  getAll: () => client.get<Book[]>('/books').then(r => r.data),
  getById: (id: string) => client.get<Book>(`/books/${id}`).then(r => r.data),
  create: (data: CreateBookRequest) => client.post<Book>('/books', data).then(r => r.data),
  delete: (id: string) => client.delete(`/books/${id}`),
};
```