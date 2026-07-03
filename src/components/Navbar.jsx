// src/components/Navbar.jsx
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CardContext";
import logo from "../assets/logo.png";
const Navbar = forwardRef(function Navbar({ onMenuOpen, transitionRef }, ref) {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const goToBag = (e) => {
    e.preventDefault();
    transitionRef.current?.enter(() =>
      navigate("/bag", { state: { skipPreloader: true } }),
    );
    setTimeout(() => transitionRef.current?.leave(), 1100);
  };
  const goToHome = (e) => {
    e.preventDefault();
    transitionRef.current?.enter(() =>
      navigate("/", { state: { skipPreloader: true } }),
    );
    setTimeout(() => transitionRef.current?.leave(), 1100);
  };
  return (
    <nav ref={ref}>
      <div className="nav-logo">
        <a href="#">
          <img src={logo} alt="Bagify" />
        </a>
      </div>

      <div className="nav-links">
        <a onClick={goToHome}>Shop</a>
        <a href="#" onClick={goToBag}>
          Bag({totalItems})
        </a>
        <a
          href="#"
          className="menu-btn"
          onClick={(e) => {
            e.preventDefault();
            onMenuOpen();
          }}
        >
          <i className="ri-menu-3-line"></i>
        </a>
      </div>
    </nav>
  );
});

export default Navbar;
