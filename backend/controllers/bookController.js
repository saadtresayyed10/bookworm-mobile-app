import {
  createBook,
  deleteBook,
  getAllBooks,
} from "../services/bookServices.js";

export const createBookController = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "User ID not found" });
  }

  const { title, caption, image, rating } = req.body;
  if (!title || !caption || !image || !rating) {
    return res.status(400).json({ message: "Missing fields are required" });
  }

  try {
    const book = await createBook(title, caption, image, rating, userId);
    res.status(201).json({ message: "Book created", data: book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBooksController = async (req, res) => {
  try {
    const books = await getAllBooks();
    res.status(200).json({ data: books });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBookController = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "ID invalid or incorrect" });
  }
  try {
    const book = await deleteBook(id);
    res.status(200).json({ message: "Book deleted", data: book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
