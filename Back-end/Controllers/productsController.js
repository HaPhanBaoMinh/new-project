const { deleteImages } = require("../Functions/Mongoose/DeleteImage");
const booksModel = require("../Models/Products/booksModel");

const getBooks = async (req, res) => {
    const bookList = await booksModel.find();
    try {
        res.status(200).json(bookList);
    } catch (error) {
        res.status(302).send(error.message);
    }
} 

const getBook = async (req, res) => {
    const bookId = await req.params.id;
    const bookList = await booksModel.findById(bookId);
    try {
        res.status(200).json(bookList);
    } catch (error) {
        res.status(302).send(error.message);
    }
} 

const deleteBook = async (req, res) => {
    const bookId = await req.body.id;
    const bookInfo = await booksModel.findById(bookId);
    try {
        // Find and Delete Images of Book
        deleteImages(bookInfo.Images); 

        // Delete Book
        await booksModel.findByIdAndDelete(bookId);
        
        res.status(200).send();
    } catch (error) {
        res.status(302).send(error.message);;
    }
}

const postBook = async (req, res) => {
    const reqBody = await {...req.body, Images: req.files }; 
    const newBook = new booksModel(reqBody);
    try {
        await newBook.save();
        res.status(200).send();
    } catch (error) {
        res.status(302).send(error.message);
    }
}

const updateBook = async (req, res) => {
    const bookId = req.body._id;
    const updatedBook = req.body;
    try {
        await booksModel.findByIdAndUpdate(bookId, updatedBook);
        res.status(200).send();
    } catch (error) {
        res.status(302).send(error.message);
    }
}

module.exports = {getBooks, getBook, deleteBook, postBook, updateBook};