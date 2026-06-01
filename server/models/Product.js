const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    sku: {
      type: String,
      unique: true,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Full-text search support
productSchema.index({
  name: "text",
  category: "text",
});

module.exports = mongoose.model("Product", productSchema);