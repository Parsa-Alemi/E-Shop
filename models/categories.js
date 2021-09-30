const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
  color: {
    //Hash
    type: String,
  },
  image: {
    type: String,
    default: "",
  },
});

exports.Category = mongoose.model("category", categorySchema);
