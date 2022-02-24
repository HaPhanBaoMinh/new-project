const orderModel = require("../../Models/Orders/ordersModel")

const isNewCustomer = async (phoneNumber) => {
    const isNewCus = await orderModel.findOne({"contactInfo.phoneNumber": phoneNumber});

    if(!isNewCus){ 
        // Cập nhật new customer in sales data
        return true;
    }

    await orderModel.findOneAndUpdate({"contactInfo.phoneNumber": phoneNumber, isNewCustomer: true}, {isNewCustomer: false});
    return false;
}

module.exports = isNewCustomer;