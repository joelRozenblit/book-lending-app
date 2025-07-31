import {
  getAvailableBooks,
  addBook,
  updateBook,
  borrowBookById,
  returnBookById,
  getBorrowingBooks,
} from "../services/bookService.js";

// GET available books
export const getBooks = async (req, res) => {
  try {
    const books = await getAvailableBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET borrowed books
export const getBorrowing = async (req, res) => {
  try {
    const books = await getBorrowingBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST book
export const createBook = async (req, res) => {
  try {
    const book = await addBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE book
// TODO: not complete
export const editBook = async (req, res) => {
  try {
    const { id, title, author } = req.params;
    const updatedBook = await updateBook(id, { title, author });
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//
export const borrowBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await borrowBookById(id, req.user.userId);
    res.json({ message: "Book borrowed successfully", book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//
export const returnBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await returnBookById(id, req.user.userId);
    res.json({ message: "Book returned successfully", book });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
