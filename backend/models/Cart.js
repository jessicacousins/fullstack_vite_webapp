const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: String,
      title: String,
      quantity: { type: Number, default: 1 },
      price: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
    enum: ["pending", "completed", "failed", "succeeded"],
  },
  shippingAddress: {
    line1: String,
    city: String,
    state: String,
    postal_code: String,
    country: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
