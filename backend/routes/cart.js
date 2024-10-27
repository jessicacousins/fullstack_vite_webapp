const express = require("express");
require("dotenv").config();
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/Cart");

// @route POST /api/cart/add
router.post("/add", (req, res) => {
  const { userId, item } = req.body;

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const newItem = { ...item, id: uuidv4() };
  carts[userId].push(newItem);

  res.json({ success: true, cart: carts[userId] });
});

// @route GET /api/cart/:userId
router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  if (!carts[userId]) {
    return res.json({ success: true, cart: [] });
  }

  res.json({ success: true, cart: carts[userId] });
});

// @route POST /api/cart/checkout
router.post("/checkout", async (req, res) => {
  const { userId, paymentMethodId, cartItems, shippingAddress } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity * 100,
    0
  ); // in cents

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: "usd",
      payment_method_types: ["card"], // only accepting card payments
      payment_method: paymentMethodId,
      confirm: true,
      shipping: {
        name: userId,
        address: shippingAddress,
      },
    });

    // Save cart and payment info to MongoDB
    const newCart = new Cart({
      userId,
      items: cartItems,
      totalAmount: totalAmount / 100, // Convert cents to dollars
      paymentIntentId: paymentIntent.id,
      paymentStatus: paymentIntent.status,
      shippingAddress,
    });

    await newCart.save();

    // Send the response including the order details
    res.json({ success: true, paymentIntent, order: newCart });
  } catch (error) {
    console.error("Payment error:", error.message);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
