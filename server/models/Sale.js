const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      unique: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    totalAmount: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sale", saleSchema);