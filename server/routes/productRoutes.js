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
    res.status(500).json({
      error: err.message,
    });
  }
});


// GET PRODUCTS (Search + Pagination)
router.get("/", async (req, res) => {
  try {
    const { search = "", limit = 5, page = 1 } = req.query;

    const query = search
      ? {
          name: {
            $regex: search,
            $options: "i",
          },
        }
      : {};

    const products = await Product.find(query)
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    res.json(products);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});


// ADD STOCK
router.put(
  "/add-stock/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const { quantity } = req.body;

      const product = await Product.findById(
        req.params.id
      );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      product.stock += Number(quantity);

      await product.save();

      res.json({
        message: "Stock updated successfully",
        product,
      });

    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);


// UPDATE PRICE
router.put(
  "/update-price/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const { price } = req.body;

      const product = await Product.findById(
        req.params.id
      );

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      product.price = Number(price);

      await product.save();

      res.json({
        message: "Price updated successfully",
        product,
      });

    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
);


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
    res.status(500).json({
      error: err.message,
    });
  }
});


// DELETE PRODUCT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Product deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;