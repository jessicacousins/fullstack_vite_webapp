import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./Checkout.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = ({ cartItems, clearCart }) => {
  return (
    <div className="checkout-container">
      <h1 className="heading-checkout">Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm cartItems={cartItems} clearCart={clearCart} />
      </Elements>
    </div>
  );
};

export default Checkout;
