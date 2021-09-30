const { Category } = require("../models/categories");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});

router.post("/", async (req, res) => {
  let newCategory = new Category();
  newCategory.name = req.body.name;
  newCategory.icon = req.body.icon;
  newCategory.color = req.body.color;
  newCategory.image = req.body.image;
  newCategory = await newCategory.save();
  if (!newCategory) {
    res.status(500).json({ success: false });
  } else {
    res.send({ success: true });
  }
});
module.exports = router;
