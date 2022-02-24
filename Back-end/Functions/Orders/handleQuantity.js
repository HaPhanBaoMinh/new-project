const booksModel = require("../../Models/Products/booksModel");

const handleQuantity = async (option, cartList) => {
    if(option === true){
        for (let index = 0; index < cartList.length ; index++) {
            const cartItem = cartList[index];
            
            const bookInfo = await booksModel.findOne({SKU: cartItem.SKU});
            if( bookInfo.Quantity  >= cartItem.count){
                await booksModel.findOneAndUpdate({SKU: cartItem.SKU}, {
                    $inc: {Quantity: -cartItem.count} 
                })
            }
        }
    }

    if(option === false){
        for (let index = 0; index < cartList.length; index++) {
            const cartItem = cartList[index];
            await booksModel.findOneAndUpdate({SKU: cartItem.SKU}, {
                $inc: {Quantity: cartItem.count}
            })
        }
    }

}

module.exports = handleQuantity
