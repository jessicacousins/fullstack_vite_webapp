import React, { useState } from "react";
import "./Shopping.css";

const products = [
  {
    id: 1,
    title: "T-Shirt",
    description: "Comfortable cotton T-shirt",
    price: 25,
  },
  { id: 2, title: "Sweatshirt", description: "Warm and cozy", price: 40 },
  { id: 3, title: "Hat", description: "Stylish cap", price: 15 },
  // Add more products as needed
];

const Shopping = ({ addToCart }) => {
  return (
    <div className="shopping-container">
      <h1>Shop Merchandise</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shopping;
