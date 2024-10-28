import React, { useState } from "react";
import "./Shopping.css";

const products = [
  {
    id: 1,
    title: "Pink T-Shirt",
    description: "Comfortable cotton T-shirt",
    price: 25,
    image: "/img/pinkTshirt.webp",
  },
  {
    id: 2,
    title: "Funny Sweatshirt",
    description: "Warm and cozy",
    price: 40,
    image: "/img/funnyGreenSweatShirt.webp",
  },
  {
    id: 3,
    title: "Robot T-Shirt",
    description: "Stylish tshirt",
    price: 65,
    image: "/img/yellowRobot.webp",
  },
  {
    id: 4,
    title: "Red Hat",
    description: "Stylish red cap",
    price: 15,
    image: "/img/redHat.webp",
  },
  {
    id: 5,
    title: "Funny Sweatshirt",
    description: "Stylish funny sweatshirt",
    price: 65,
    image: "/img/funnyPurpleSweatshirt.webp",
  },
  {
    id: 6,
    title: "Blue T-Shirt",
    description: "Comfortable cotton T-shirt",
    price: 35,
    image: "/img/blueTshirt.webp",
  },
  {
    id: 7,
    title: "Green T-Shirt",
    description: "Comfortable cotton T-shirt",
    price: 35,
    image: "/img/greenTshirt.webp",
  },
  {
    id: 8,
    title: "Black T-Shirt",
    description: "Comfortable cotton T-shirt",
    price: 35,
    image: "/img/blackTshirt.webp",
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
