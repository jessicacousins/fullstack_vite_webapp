
import React, { useState, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import AuthContext from "../context/AuthContext"; 
import axios from "axios";
import "./CheckoutForm.css";

const CheckoutForm = ({ cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext); // Get the logged-in user

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!user) {
      alert("You must be logged in to complete the purchase.");
      setLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error("Error creating payment method:", error);
      setLoading(false);
      return;
    }

    const { id } = paymentMethod;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/cart/checkout",
        {
          userId: user.uid, // Use the logged-in user's ID from Firebase
          paymentMethodId: id,
          cartItems,
          shippingAddress: {
            line1: "123 Main St",
            city: "San Francisco",
            state: "CA",
            postal_code: "94111",
            country: "US",
          },
        }
      );

      if (response.data.success) {
        alert("Payment Successful!");
        // Redirect or clear the cart, etc.
      } else {
        alert("Payment Failed: " + response.data.error);
      }
    } catch (paymentError) {
      console.error("Payment error:", paymentError);
      alert("Payment error: " + paymentError.message);
    }

    setLoading(false);
  };

  return (
    <div className="checkout-card">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="card-input">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#32325d",
                  "::placeholder": {
                    color: "#a0a0a0",
                  },
                  backgroundColor: "#ffffff",
                  padding: "10px",
                },
                invalid: {
                  color: "#fa755a",
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="pay-button"
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
