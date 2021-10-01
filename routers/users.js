const { User } = require("../models/users");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv/config");
const sign = require("../auth/sign");

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(user);
});

router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});
router.post("/", async (req, res) => {
  let newUser = new User();
  newUser.name = req.body.name;
  newUser.email = req.body.email;
  newUser.passwordHash = bcrypt.hashSync(req.body.passwordHash, 10);
  newUser.phone = req.body.phone;

  newUser.isAdmin = req.body.isAdmin;

  newUser.street = req.body.street;

  newUser.apartment = req.body.apartment;

  newUser.zip = req.body.zip;

  newUser.city = req.body.city;

  newUser.country = req.body.country;

  newUser = await newUser.save();
  if (!newUser) {
    res.status(500).json({ success: false });
  } else {
    res.send({ success: true, newUser });
  }
});
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        res.status(500).json({ success: false, err: "user not found" });
      else {
        if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
          sign(req, res, req.body.email);
        } else {
          res.send({ success: false });
        }
      }
    })
    .catch((err) => res.status(500).json({ success: false, err: err }));
});
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).json({
          success: true,
          message: "deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "not found",
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: err,
      });
    });
});
module.exports = router;
