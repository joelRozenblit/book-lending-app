import { Router } from "express";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import {
  createBook,
  getBooks,
  borrowBook,
  returnBook,
  getBorrowing,
  editBook
} from "../controllers/bookControllers.js";

const router = Router();

/*
  endpoints to manage books logic
  some using middleware for validations
*/


// public - get available books
router.get("/available", getBooks);

// admin - get borrowing books
router.get('/borrowed', authenticate, authorizeAdmin, getBorrowing)

// admin - add book
router.post("/", authenticate, authorizeAdmin, createBook);

// admin - update book
router.patch("/:id", authenticate, authorizeAdmin, editBook);

// user - update(borrow) book
router.patch("/:id/borrow", authenticate, borrowBook);

// user - update(return) book
router.patch("/:id/return", authenticate, returnBook);

export default router;
