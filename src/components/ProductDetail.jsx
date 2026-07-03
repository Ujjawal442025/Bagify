// src/components/ProductDetail.jsx
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import Footer from "./Footer";
import { useCart } from "./CardContext";

CustomEase.create("hop", "0.8,0,0.2,1");

export const PRODUCTS = [
  {
    id: "soft-motion",
    name: "Soft Motion",
    price: "$36.50",
    category: "APPAREL",
    primary: "/bag1.jpg",
    hover: "/bag11.jpg",
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
    primary: "/bag2.jpg",
    hover: "/bag22.jpg",
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
    primary: "/bag3.jpg",
    hover: "/bag33.jpg",
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
    primary: "/bag4.jpg",
    hover: "/bag44.jpg",
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

  // ── KEY FIX: pass skipPreloader:true so HomePage skips preloader ──
  const handleBack = () => {
    transitionRef.current?.enter(() =>
      navigate("/", { state: { skipPreloader: true } }),
    );
    setTimeout(() => transitionRef.current?.leave(), 1100);
  };

  return (
    <div
      ref={pageRef}
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--base-200)",
        paddingTop: "7rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "4rem",
          padding: "0 4rem 4rem",
          maxWidth: "2500px",
          margin: "3rem auto",
        }}
      >
        {/* Image */}
        <div
          ref={imgRef}
          style={{
            width: "100%",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <img
            src={product.primary}
            alt={product.name}
            style={{ width: "100%", height: "150vh", objectFit: "cover" }}
          />
          <img
            src={product.hover}
            alt={product.name}
            style={{ width: "100%", height: "150vh", objectFit: "cover" }}
          />
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          style={{
            paddingTop: "2rem",
            display: "flex",
            flexDirection: "column",
            position: "sticky",
            top: "100px",
            alignSelf: "start",
            gap: "1.5rem",
          }}
        >
          {/* Back button */}
          <button
            onClick={handleBack}
            style={{
              zIndex: 10,
              background: "none",
              border: "none",
              fontSize: "1.4rem",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--base-300)",
            }}
          >
            <i className="ri-arrow-left-line"></i> Return to Shop
          </button>

          <h1
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 8rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "5px",
              textTransform: "uppercase",
            }}
          >
            {product.name}
          </h1>

          <p
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              opacity: 0.5,
            }}
          >
            • {product.category}
          </p>

          <p
            style={{ fontSize: "4rem", letterSpacing: "2px", fontWeight: 600 }}
          >
            {product.price}
          </p>

          <p
            style={{
              fontSize: "2rem",
              lineHeight: 1.3,
              opacity: 0.75,
              maxWidth: "480px",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            {product.description}
          </p>

          {/* Quantity counter */}
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <button
              onClick={decrease}
              style={{
                width: "40px",
                height: "40px",
                fontSize: "3rem",
                cursor: "pointer",
                border: "none",
                backgroundColor: "#f5ebde",
              }}
            >
              <i className="ri-subtract-line"></i>
            </button>
            <span
              style={{
                marginTop: "9px",
                fontSize: "4rem",
                fontWeight: "500",
                minWidth: "80px",
                fontFamily: "PP Neue Montreal",
                textAlign: "center",
              }}
            >
              {count}
            </span>
            <button
              onClick={increase}
              style={{
                width: "40px",
                height: "40px",
                fontSize: "3rem",
                cursor: "pointer",
                border: "none",
                backgroundColor: "#f5ebde",
              }}
            >
              <i className="ri-add-line"></i>
            </button>
          </div>

          <div
            style={{
              height: "1px",
              backgroundColor: "var(--base-300)",
              opacity: 0.2,
            }}
          />

          <div>
            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                marginBottom: "0.75rem",
                opacity: 0.5,
              }}
            >
              DETAILS
            </p>
            {product.details.map((d, i) => (
              <p
                key={i}
                style={{
                  fontSize: "1.8rem",
                  lineHeight: 2,
                  borderBottom: "1px solid rgba(67, 53, 53, 0.74)",
                  paddingBottom: "0.2rem",
                  letterSpacing: "1.3px",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: "700",
                }}
              >
                {d}
              </p>
            ))}
          </div>

          <button
            onClick={() => {
              if (count > 0) {
                addToCart(product, count);
                setCount(0);
              }
            }}
            style={{
              width: "100%",
              padding: "1.25rem",
              backgroundColor: "var(--base-300)",
              color: "var(--base-100)",
              border: "none",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.9rem",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.05em",
            }}
          >
            ADD TO BAG ({count}){" "}
            <i
              className="ri-arrow-right-up-line"
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "2.6rem",
                fontWeight: 600,
              }}
            ></i>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}
