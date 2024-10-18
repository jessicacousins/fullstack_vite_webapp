import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("ADD_YOUR_PUBLIC_STRIPE_API_HERE");

const Checkout = ({ cartItems }) => {
  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm cartItems={cartItems} />
      </Elements>
    </div>
  );
};

export default Checkout;
