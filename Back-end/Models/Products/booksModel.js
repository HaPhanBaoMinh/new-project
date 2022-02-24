const mongoose = require("mongoose");
const getNowDate = require("../HandleTime/getNowDate");
const { Schema } = mongoose;

const booksSchema = new Schema({
    SKU: {
        type: String,
        required: true,
    },

    Title: {
        type: String,
        required: true,
    },

    Quantity: {
        type: Number,
        min: 0,
        default: 1,
    },

    Price: {
        oldPrice: {
            type: Number,
            default: 0,
            min: 0,
        }, 
        salePrice:  {
            type: Number,
            default: 0,
            min: 0,
        }
    }, 

    Tags: [String],

    Author: String,

    OpenDate: {
        type: Object,
        default: getNowDate(),
    },

    QuantitySold: {
        type: Number,
        min: 0,
        default: 0,
    },

    Images: [Object], 

})

const myDB = mongoose.connection.useDb('Products_data');
const booksModel = myDB.model("Product", booksSchema);
module.exports = booksModel;
 
 