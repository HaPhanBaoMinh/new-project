const calculateTotalPrice = require("../Functions/Orders/calculateTotalPrice");
const isNewCustomer = require("../Functions/Orders/checkIsNewCustomer");
const handleOrderStatus = require("../Functions/Orders/handleOrderStatus");
const updateRevenueByStatus = require("../Functions/Orders/updateRevenueByStatus");
const orderModel = require("../Models/Orders/ordersModel")

const getOrders = async (req, res) => {
    try {
        const orderList = await orderModel.find();
        res.status(200).send(orderList);
    } catch (error) {
        res.status(302).send(error.message);
    }
}

const postOrder = async (req, res) => {
    const reqBody = await req.body;
    const total = await calculateTotalPrice(reqBody.cart); //Caculate total price of order
    const isNewCus = await isNewCustomer(reqBody.contactInfo.phoneNumber)
    const newOrder = new orderModel({...reqBody, total, isNewCustomer: isNewCus});
    try {
        await newOrder.save();
        await updateRevenueByStatus("0");
        res.status(200).send();
    } catch (error) {
        res.status(302).send(error.message);
    }
}

const deleteOrder = async (req, res) => {
    const orderId = await req.params.id;
    try {
        await orderModel.findByIdAndDelete(orderId);
        res.status(200).send();
    } catch (error) {
        res.status(302).send(error.message);
    }
}

const updateOrder = async (req, res) => {
    const orderInfo = await req.body;
    try {
        await orderModel.findByIdAndUpdate(orderInfo.id, orderInfo);
        res.status(200).send();
    } catch (error) {
        res.status(302).send(error.message);
    }
}

const changeOrderStatus = async (req, res) => {
    const orderId = await req.params.id;
    const orderStatus = await req.query.status;
    try {
        await updateRevenueByStatus(orderStatus, orderId);
        handleOrderStatus(orderStatus, orderId);
        res.status(200).send();
    } catch (error) {
        res.status(302).send(error.message); 
    }
}

module.exports = {getOrders, postOrder, deleteOrder, updateOrder, changeOrderStatus}