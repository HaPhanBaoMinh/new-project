const mongoose = require("mongoose");
const { Schema } = mongoose;

const bannersSchema = new Schema({
    Image: Object,
})

const myDB = mongoose.connection.useDb('Products_data');
const bannersModel = myDB.model("banner", bannersSchema);
module.exports = bannersModel;
