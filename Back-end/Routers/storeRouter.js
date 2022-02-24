const express = require("express");
const { getBanners } = require("../Controllers/bannerController");
const { postOrder } = require("../Controllers/orderController");
const { getBooks, getBook } = require("../Controllers/productsController");

const storeRouter = express.Router();

storeRouter.get("/books", getBooks);
storeRouter.get("/book/:id", getBook);
storeRouter.get("/banners", getBanners);
storeRouter.post("/order", postOrder);

module.exports = storeRouter;
