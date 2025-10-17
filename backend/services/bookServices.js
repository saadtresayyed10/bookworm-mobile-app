import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";

export const createBook = async (title, caption, image, rating, user) => {
  const uploaderImage = cloudinary.uploader.upload(image);
  const imageUrl = (await uploaderImage).secure_url;

  return await Book.create({ title, caption, image: imageUrl, rating, user });
};

export const getAllBooks = async () => {
  return await Book.find();
};

export const deleteBook = async (id) => {
  const book = await Book.findByIdAndDelete(id);

  if (book.image && book.image.includes("cloudinary")) {
    try {
      const publicId = book.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.log("Error deleting from cloudinary");
    }
  }

  return book;
};
