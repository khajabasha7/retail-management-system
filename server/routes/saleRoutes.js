const express = require("express");
const Product = require("../models/Product");
const Sale = require("../models/Sale");

const router = express.Router();


// CREATE SALE
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

    const billNumber =
      "BILL-" + Date.now();

    const sale = await Sale.create({
      billNumber,
      items,
      totalAmount,
    });

    res.json({
      message: "Sale completed successfully",
      sale,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});


// GET ALL SALES
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find().sort({
      createdAt: -1,
    });

    res.json(sales);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;