const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// CREATE PRODUCT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET PRODUCTS (pagination + search)
router.get("/", async (req, res) => {
  try {
    const { search = "", limit = 10, page = 1 } = req.query;

    const query = search
      ? { $text: { $search: search } }
      : {};

    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// UPDATE PRODUCT
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE PRODUCT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;