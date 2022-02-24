const mongoose = require("mongoose");
const getNowDate = require("../HandleTime/getNowDate");
const { Schema } = mongoose;

const dailySalesDataSchema = new Schema({
    Date: {
        type: Object,
        default: getNowDate(),
    },
    TotalRevenue: {
        type: Number,
        default: 0,
        min: 0,
    },
    TotalOrder: {
        type: Number,
        default: 0,
        min: 0
    },
    VisitorCounter: {
        type: Number,
        default: 0,
        min: 0
    },
    NewCustomer: {
        type: Number,
        default: 0,
        min: 0,
    }   
})

const myDB = mongoose.connection.useDb('Sales_data');
const dailySalesDataModel = myDB.model("daily", dailySalesDataSchema);
module.exports = dailySalesDataModel;
 