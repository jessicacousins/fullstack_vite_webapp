import React, { useState } from "react";
import "./Shopping.css";

const products = [
  {
    id: 1,
    title: "T-Shirt",
    description: "Comfortable cotton T-shirt",
    price: 25,
    image: "/placeHolder.png",
  },
  {
    id: 2,
    title: "Sweatshirt",
    description: "Warm and cozy",
    price: 40,
    image: "/placeHolder.png",
  },
  {
    id: 3,
    title: "Hat",
    description: "Stylish cap",
    price: 15,
    image: "/placeHolder.png",
  },
  {
    id: 4,
    title: "Red Hat",
    description: "Stylish red cap",
    price: 15,
    image: "/placeHolder.png",
  },
  {
    id: 5,
    title: "Robot Sweatshirt",
    description: "Stylish robot sweatshirt",
    price: 65,
    image: "/placeHolder.png",
  },
  {
    id: 6,
    title: "Robot T-Shirt",
    description: "Stylish robot t-shirt",
    price: 35,
    image: "/placeHolder.png",
  },
  {
    id: 7,
    title: "Funny T-Shirt",
    description: "Stylish funny t-shirt",
    price: 35,
    image: "/placeHolder.png",
  },
  {
    id: 8,
    title: "Funny Sweatshirt",
    description: "Stylish funny t-shirt",
    price: 75,
    image: "/placeHolder.png",
  },
];

const Shopping = ({ addToCart }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;
    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;
    setZoomPosition({ x, y });
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="shopping-container">
      <h1 className="heading-shop-title">Shop Merchandise</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div
              className="product-image"
              onClick={() => handleImageClick(product.image)}
            >
              <img src={product.image} alt={product.title} />
            </div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/* Modal for larger image view */}
      {selectedImage && (
        <div className="image-modal" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div
              className="modal-image"
              onMouseMove={handleMouseMove}
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            ></div>
            <button className="close-modal" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shopping;
