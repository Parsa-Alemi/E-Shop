const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({});

exports.Order = mongoose.model("orders", orderSchema);
