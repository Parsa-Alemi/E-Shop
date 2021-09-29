const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  name: String,
  price: String,
  image: String,
  count: Number,
});
exports.productsModel = mongoose.model("products", productsSchema);
