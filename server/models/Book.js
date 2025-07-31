import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  available: { type: Boolean, default: true },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  }, 
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
