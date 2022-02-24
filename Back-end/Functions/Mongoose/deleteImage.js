const mongoose  = require("mongoose");
const upload = require("../../Config/updateImage");
require('dotenv').config();

const MONGO_URL_PRODUCT = process.env.MONGO_URL_PRODUCT;
const conn = mongoose.createConnection(MONGO_URL_PRODUCT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}); 

let gfs;

conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, { 
      bucketName: "photos"
    } )
});

const deleteImage = async (file) => {
    try {     
        gfs.delete(new mongoose.Types.ObjectId(file.id));
    } catch (error) {
        console.log(error.message);
    }
}

const deleteImages = async (arrayFile) => {
    try {
        arrayFile.map(image => {
            gfs.delete(new mongoose.Types.ObjectId(image.id));
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {deleteImage, deleteImages}