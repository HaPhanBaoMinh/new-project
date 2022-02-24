const express = require("express");
const { getSalesDailyData } = require("../Controllers/salesDailyDataController");
SalesDailyDataRouter = express.Router();

SalesDailyDataRouter.get("/", getSalesDailyData);

module.exports = SalesDailyDataRouter;