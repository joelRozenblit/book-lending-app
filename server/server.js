import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from './routes/auth.js'
import booksRoute from './routes/books.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// connect to Data Base
connectDB();

// auth router : /register || /login
app.use('/auth', authRoutes)
// books router
app.use('/books', booksRoute)


app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
