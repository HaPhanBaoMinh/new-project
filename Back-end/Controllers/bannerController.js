const { deleteImage } = require("../Functions/Mongoose/DeleteImage");
const bannersModel = require("../Models/Banners/bannersModel");

const postBanner = async (req, res) => {
    const reqBody = await {Image: req.file};
    const newBanner = await new bannersModel(reqBody);
    try {
        await newBanner.save();
        res.status(200).send(); 
    } catch (error) {
        res.status(302).send(error.message);
    }
}

const getBanners = async (req, res) => {
    const bannerList = await bannersModel.find();
    try {
        res.status(200).send(bannerList);
    } catch (error) {
        res.status(302).send(error.message);
    }
}

const deleteBanner = async (req, res) => { 
    const bannerID = await req.body.id;
    const bannerInfo = await bannersModel.findById(bannerID);
    try {
        deleteImage(bannerInfo.Image) 
        await bannersModel.findByIdAndDelete(bannerInfo.id);
        res.status(200).send();
    } catch (error) {
        res.status(302).send(error.message);
    }
}

module.exports = {postBanner, deleteBanner, getBanners}