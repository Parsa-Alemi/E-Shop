const express = require("express");
const bcrypt = require("bcryptjs");
require("dotenv/config");
const { User } = require("../models/users");

async function auth(req, res, isAdmin) {
  if (!isAdmin) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = await User.findOne({ token: token });
    if (!user) {
      return false;
    } else {
      return true;
    }
  } else {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const user = await User.findOne({ token: token });
    if (!user) {
      return false;
    } else {
      if (user.isAdmin) {
        return true;
      } else {
        return false;
      }
    }
  }
}

module.exports = auth;
