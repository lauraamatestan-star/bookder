# Cliente API tipado en Bookder

## Cliente API (src/api/client.ts)

Se utiliza fetch para consumir la API y se tipan las respuestas con TypeScript.

```ts
import { Book } from '../types';

export async function getBooks(): Promise<Book[]> {
  const res = await fetch('/api/books');
  if (!res.ok) throw new Error('Error al cargar libros');
  return res.json();
}
```

## Contrato de tipos
```ts
export interface Book {
  id: string;
  title: string;
  author: string;
  status: 'nuevo' | 'usado' | 'muy buscado';
}
```

---

*Documento generado como parte de la documentación del cliente API y tipos en Bookder.*
