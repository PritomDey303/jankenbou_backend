const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    price_type: {
      type: String,
      required: true,
      enum: [
        "fixed",
        "negotiable",
        "Fixed",
        "Negotiable",
        "exchange",
        "Exchange",
      ],
    },
    category: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
      enum: ["new", "used", "New", "Used", "old", "Old"],
    },
    brand: {
      type: String,

      default: "Not Specified",
    },
    model: {
      type: String,

      default: "Not Specified",
    },
    seller_name: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: true,
    },
    seller_mobile: {
      type: String,
      required: true,
    },
    seller_messenger: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
