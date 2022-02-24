const express = require("express");
const { postBanner, deleteBanner, getBanners } = require("../Controllers/bannerController");
const upload = require("../Config/updateImage");

const bannersRouter = express.Router();

bannersRouter.post("/",upload.single('file'), postBanner);
bannersRouter.delete("/",deleteBanner);
bannersRouter.get("/", getBanners)

module.exports = bannersRouter; 