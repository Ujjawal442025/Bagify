import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

const Hero = forwardRef(function Hero({ transitionRef }, ref) {
  const navigate = useNavigate();
  const goToShop = (e) => {
    e.preventDefault();
    transitionRef.current?.enter(() =>
      navigate("/shipping", { state: { skipPreloader: true } }),
    );
    setTimeout(() => transitionRef.current?.leave(), 1100);
  };
  return (
    <section
      className="hero"
      ref={ref}
      style={{
        // Start hidden + below viewport — GSAP will set position:fixed
        // and animate y: 100% → 0% after preloader finishes
        visibility: "hidden",
      }}
    >
      <div className="header">
        <h1>Bagify</h1>
      </div>
      <div className="line"></div>
      <div className="content">
        <p>Bagify</p>
        <p>Why</p>
        <p>Visit Profile on Linkedin</p>
        <p>ⓒ 2026</p>
      </div>
      <div className="content1">
        <div className="para">
          <p>Created by the Ujjawal Kumar Jha, this store and signature</p>
          <p>collection celebrates our collective creativity and passion</p>
          <p>for apparel. Carefully designed.</p>
        </div>

        <a href="#" onClick={goToShop}>
          Shipping &amp; Returns
        </a>
      </div>
    </section>
  );
});

export default Hero;
