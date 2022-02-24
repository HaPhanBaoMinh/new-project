const express = require("express")
const morgan = require("morgan");
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');
require('dotenv').config();
const app = express()

//MIDDLEWARE
app.use(morgan("tiny")); 
app.use(bodyParser.json({limit: "30mb", extended: "false" }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(methodOverride('_method'));
app.use(cors());

//ROUTER
const productRouter  = require("./Routers/productsRouter");
const uploadImageRouter  = require("./Routers/imagesRouter");
const bannersRouter = require("./Routers/bannersRouter");
const ordersRouter = require("./Routers/ordersRouter");
const storeRouter = require("./Routers/storeRouter");
const SalesDailyDataRouter = require("./Routers/salesDailyDataRouter");

//API
app.use("/api/admin/product", productRouter);
app.use("/api/admin/banner", bannersRouter);
app.use("/api/admin/order", ordersRouter);
app.use("/api/admin/sales-data", SalesDailyDataRouter);
app.use("/image", uploadImageRouter );
app.use("/api/store", storeRouter);


//CONNECT TO MONGODB
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then((res, rej) => console.log("Connect successfully!"))
.catch((err) => console.log(err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

