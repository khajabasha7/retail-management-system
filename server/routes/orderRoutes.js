const express = require("express");
const mongoose = require("mongoose");

const Product = require("../models/Product");

const router = express.Router();

router.post("/buy", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId).session(session);

    if (!product || product.stock < quantity) {
      throw new Error("Not enough stock");
    }

    product.stock -= quantity;
    await product.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.json({ message: "Order successful" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    res.status(400).json({ error: err.message });
  }
});

module.exports = router;