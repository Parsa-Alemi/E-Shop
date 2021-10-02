const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");
require("dotenv/config");

async function sign(req, res, email) {
  const user = await User.findOne({ email: email })
    .then((user) => {
      if (!user)
        res.status(500).json({
          success: false,
          err: "user not found while generating token",
        });
      else {
        const token = bcrypt.hashSync(user.id, +process.env.SECRET);
        user.token = token;
        user = user.save();
        res.send({ success: true, token: token });
      }
    })
    .catch((err) => res.send({ err }));
}

module.exports = sign;
