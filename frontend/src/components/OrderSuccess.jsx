import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails } = location.state || {};

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        {/* Note to self: Success Icon - create later on Grok */}
        {/* <img src="/success-icon.png" alt="Success" className="success-icon" /> */}
        <h1>Thank You for Your Purchase!</h1>
        <p>Your order has been successfully placed.</p>
        <p>You will receive a confirmation email shortly.</p>

        {orderDetails && (
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="order-item">
                  <span className="item-name">
                    {item.title} x {item.quantity}
                  </span>
                  <span className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="order-total">
              <h3>Total: ${orderDetails.totalAmount.toFixed(2)}</h3>
            </div>
          </div>
        )}

        {/* Back to Shopping Button */}
        <button className="back-button" onClick={() => navigate("/shopping")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
