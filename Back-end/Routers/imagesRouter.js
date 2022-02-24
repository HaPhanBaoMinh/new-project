const express = require("express");
const mongoose  = require("mongoose");
const upload = require("../Config/updateImage");
require('dotenv').config();
require('fs');

uploadImageRouter = express.Router();

//Connect to Mongoose

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

// uploadImageRouter.post('/file', upload.single("file"), (req, res) => {
//     res.send(req.file)
// })  

uploadImageRouter.post('/files', upload.array("files", 12), (req, res) => {
  res.send(req.files)
}) 

uploadImageRouter.get("/get_image/:filename",(req, res) => {
  const file = gfs.find({
      filename: req.params.filename
    }).toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      }
      gfs.openDownloadStreamByName(req.params.filename).pipe(res);
    }); 
});

uploadImageRouter.delete('/file/:fileId', (req, res) => { //file_id
  gfs.delete(new mongoose.Types.ObjectId(req.params.fileId), (err, data) => {
    if (err) return res.status(404).json({ err: err.message }); 
    res.status(200).send();
  });
})


module.exports = uploadImageRouter; 