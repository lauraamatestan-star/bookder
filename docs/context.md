# Context API en Bookder

## ¿Por qué usar Context?
Context API permite compartir estado global (como el carrito de compras o el usuario autenticado) entre componentes sin necesidad de prop drilling.

## Implementación
- Se crea un contexto (ej. CartContext) con createContext.
- Se implementa un Provider que gestiona el estado global y lo expone a los componentes hijos.
- Los componentes consumen el contexto usando useContext.

## Ejemplo: CartContext
```tsx
import { createContext, useContext, useState } from 'react';
import { Book } from '../types';

type CartContextType = {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Book[]>([]);

  const addToCart = (book: Book) => setCart((c) => [...c, book]);
  const removeFromCart = (id: string) => setCart((c) => c.filter((b) => b.id !== id));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
```

## ¿Cuándo es útil?
- Cuando varios componentes necesitan acceder o modificar el mismo estado global (ej. carrito, usuario).

---

*Documento generado como parte de la explicación de Context API en Bookder.*
