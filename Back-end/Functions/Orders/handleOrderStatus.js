const orderModel = require("../../Models/Orders/ordersModel");

const handleOrderStatus = async (stautus, orderId) => {
    await orderModel.findByIdAndUpdate(orderId, {status: stautus});
}

module.exports = handleOrderStatus