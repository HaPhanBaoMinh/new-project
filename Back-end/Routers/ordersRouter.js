const express = require("express");
const { getOrders, postOrder, deleteOrder, updateOrder, changeOrderStatus } = require("../Controllers/orderController");
const ordersRouter = express.Router();

ordersRouter.get("/", getOrders);
ordersRouter.post("/", postOrder);
ordersRouter.delete("/:id", deleteOrder);
ordersRouter.put("/", updateOrder);
ordersRouter.post("/:id", changeOrderStatus); 

module.exports = ordersRouter;