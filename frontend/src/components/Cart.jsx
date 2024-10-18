import React from "react";
import "./Cart.css";

const Cart = ({ cartItems, removeFromCart, proceedToCheckout }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <h2>{item.title}</h2>
              <p className="price">${item.price}</p>
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
          <div className="total-price">
            <h3>Total: ${total}</h3>
          </div>
          <button className="checkout-button" onClick={proceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
