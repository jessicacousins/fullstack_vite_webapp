import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./Cart.css";

const Cart = ({
  cartItems,
  updateCartQuantity,
  removeFromCart,
  proceedToCheckout,
}) => {
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

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
    </div>
  );
};

export default Cart;
