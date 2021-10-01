const express = require("express");
const bcrypt = require("bcryptjs");
require("dotenv/config");
const { User } = require("../models/users");

function auth(req, res) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const user = User.findOne({ token: token })
    .then((user) => {
      if (!user) {
        return false;
      } else {
        return true;
      }
    })
    .catch((err) => console.log("err ;", err));
}

module.exports = auth;
