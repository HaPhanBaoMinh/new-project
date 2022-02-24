const express = require("express");
const { getBooks, getBook, postBook, updateBook, deleteBook } = require("../Controllers/productsController");
const upload = require("../Config/updateImage");

const productRouter = express.Router();

productRouter.get("/data", getBooks);
productRouter.get("/data/:id", getBook);
productRouter.post("/data", upload.array("file", 3), postBook);
productRouter.put("/data", updateBook);
productRouter.delete("/data", deleteBook);

module.exports = productRouter;