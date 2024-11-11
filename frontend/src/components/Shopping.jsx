import React, { useState, Suspense } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./Shopping.css";

// const FashionClassifier = React.lazy(() => import("./FashionClassifier"));

const MobileNetClassifier = React.lazy(() => import("./MobileNetClassifier"));

export const products = [
  {
    id: 1,
    title: "Pink T-Shirt",
    description: "Comfortable cotton T-shirt",
    price: 25,
    image: "/img/pinkTshirt.webp",
    label: "Shirt",
  },
  {
    id: 2,
    title: "Funny Sweatshirt",
    description: "Warm and cozy",
    price: 40,
    image: "/img/funnyGreenSweatShirt.webp",
    label: "Pullover",
  },
  {
    id: 3,
    title: "Robot T-Shirt",
    description: "Stylish tshirt",
    price: 65,
    image: "/img/yellowRobot.webp",
    label: "Shirt",
  },
  {
    id: 4,
    title: "Red Hat",
    description: "Stylish red cap",
    price: 15,
    image: "/img/redHat.webp",
    label: "Hat",
  },
  {
    id: 5,
    title: "Funny Sweatshirt",
    description: "Warm and cozy",
    price: 65,
    image: "/img/funnyPurpleSweatshirt.webp",
    label: "Pullover",
  },
  {
    id: 6,
    title: "Blue T-Shirt",
    description: "Comfortable cotton T-shirt",
    price: 35,
    image: "/img/blueTshirt.webp",
    label: "Shirt",
  },
  {
    id: 7,
    title: "Green T-Shirt",
    description: "Comfortable cotton T-shirt",
    price: 35,
    image: "/img/greenTshirt.webp",
    label: "Shirt",
  },
  {
    id: 8,
    title: "Black T-Shirt",
    description: "Comfortable cotton T-shirt",
    price: 35,
    image: "/img/blackTshirt.webp",
    label: "Shirt",
  },
  {
    id: 9,
    title: "Black Teddy Bear",
    description: "Cute Teddy Bear",
    price: 75,
    image: "/img/cuteBear.webp",
    label: "Teddy Bear",
  },
  {
    id: 10,
    title: "Polar Teddy Bear",
    description: "Cute Teddy Bear",
    price: 75,
    image: "/img/polarTeddy.webp",
    label: "Hat",
  },
  {
    id: 11,
    title: "iPad",
    description: "iPad",
    price: 235,
    image: "/img/ipad.webp",
    label: "iPad",
  },
  {
    id: 12,
    title: "Black Hoodie",
    description: "Comfortable black hoodie",
    price: 55,
    image: "/img/blackHoodie.webp",
    label: "Hat",
  },
  {
    id: 13,
    title: "Brown Teddy Bear",
    description: "Cute Teddy Bear",
    price: 75,
    image: "/img/teddyBear.webp",
    label: "Teddy Bear",
  },
  {
    id: 14,
    title: "Pack - Coffee Mugs",
    description: "Pack of white coffee mugs",
    price: 45,
    image: "/img/packOfMugs.webp",
    label: "Cup",
  },
  {
    id: 15,
    title: "Pack - Wine Glasses",
    description: "Pack of wine glasses",
    price: 45,
    image: "/img/wineGlasses.webp",
    label: "Cup",
  },
  {
    id: 16,
    title: "Pen",
    description: "Classic writing pen",
    price: 5,
    image: "/img/pen.webp",
    label: "Cup",
  },
  {
    id: 17,
    title: "Gaming Laptop",
    description: "Gaming Laptop",
    price: 1225,
    image: "/img/gamingLaptop.webp",
    label: "Laptop",
  },
  {
    id: 18,
    title: "Wireless Mouse",
    description: "Wireless Mouse",
    price: 15,
    image: "/img/mouse.webp",
    label: "Laptop",
  },
  {
    id: 19,
    title: "Headphones - Mic",
    description: "Headphones with Mic",
    price: 25,
    image: "/img/headphones.webp",
    label: "Microphone",
  },
  {
    id: 20,
    title: "Jeep Wrangler",
    description: "Jeep Wrangler",
    price: 20225,
    image: "/img/jeep.webp",
    label: "Jeep",
  },
  {
    id: 21,
    title: "BMW",
    description: "BMW Sports Car",
    price: 95000,
    image: "/img/bmw.webp",
    label: "Sports Car",
  },
  {
    id: 22,
    title: "Tractor",
    description: "Red Tractor",
    price: 165000,
    image: "/img/tractor.webp",
    label: "Tractor",
  },
  {
    id: 23,
    title: "Sony Camera",
    description: "Sony Camera",
    price: 1620,
    image: "/img/sonyCamera.webp",
    label: "Camera",
  },
  {
    id: 24,
    title: "Sunglasses",
    description: "Sunglasses",
    price: 10,
    image: "/img/sunglasses.webp",
    label: "Sunglasses",
  },
];

const Shopping = ({ addToCart }) => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recommendations, setRecommendations] = useState("");
  const [learningContent, setLearningContent] = useState("");
  const [showLearningModal, setShowLearningModal] = useState(false);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setSelectedImage(product.image);
  };

  const handleLearnMore = async (product) => {
    try {
      console.log("User ID:", user?._id);
      console.log("Fetching insights and recommendations for:", product.label);

      await axios.post("/api/users/view-product", {
        email: user?.email,
        productId: product.id,
        title: product.title,
        category: product.label,
      });

      const [insightResponse, recommendationResponse] = await Promise.all([
        axios.post("/api/learning/insights", {
          label: product.label,
        }),
        axios.post("/api/chatbot/recommendations", {
          category: product.label,
          productId: product.id,
          title: product.title,
          userId: user?._id,
        }),
      ]);

      setLearningContent(insightResponse.data.insight);
      setRecommendations(recommendationResponse.data.recommendations);
      setShowLearningModal(true);
    } catch (error) {
      console.error(
        "Error logging product view or fetching recommendations:",
        error
      );
    }
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
      <Suspense fallback={<div>Loading MobileNet Classifier...</div>}>
        <MobileNetClassifier selectedProduct={selectedProduct} />
      </Suspense>
      <h1 className="heading-shop-title">Shop Merchandise</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div
              className="product-image"
              onClick={() => handleImageClick(product)}
            >
              <img src={product.image} alt={product.title} />
            </div>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
            <button onClick={() => handleLearnMore(product)}>Learn More</button>
          </div>
        ))}
      </div>

      {/* Modal for Learning Content & Recommendations */}
      {showLearningModal && (
        <div
          className="learning-modal"
          onClick={() => setShowLearningModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Learning Mode</h2>
            <p>{learningContent}</p>

            <h3>Recommended Products</h3>
            <p>{recommendations}</p>

            <button onClick={() => setShowLearningModal(false)}>Close</button>
          </div>
        </div>
      )}

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
