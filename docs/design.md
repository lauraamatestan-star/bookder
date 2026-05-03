# Arquitectura - Bookder

## Visión General

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │ ←→  │     API     │ ←→  │   Backend   │
│   (React)   │     │  (REST)     │     │  (Express)  │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Capas de la Aplicación

### Frontend (React + TypeScript)

```
client/src/
├── components/     # Componentes reutilizables
├── context/        # Estado global (useContext)
├── hooks/          # Custom hooks
├── pages/          # Vistas/rutas
├── api/            # Cliente HTTP tipado
├── types/          # TypeScript interfaces
└── App.tsx         # Componente principal
```

### Backend (Express + Node.js)

```
server/
├── routes/         # Definición de endpoints
├── controllers/    # Lógica de negocio
├── services/       # Servicios externos
├── models/         # Modelos de datos
└── index.js        # Entry point
```

## Flujo de Datos

### Lectura de Datos

1. **Componente** llama a custom hook (`useBooks`)
2. **Hook** usa API client (`client.get('/books')`)
3. **API Client** hace fetch a `/api/books`
4. **Backend** responde con JSON
5. **Hook** actualiza estado → **Componente** renderiza

### Escritura de Datos

1. **Usuario** completa formulario
2. **Componente** valida datos localmente
3. **Hook** llama API (`client.post('/books', data)`)
4. **Backend** valida, procesa, guarda
5. **Hook** actualiza estado global
6. **UI** muestra feedback de éxito/error

## Contratos de Datos

### Book Interface

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

### CartItem Interface

```typescript
interface CartItem {
  book: Book;
  quantity: number;
}
```

## Environment Variables

```
# Frontend
VITE_API_URL=http://localhost:3000

# Backend
PORT=3000
DATABASE_URL=...
```