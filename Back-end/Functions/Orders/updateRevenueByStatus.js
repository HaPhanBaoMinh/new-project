const orderModel = require("../../Models/Orders/ordersModel");
const dailySalesDataModel = require("../../Models/Sales/dailyModel ");
const booksModel = require("../../Models/Products/booksModel");

const updateRevenueByStatus = async (orderStatus, orderId) => {
    const date = new Date();
     switch (orderStatus) {
        case "5":
            // Cập nhật doanh thu ngày
            const orderData = await orderModel.findById(orderId);
            const todaySalesData = await dailySalesDataModel.findOneAndUpdate({"Date.date": date.getDate()}, {
                $inc: {TotalRevenue: +orderData.total},
            });

            // Check xem trong database đã có thông tin doanh thu của hôm nay chưa, nếu chưa => tạo mới
            if(!todaySalesData){
                try {
                    const newDailySalesDate = new dailySalesDataModel();
                    await newDailySalesDate.save();
                    await dailySalesDataModel.findOneAndUpdate({"Date.date": date.getDate()}, {
                        $inc: {TotalRevenue: +orderData.total}
                    });
                } catch (error) {
                    console.log(error.message);
                }
            }

             // Cập nhật số sách đã bán được 
             for (let index = 0; index < orderData.cart.length; index++) {
                const orderCartItem = orderData.cart[index];
                await booksModel.findOneAndUpdate({SKU: orderCartItem.SKU}, {
                    $inc: {QuantitySold: +orderCartItem.count}
                })
            }
            break;
    
        case "0": 
            // Cập nhật tổng số đơn hàng trong ngày
            try {
                await dailySalesDataModel.findOneAndUpdate({"Date.date": date.getDate()}, {
                    $inc: {TotalOrder: +1}
                });
            } catch (error) {
                console.log(error.message);
            }            
            
            break;

        default:
            break;
    }
}

module.exports = updateRevenueByStatus