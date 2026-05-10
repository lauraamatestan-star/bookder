// filepath: server/controllers/bookController.js
import { bookService } from '../services/bookService.js';

export const getBooks = (req, res) => {
  try {
    const books = bookService.getAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books', error: error.message });
  }
};

export const getBookById = (req, res) => {
  try {
    const book = bookService.getById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book', error: error.message });
  }
};

export const createBook = (req, res) => {
  try {
    const { title, author, genre, status, city, disponible, price, cover, description, bids } = req.body;
    if (!title || !author || !price || !genre || !status || !city) {
      return res.status(400).json({ message: 'Faltan campos obligatorios: title, author, price, genre, status, city' });
    }
    const newBook = bookService.create({ title, author, genre, status, city, disponible, price, cover, description, bids });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
};

export const deleteBook = (req, res) => {
  try {
    const deleted = bookService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
};