const { order } = require("../models/orders");
const auth = require("../auth/auth");
const express = require("express");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const orderList = await order.find();

  if (!orderList) {
    res.status(500).json({ success: false });
  }
  res.send(orderList);
});

module.exports = router;
