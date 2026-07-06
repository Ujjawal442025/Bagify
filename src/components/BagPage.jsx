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
  }, []);

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
        paddingTop: "8rem",
        paddingBottom: "4rem",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{ padding: "0 clamp(1rem, 4vw, 4rem)", marginBottom: "3rem" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <h1
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "clamp(3rem, 12vw, 19rem)",
              fontWeight: 600,
              textTransform: "uppercase",
              lineHeight: 0.9,
              letterSpacing: "clamp(2px, 1vw, 15px)",
            }}
          >
            Your Bag
          </h1>
          {totalItems > 0 && (
            <p
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "1.4rem",
                fontWeight: 500,
                opacity: 0.5,
              }}
            >
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          )}
        </div>
        <div
          style={{
            height: "5px",
            backgroundColor: "var(--base-300)",
            marginTop: "1rem",
          }}
        />
      </div>

      {/* ── Empty state ── */}
      {cartItems.length === 0 && (
        <>
          <BouncingVideo />
          <div
            ref={emptyRef}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              marginTop: "7rem",
              marginLeft: "clamp(1rem, 4vw, 4rem)",
              opacity: 0,
            }}
          >
            <p
              style={{
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(2rem, 8vw, 13rem)",
                fontWeight: "bolder",
                letterSpacing: "clamp(-3px, -0.5vw, -10px)",
              }}
            >
              Not even one thing?
            </p>
            <p
              style={{
                color: "#433c38",
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: "clamp(2rem, 8vw, 13rem)",
                fontWeight: "bolder",
                letterSpacing: "clamp(-3px, -0.5vw, -10px)",
              }}
            >
              That's sad.
            </p>
          </div>
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              marginLeft: "clamp(1rem, 4vw, 4rem)",
            }}
          >
            <button
              onClick={handleBack}
              style={{
                marginTop: "2rem",
                padding: "clamp(0.6rem, 1.5vw, 1rem) clamp(1.5rem, 3vw, 4rem)",
                backgroundColor: "var(--base-300)",
                color: "var(--base-100)",
                border: "none",
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "clamp(1.2rem, 3vw, 4rem)",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Shop Now <i className="ri-arrow-right-up-line" />
            </button>
          </div>

          {/* Footer */}
          <div className="footer-content" style={{ marginTop: "8rem" }}>
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
          <div style={{ padding: "0 clamp(1rem, 4vw, 4rem)" }}>
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
            <div
              style={{
                marginTop: "5rem",
                paddingTop: "2rem",
                borderTop: "2px solid rgba(20,20,20,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
              }}
            >
              {[
                ["Subtotal", `$${totalPrice.toFixed(2)}`],
                ["Shipping", "Free"],
              ].map(([label, val]) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'PP Neue Montreal', sans-serif",
                      fontSize: "clamp(1.2rem, 2.5vw, 2.5rem)",
                      opacity: 0.5,
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'PP Neue Montreal', sans-serif",
                      fontSize: "clamp(1.2rem, 2.5vw, 2.5rem)",
                      fontWeight: 600,
                    }}
                  >
                    {val}
                  </p>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginTop: "2rem",
                  borderTop: "1px solid rgba(20,20,20,0.15)",
                  paddingTop: "1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'PP Neue Montreal', sans-serif",
                    fontSize: "clamp(1.4rem, 2.5vw, 2.4rem)",
                    fontWeight: 700,
                  }}
                >
                  Total
                </p>
                <p
                  style={{
                    fontFamily: "'PP Neue Montreal', sans-serif",
                    fontSize: "clamp(1.4rem, 2.5vw, 2.4rem)",
                    fontWeight: 700,
                  }}
                >
                  ${totalPrice.toFixed(2)}
                </p>
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "1.25rem",
                  backgroundColor: "var(--base-300)",
                  color: "var(--base-100)",
                  border: "none",
                  fontFamily: "'PP Neue Montreal', sans-serif",
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  marginTop: "0.5rem",
                }}
              >
                CHECKOUT <i className="ri-arrow-right-up-line" />
              </button>
              <button
                onClick={handleBack}
                style={{
                  background: "none",
                  border: "none",
                  fontFamily: "'PP Neue Montreal', sans-serif",
                  fontSize: "clamp(1rem, 1.5vw, 1.9rem)",
                  fontWeight: 600,
                  cursor: "pointer",
                  opacity: 0.4,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="footer-content" style={{ marginTop: "8rem" }}>
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "2rem 0",
        height: "clamp(12rem, 20vw, 30rem)",
        borderBottom: "1px solid rgba(20,20,20,0.1)",
      }}
    >
      {/* Left — name + price */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "0.75rem",
          height: "100%",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: "1rem",
            height: "100%",
          }}
        >
          <span
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "clamp(1.5rem, 3.5vw, 5rem)",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "1px",
              lineHeight: 1.1,
            }}
          >
            {item.name}
          </span>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1rem",
              opacity: 0.4,
            }}
          >
            • {item.category}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "clamp(1.2rem, 2vw, 3rem)",
              fontWeight: 600,
            }}
          >
            ${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Right — image + controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          alignItems: "center",
          paddingLeft: "1rem",
          gap: "1rem",
        }}
      >
        <img
          src={item.primary}
          alt={item.name}
          style={{
            width: "65%",
            height: "100%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
          }}
        >
          <button
            onClick={onRemove}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "clamp(1rem, 1.5vw, 2rem)",
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            Remove
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => onQtyChange(item.qty - 1)}
              style={{
                width: "28px",
                height: "28px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="ri-subtract-line" />
            </button>
            <span
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "clamp(1rem, 1.5vw, 2rem)",
                fontWeight: 600,
                minWidth: "20px",
                textAlign: "center",
              }}
            >
              {item.qty}
            </span>
            <button
              onClick={() => onQtyChange(item.qty + 1)}
              style={{
                width: "28px",
                height: "28px",
                border: "none",
                background: "none",
                cursor: "pointer",
                fontSize: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <i className="ri-add-line" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
