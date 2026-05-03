# Componentes - Bookder

## Componentes Reutilizables

### Header

Navegación principal de la aplicación.

```typescript
interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}
```

**Ubicación**: `src/components/Header.tsx`

---

### BookCard

Tarjeta individual para mostrar un libro.

```typescript
interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
}
```

**Ubicación**: `src/components/BookCard.tsx`

**Props**:
- `book`: Objeto Book con datos del libro
- `onAddToCart`: Callback para agregar al carrito

---

### Button

Botón reutilizable con variantes.

```typescript
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}
```

**Ubicación**: `src/components/Button.tsx`

---

### Input

Campo de formulario controlado.

```typescript
interface InputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}
```

**Ubicación**: `src/components/Input.tsx`

---

### LoadingSpinner

Indicador de carga.

```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}
```

**Ubicación**: `src/components/LoadingSpinner.tsx`

---

### ErrorMessage

Mensaje de error visual.

```typescript
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
```

**Ubicación**: `src/components/ErrorMessage.tsx`

---

## Composición

Los componentes se combinan en las páginas:

```
pages/
├── Home.tsx        → Header + Hero + FeaturedBooks
├── Catalog.tsx     → Header + BookCard[] + Filters
├── Cart.tsx        → Header + CartItem[] + Total
└── Upload.tsx      → Header + Form (Input + Button)
```