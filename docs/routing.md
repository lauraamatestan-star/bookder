# Routing en Bookder

## Estructura de rutas

- `/` → Home
- `/catalog` → Catálogo de libros
- `/cart` → Carrito de compras
- `/upload` → Subir libro
- `/404` → Página no encontrada

## Implementación
Se utiliza React Router para gestionar la navegación entre páginas. Cada ruta carga un componente de página diferente.

## Ejemplo de configuración
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { Cart } from './pages/Cart';
import { UploadBook } from './pages/UploadBook';
import { NotFound } from './pages/NotFound';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/upload" element={<UploadBook />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

*Documento generado como parte de la explicación de rutas en Bookder.*
