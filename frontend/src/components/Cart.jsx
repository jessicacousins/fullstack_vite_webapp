import React from "react";
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
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-card">
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <div className="item-details">
                  <h2>{item.title}</h2>
                  <p className="price">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <div className="item-actions">
                  <div className="quantity-control">
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
                    className="remove-button"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${total}</h3>
            <button className="checkout-button" onClick={proceedToCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
