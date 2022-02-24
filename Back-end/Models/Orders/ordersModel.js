const mongoose = require("mongoose");
const getNowDate = require("../HandleTime/getNowDate");
const { Schema } = mongoose;

const OrderSchema = new Schema({
    contactInfo: {
        name: String,
        email: String,
        address: {
            province: String, // Tỉnh/TP
            district: String, //Huyện
            town: String, // Thị trấn
            detail: String // Số nhà - Đường - Khu phố
        },
        phoneNumber: String,
    },
    cart: {
        type: [Object],
        required: true
        // [
        //     {    
        //         count: 2
        //         SKU: "TTDGBN"
        //     },
        //     {
        //         count: 5
        //         SKU: "TDB"
        //     }
        // ]
        
    },
    status: {
        type: Number,
        default: 0
    }, 
    orderDate: {
        type: Object,
        default: getNowDate(), 
    },
    total: Number,
    isNewCustomer: {
        type: Boolean,
        default: false
    }
})

const myDB = mongoose.connection.useDb('Orders_data');
const orderModel = myDB.model("orders", OrderSchema);

module.exports = orderModel;
 
 