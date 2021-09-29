const express = require("express");
const mongoose = require("mongoose");
const { productsModel } = require("../models/product.js");
const router = express.Router();

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
router.get("/", async (req, res) => showProducts(req, res));
router.post("/", (req, res) => addProducts(req, res));

module.exports = router;
