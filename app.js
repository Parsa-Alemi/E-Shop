const express = require("express");
const app = express();
require("dotenv/config");
const morgan = require("morgan");
const mongoose = require("mongoose");
const productsRouter = require("./routers/products.js");

const api = process.env.API_URL;
//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(api + "/products", productsRouter);
//mongo connection and model
mongoose
  .connect("mongodb://localhost:4000", { dbName: "eshop" })
  .then(() => console.log("Connected To mongo "))
  .catch((err) => console.log("Cant connect to mongo", err));

//Routes functions

app.listen(3000, () => {
  console.log("listenning to port 3000");
});
