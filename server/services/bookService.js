import Book from "../models/Book.js";
import User from "../models/User.js";

/*
  managing books,
  note:
  these functions throwing error when fails
  to be catch by the callers
*/

export const getAvailableBooks = async () => {
  return await Book.find({ available: true });
};

export const getBorrowingBooks = async () => {
  return await Book.find({ borrowedBy: { $ne: null } });
};

export const addBook = async ({ title, author }) => {
  if (!title || !author) {
    throw new Error("Missing title or author");
  }
  const newBook = new Book({ title, author, available: true });
  return await newBook.save();
};


// ToDo: not complete
export const updateBook = async (id, book) => {
  const updatedBook = await Book.findByIdAndUpdate(
    id,
    book,
    { new: true }
  );
  if (!updatedBook) {
    throw new Error("Book not found");
  }
  return updatedBook;
};


// ToDo: not complete
export const borrowBookById = async (id, userId) => {
  const user = await User.findOne({ id });
  if (user.booksBorrowed > BOOKS_LIMIT) {
    throw new Error(`you can only borrow ${BOOKS_LIMIT} books at a time`);
  }

  const book = await Book.findById(id);
  if (!book) {
    throw new Error("Book not found");
  }

  if (!book.available) {
    throw new Error("Book already borrowed");
  }

  user.booksBorrowed++;
  book.available = false;
  book.borrowedBy = userId;
  return await book.save();
};

// ToDo: not complete
export const returnBookById = async (id, userId) => {
  const book = await Book.findById(id);
  if (!book) {
    throw new Error("Book not found");
  }

  const user = await User.findOne({ email });
  if (!user) throw new Error("Wrong user id");

  if (book.borrowedBy !== userId) {
    throw new Error("You didn't borrow this book");
  }

  user.booksBorrowed--;
  book.available = true;
  book.borrowedBy = null;
  return await book.save();
};
