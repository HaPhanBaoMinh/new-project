const booksModel = require("../../Models/Products/booksModel");
const handleQuantity = require("./handleQuantity");

const calculateTotalPrice = async (cartList) => {
    let totalCart = 0;
    for (let index = 0; index < cartList.length; index++) {
        const cartItem = cartList[index];
        const bookInfo = await booksModel.findOne({SKU: cartItem.SKU});
        
        if(bookInfo){
            const totalItem = bookInfo.Price.salePrice * cartItem.count;
            totalCart += totalItem; 
        }
    }
    await handleQuantity(true, cartList);
    return totalCart; 
}

module.exports = calculateTotalPrice;