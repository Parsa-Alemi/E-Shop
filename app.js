const express = require("express");
const app = express();
require("dotenv/config");
const morgan = require("morgan");
const mongoose = require("mongoose");

const api = process.env.API_URL;
//Middleware
app.use(express.json());
app.use(morgan("tiny"));
//mongo connection and model
mongoose
  .connect("mongodb://localhost:4000", { dbName: "eshop" })
  .then(() => console.log("Connected To mongo "))
  .catch((err) => console.log("Cant connect to mongo", err));

const productsSchema = mongoose.Schema({
  name: String,
  price: String,
  image: String,
  count: Number,
});
const productsModel = mongoose.model("products", productsSchema);
//Routes functions
async function showProducts(req, res) {
  const objtest = await productsModel.find();
  if (!objtest) {
    res.status(500).json({ success: false });
  } else {
    res.send(objtest);
  }
}
function addProducts(req, res) {
  const newProduct = new productsModel();
  newProduct.name = req.body.name;
  newProduct.price = req.body.price;
  newProduct.image = req.body.image;
  newProduct.count = req.body.count;
  newProduct.save(function (err) {
    if (err) {
      res.status(500).json({ success: false });
    } else {
      res.send({ success: true });
    }
  });
}
//API routes
app.get(api + "/products", async (req, res) => showProducts(req, res));
app.post(api + "/products", (req, res) => addProducts(req, res));

app.listen(3000, () => {
  console.log("listenning to port 3000");
});
