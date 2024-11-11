import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./Cart.css";
import { products } from "./Shopping";

const Cart = ({
  cartItems,
  updateCartQuantity,
  removeFromCart,
  proceedToCheckout,
  addToCart,
}) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // filtering recommendations based on items in the cart
  const getRecommendations = () => {
    const cartLabels = cartItems.map((item) => item.label);
    return products
      .filter(
        (product) =>
          cartLabels.includes(product.label) &&
          !cartItems.some((cartItem) => cartItem.id === product.id)
      )
      .slice(0, 3); // limit recommendations 3 items for simplicity
  };

  const recommendations = getRecommendations();

  return (
    <div className="cart-page-container">
      <h1>Your Cart</h1>
      <FaShoppingCart className="cart-page-icon" />
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-page-card">
          <div className="cart-page-items">
            {cartItems.map((item, index) => (
              <div className="cart-page-item" key={index}>
                <div className="cart-page-item-details">
                  <h2>{item.title}</h2>
                  <p className="cart-page-price">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <div className="cart-page-item-actions">
                  <div className="cart-page-quantity-control">
                    <button
                      onClick={() =>
                        updateCartQuantity(index, item.quantity - 1)
                      }
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartQuantity(index, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-page-remove-button"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-page-summary">
            <h3>Total: ${total}</h3>
            <button
              className="cart-page-checkout-button"
              onClick={proceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Display Recommendations */}
      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h2>You May Also Like</h2>
          <div className="recommendations-grid">
            {recommendations.map((recommendation) => (
              <div className="recommendation-card" key={recommendation.id}>
                <img
                  src={recommendation.image}
                  alt={recommendation.title}
                  className="recommendation-image"
                />
                <h3>{recommendation.title}</h3>
                <p>${recommendation.price}</p>
                <button onClick={() => addToCart(recommendation)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
