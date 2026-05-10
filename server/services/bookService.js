// filepath: server/services/bookService.js
// In-memory storage (replace with database in production)

let books = [
  {
    id: '1',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    price: 15.99,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300',
    description: 'Una historia poética sobre un pequeño príncipe que visita diferentes planetas.',
    createdAt: new Date().toISOString(),
    city: 'Madrid',
    disponible: true,
  },
  {
    id: '2',
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    price: 24.99,
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300',
    description: 'La saga de la familia Buendía en el pueblo ficticio de Macondo.',
    createdAt: new Date().toISOString(),
    city: 'Madrid',
    disponible: true,
  },
  {
    id: '3',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    price: 19.99,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300',
    description: 'La obra maestra de la literatura española.',
    createdAt: new Date().toISOString(),
    city: 'Madrid',
    disponible: true,
  },
  {
    id: '4',
    title: 'Los Juegos del Hambre',
    author: 'Suzanne Collins',
    price: 18.99,
    cover: 'https://covers.openlibrary.org/b/id/10521213-L.jpg',
    description: 'Katniss Everdeen lucha por sobrevivir en una distopía donde los jóvenes deben competir a muerte.',
    createdAt: new Date().toISOString(),
    city: 'Madrid',
    disponible: true,
    genre: 'Distopía',
    status: 'muy buscado',
  },
  {
    id: '5',
    title: 'Divergente',
    author: 'Veronica Roth',
    price: 16.99,
    cover: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
    description: 'En un Chicago futurista, Tris Prior desafía el sistema de facciones.',
    createdAt: new Date().toISOString(),
    city: 'Madrid',
    disponible: true,
    genre: 'Distopía',
    status: 'muy buscado',
  },
  {
    id: '6',
    title: 'Harry Potter y la piedra filosofal',
    author: 'J.K. Rowling',
    price: 22.50,
    cover: 'https://covers.openlibrary.org/b/id/7984916-L.jpg',
    description: 'El inicio de la saga mágica de Harry Potter en Hogwarts.',
    createdAt: new Date().toISOString(),
    city: 'Madrid',
    disponible: true,
    genre: 'Fantasía',
    status: 'muy buscado',
  },
  {
    id: '7',
    title: 'Percy Jackson y el ladrón del rayo',
    author: 'Rick Riordan',
    price: 17.25,
    cover: 'https://covers.openlibrary.org/b/id/8155421-L.jpg',
    description: 'Percy descubre que es hijo de un dios griego y debe evitar una guerra entre dioses.',
    createdAt: new Date().toISOString(),
    city: 'Madrid',
    disponible: true,
    genre: 'Fantasía',
    status: 'muy buscado',
  },
];

let nextId = books.length > 0 ? Math.max(...books.map(b => Number(b.id) || 0)) + 1 : 1;

export const bookService = {
  getAll: () => books,
  
  getById: (id) => books.find(book => book.id === id),
  
  create: (data) => {
    const newBook = {
      id: String(nextId++),
      ...data,
      createdAt: new Date().toISOString(),
    };
    books.push(newBook);
    return newBook;
  },
  
  delete: (id) => {
    const index = books.findIndex(book => book.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    return true;
  },
};