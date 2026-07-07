// src/components/ProductDetail.jsx
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import Footer from "./Footer";
import { useCart } from "./CardContext";

import bag1 from "../assets/bag1.jpg";
import bag2 from "../assets/bag2.jpg";
import bag3 from "../assets/bag3.jpg";
import bag4 from "../assets/bag4.jpg";
import bag11 from "../assets/bag11.jpg";
import bag22 from "../assets/bag22.jpg";
import bag33 from "../assets/bag33.jpg";
import bag44 from "../assets/bag44.jpg";

CustomEase.create("hop", "0.8,0,0.2,1");

export const PRODUCTS = [
  {
    id: "soft-motion",
    name: "Soft Motion",
    price: "$36.50",
    category: "APPAREL",
    primary: bag1,
    hover: bag11,
    description:
      "The Soft Motion tote is crafted from heavyweight canvas with double-stitched handles and a structured base that holds its shape without trying too hard.",
    details: [
      "100% heavyweight canvas",
      "Interior zip pocket",
      "Magnetic closure",
      "Dimensions: 38 × 30 × 14 cm",
    ],
    sizes: ["One Size"],
  },
  {
    id: "metro-carry",
    name: "Metro Carry",
    price: "$25.50",
    category: "APPAREL",
    primary: bag2,
    hover: bag22,
    description:
      "The Metro Carry is a compact crossbody with an adjustable strap and three external pockets.",
    details: [
      "Ripstop nylon",
      "Adjustable strap (55–90 cm)",
      "3 external pockets",
      "YKK zippers throughout",
    ],
    sizes: ["One Size"],
  },
  {
    id: "modern-nomad",
    name: "Modern Nomad",
    price: "$30.00",
    category: "APPAREL",
    primary: bag3,
    hover: bag33,
    description:
      "The Modern Nomad backpack carries a laptop, a journal, and enough for two days.",
    details: [
      "Waxed cotton exterior",
      'Padded 15" laptop sleeve',
      "Luggage pass-through",
      "Water-resistant lining",
    ],
    sizes: ["One Size"],
  },
  {
    id: "daily-form",
    name: "Daily Form",
    price: "$30.50",
    category: "APPAREL",
    primary: bag4,
    hover: bag44,
    description:
      "The Daily Form is a minimal tote that works as well at a gallery opening as it does at a farmers market.",
    details: [
      "Vegetable-tanned leather",
      "Single internal pocket",
      "Brass hardware",
      "Hand-finished edges",
    ],
    sizes: ["One Size"],
  },
];

export default function ProductDetail({ transitionRef }) {
  const [count, setCount] = useState(0);

  const increase = () => setCount((prev) => prev + 1);
  const decrease = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const { addToCart } = useCart();

  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  useEffect(() => {
    transitionRef.current?.leave();

    gsap.set(imgRef.current, { clipPath: "inset(100% 0% 0% 0%)" });
    gsap.set(Array.from(contentRef.current.children), { y: 40, opacity: 0 });

    const tl = gsap.timeline({ delay: 1.0 });

    tl.to(imgRef.current, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.5,
      ease: "hop",
    });

    tl.to(
      Array.from(contentRef.current.children),
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power4.out" },
      "-=0.6",
    );

    return () => tl.kill();
  }, [id]);

  const handleBack = () => {
    transitionRef.current?.enter(() =>
      navigate("/", { state: { skipPreloader: true } }),
    );
    setTimeout(() => transitionRef.current?.leave(), 1100);
  };

  return (
    <div ref={pageRef} className="product-page-wrapper">
      <div className="product-grid-container">
        {/* Left Side: Images */}
        <div ref={imgRef} className="product-image-column">
          <img
            src={product.primary}
            alt={product.name}
            className="product-display-img"
          />
          <img
            src={product.hover}
            alt={product.name}
            className="product-display-img"
          />
        </div>

        {/* Right Side: Sticky Content */}
        <div ref={contentRef} className="product-content-column">
          {/* Back button */}
          <button onClick={handleBack} className="back-to-shop-btn">
            <i className="ri-arrow-left-line"></i> Return to Shop
          </button>

          <h1 className="product-title">{product.name}</h1>

          <p className="product-category">• {product.category}</p>

          <p className="product-price">{product.price}</p>

          <p className="product-description">{product.description}</p>

          {/* Quantity counter */}
          <div className="quantity-counter-container">
            <button onClick={decrease} className="counter-btn">
              <i className="ri-subtract-line"></i>
            </button>
            <span className="counter-value">{count}</span>
            <button onClick={increase} className="counter-btn">
              <i className="ri-add-line"></i>
            </button>
          </div>

          <div className="divider-line" />

          {/* Details Section */}
          <div className="details-section">
            <p className="details-heading">DETAILS</p>
            {product.details.map((detail, index) => (
              <p key={index} className="detail-item-text">
                {detail}
              </p>
            ))}
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={() => {
              if (count > 0) {
                addToCart(product, count);
                setCount(0);
              }
            }}
            className="add-to-bag-submit"
          >
            ADD TO BAG ({count}){" "}
            <i className="ri-arrow-right-up-line add-to-bag-icon"></i>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
