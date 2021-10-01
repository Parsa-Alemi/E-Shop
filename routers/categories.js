const { Category } = require("../models/categories");
const express = require("express");
const auth = require("../auth/auth");
const router = express.Router();

router.get(`/`, async (req, res) => {
  const authResult = await auth(req, res, true);
  if (!authResult)
    return res.status(500).json({ success: false, err: "auth err" });

  categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.send(categoryList);
});
router.get("/:id", async (req, res) => {
  const authResult = await auth(req, res, true);
  if (!authResult)
    return res.status(500).json({ success: false, err: "auth err" });

  const category = await Category.findById(req.params.id);
  if (!category) {
    res.status(500).json({
      success: false,
    });
  }
  res.status(200).send(category);
});
router.post("/", async (req, res) => {
  const authResult = await auth(req, res, true);
  if (!authResult)
    return res.status(500).json({ success: false, err: "auth err" });

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
router.delete("/:id", async (req, res) => {
  const authResult = await auth(req, res, true);
  if (!authResult)
    return res.status(500).json({ success: false, err: "auth err" });

  Category.findByIdAndRemove(req.params.id)
    .then((catfind) => {
      if (catfind) {
        res.send({ success: true });
      } else {
        res.status(500).json({ success: false });
      }
    })
    .catch((err) => res.status(400).json({ success: false, err: err }));
});

router.put("/:id", async (req, res) => {
  const authResult = await auth(req, res, true);
  if (!authResult)
    return res.status(500).json({ success: false, err: "auth err" });

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
      image: req.body.image,
    },
    { new: true }
  );

  if (!category) {
    res.status(500).json({ success: false });
  }

  res.status(200).send(category);
});

module.exports = router;
