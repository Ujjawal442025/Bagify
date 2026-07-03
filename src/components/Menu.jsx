// src/components/Menu.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useCart } from "./CardContext";

export default function Menu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const tlRef = useRef(null);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.to(menuRef.current, { y: "0%", duration: 0.8, ease: "power4.out" });

      tl.from(
        ".menu a",
        {
          x: 100,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3",
      );

      tl.from(
        ".close-btn",
        {
          rotate: 360,
          x: 400,
          duration: 1,
          y: 0,
        },
        "-=0.4",
      );

      tlRef.current = tl;
    }, menuRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    isOpen ? tlRef.current.play() : tlRef.current.reverse();
  }, [isOpen]);

  // Close menu then navigate
  const handleNav = (path) => {
    onClose(); // reverse the menu slide
    setTimeout(() => navigate(path, { state: { skipPreloader: true } }), 600); // wait for reverse to finish
  };

  return (
    <div className="menu" ref={menuRef}>
      <a onClick={() => handleNav("/")}>Home</a>
      <a onClick={() => handleNav("/about")}>About</a>
      <a onClick={() => handleNav("/")}>Shop</a>
      <a onClick={() => handleNav("/bag")}>Bag ({totalItems})</a>
      <a onClick={() => handleNav("/shipping")}>Shipping</a>

      <button className="close-btn" onClick={onClose}>
        <i className="ri-close-large-line"></i>
      </button>
    </div>
  );
}
