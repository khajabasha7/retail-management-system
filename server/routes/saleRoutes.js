const express = require("express");
const Product = require("../models/Product");
const Sale = require("../models/Sale");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    for (const item of items) {
      const product = await Product.findById(
        item.productId
      );

      if (!product) {
        return res.status(404).json({
          message: `${item.name} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}`,
        });
      }

      product.stock -= item.quantity;

      await product.save();
    }

    const sale = await Sale.create({
      items,
      totalAmount,
    });

    res.json({
      message: "Sale completed",
      sale,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;