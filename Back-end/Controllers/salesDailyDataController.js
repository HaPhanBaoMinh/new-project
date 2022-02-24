const dailySalesDataModel = require("../Models/Sales/dailyModel ");

const getSalesDailyData = async (req, res) => {
    const orderList = await dailySalesDataModel.find();
    try {
        res.status(200).send(orderList)
    } catch (error) {
        res.status(302).send(error.message);
    }
}

module.exports = {getSalesDailyData}