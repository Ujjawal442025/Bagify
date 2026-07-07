// src/components/BagPage.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useCart } from "./CardContext";
import BouncingVideo from "./BouncingVideo";

export default function BagPage({ transitionRef }) {
  const { cartItems, removeFromCart, updateQty, totalItems, totalPrice } =
    useCart();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const emptyRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    transitionRef.current?.leave();
    const targets =
      cartItems.length > 0 ? listRef.current?.children : [emptyRef.current];
    if (!targets) return;
    gsap.set(targets, { y: 40, opacity: 0 });
    gsap.to(targets, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: "power4.out",
      delay: 1.0,
    });
  }, [cartItems.length]);

  const handleBack = () => {
    transitionRef.current?.enter(() =>
      navigate("/", { state: { skipPreloader: true } }),
    );
    setTimeout(() => transitionRef.current?.leave(), 1100);
  };

  return (
    <div ref={pageRef} className="bag-page-container">
      {/* ── Header ── */}
      <div className="bag-header-wrapper">
        <div className="bag-header-row">
          <h1 className="bag-main-title">Your Bag</h1>
          {totalItems > 0 && (
            <p className="bag-items-count">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          )}
        </div>
        <div className="bag-header-divider" />
      </div>

      {/* ── Empty state ── */}
      {cartItems.length === 0 && (
        <>
          <BouncingVideo />
          <div ref={emptyRef} className="bag-empty-text-group">
            <p className="bag-empty-headline">Not even one thing?</p>
            <p className="bag-empty-subline">That's sad.</p>
          </div>
          <div className="bag-shop-now-wrapper">
            <button onClick={handleBack} className="bag-shop-now-btn">
              Shop Now <i className="ri-arrow-right-up-line" />
            </button>
          </div>

          {/* Footer */}
          <div className="footer-content bag-footer-spacer">
            <div className="line1 h"></div>
            <div className="footer-foot">
              <div className="foot">
                <p>Created By</p>
                <p>Ujjawal Kumar Jha</p>
              </div>
              <div className="foot">
                <p>Situated At</p>
                <p>New Ashok Nagar</p>
              </div>
              <div className="foot">
                <p>Privacy Policy</p>
              </div>
              <div className="foot">
                <a href="#">Commudle</a>
                <a href="#">Instagram</a>
                <a href="#">Linkedin</a>
                <a href="#">Discord</a>
              </div>
              <div className="foot">
                <a href="#">Work</a>
                <a href="#">Services</a>
                <a href="#">Careers</a>
                <a href="#">About</a>
              </div>
              <div className="foot">
                <a href="#">Let&apos;s Talk</a>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Cart items ── */}
      {cartItems.length > 0 && (
        <>
          <div className="bag-items-outer-wrapper">
            <div ref={listRef}>
              {cartItems.map((item) => (
                <CartRow
                  key={item.id}
                  item={item}
                  onRemove={() => removeFromCart(item.id)}
                  onQtyChange={(qty) => updateQty(item.id, qty)}
                />
              ))}
            </div>

            {/* Summary */}
            <div className="bag-summary-card">
              {[
                ["Subtotal", `$${totalPrice.toFixed(2)}`],
                ["Shipping", "Free"],
              ].map(([label, val]) => (
                <div key={label} className="bag-summary-line-row">
                  <p className="bag-summary-label">{label}</p>
                  <p className="bag-summary-value">{val}</p>
                </div>
              ))}
              <div className="bag-summary-total-row">
                <p className="bag-summary-total-text">Total</p>
                <p className="bag-summary-total-price">
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <button className="bag-checkout-submit-btn">
                CHECKOUT <i className="ri-arrow-right-up-line" />
              </button>
              <button
                onClick={handleBack}
                className="bag-continue-shopping-btn"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="footer-content bag-footer-spacer">
            <div className="line1 h"></div>
            <div className="footer-foot">
              <div className="foot">
                <p>Created By</p>
                <p>Ujjawal Kumar Jha</p>
              </div>
              <div className="foot">
                <p>Situated At</p>
                <p>New Ashok Nagar</p>
              </div>
              <div className="foot">
                <p>Privacy Policy</p>
              </div>
              <div className="foot">
                <a href="#">Commudle</a>
                <a href="#">Instagram</a>
                <a href="#">Linkedin</a>
                <a href="#">Discord</a>
              </div>
              <div className="foot">
                <a href="#">Work</a>
                <a href="#">Services</a>
                <a href="#">Careers</a>
                <a href="#">About</a>
              </div>
              <div className="foot">
                <a href="#">Let&apos;s Talk</a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function CartRow({ item, onRemove, onQtyChange }) {
  return (
    <div className="cart-row-grid">
      {/* Left — name + price */}
      <div className="cart-row-left-block">
        <div className="cart-row-title-category-group">
          <span className="cart-row-item-name">{item.name}</span>
          <p className="cart-row-item-category">• {item.category}</p>
        </div>
        <div className="cart-row-price-display-group">
          <p className="cart-row-calculated-price">
            ${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Right — image + controls */}
      <div className="cart-row-right-block">
        <img
          src={item.primary}
          alt={item.name}
          className="cart-row-thumbnail-img"
        />
        <div className="cart-row-actions-group">
          <button onClick={onRemove} className="cart-row-remove-btn">
            Remove
          </button>
          <div className="cart-row-counter-controls">
            <button
              onClick={() => onQtyChange(item.qty - 1)}
              className="cart-row-counter-btn"
            >
              <i className="ri-subtract-line" />
            </button>
            <span className="cart-row-counter-value">{item.qty}</span>
            <button
              onClick={() => onQtyChange(item.qty + 1)}
              className="cart-row-counter-btn"
            >
              <i className="ri-add-line" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
