const express = require("express");
const app = express();
require("dotenv/config");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const api = process.env.API_URL;
console.log(process.env.SECRET);
app.use(cors());
app.options("*", cors());
//auth
function auth(req, res, nex) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) res.status(500).json({ success: false, err: "user not found" });
  else {
    jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
        res.status(500).json({ success: false, err: err });
      } else {
        next();
      }
    });
  }
}
//Middleware
app.use(express.json());
app.use(morgan("tiny"));
//console.log(auth());
//app.use(auth);
//Routes
const productsRouter = require("./routers/products.js");
const usersRouter = require("./routers/users");
const ordersRouter = require("./routers/orders");
const categoriesRouter = require("./routers/categories");

app.use(api + "/products", productsRouter);
app.use(api + "/users", usersRouter);
app.use(api + "/orders", ordersRouter);
app.use(api + "/categories", categoriesRouter);
//mongo connection and model
mongoose
  .connect("mongodb://localhost:4000", { dbName: "eshop" })
  .then(() => console.log("Connected To mongo "))
  .catch((err) => console.log("Cant connect to mongo", err));

app.listen(3000, () => {
  console.log("listenning to port 3000");
});
