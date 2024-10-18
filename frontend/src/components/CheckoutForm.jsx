import React, { useState, useContext } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import "./CheckoutForm.css";

const CheckoutForm = ({ cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  // State for shipping information
  const [shippingAddress, setShippingAddress] = useState({
    line1: "",
    city: "",
    state: "",
    postal_code: "",
    country: "US",
  });

  // Handle shipping address input changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

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
          userId: user.uid, // Use the logged-in user's ID
          paymentMethodId: id,
          cartItems,
          shippingAddress,
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
        {/* Shipping address input fields */}
        <div className="shipping-input">
          <label>Address Line 1</label>
          <input
            type="text"
            name="line1"
            value={shippingAddress.line1}
            onChange={handleShippingChange}
            required
          />
        </div>
        <div className="shipping-input">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={shippingAddress.city}
            onChange={handleShippingChange}
            required
          />
        </div>
        <div className="shipping-input">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={shippingAddress.state}
            onChange={handleShippingChange}
            required
          />
        </div>
        <div className="shipping-input">
          <label>Postal Code</label>
          <input
            type="text"
            name="postal_code"
            value={shippingAddress.postal_code}
            onChange={handleShippingChange}
            required
          />
        </div>
        <div className="shipping-input">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={shippingAddress.country}
            onChange={handleShippingChange}
            required
          />
        </div>

        {/* Card input */}
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
