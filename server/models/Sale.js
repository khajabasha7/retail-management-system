const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    quantity: Number,

    totalAmount: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sale", saleSchema);