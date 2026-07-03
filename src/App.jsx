import { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import ProductDetail from "./components/ProductDetail";
import BagPage from "./components/BagPage";
import { CartProvider } from "./components/CardContext";
import ScrollToTop from "./components/ScrollToTop";

import ShippingPage from "./components/ShippingPage";
import AboutPage from "./components/Aboutpage";
gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger);
CustomEase.create("hop", "0.8,0,0.2,1");
CustomEase.create("hop2", "0.9,0,0.1,1");

// ── Shared hero + nav animation — called both after preloader AND on back nav ──
function runHeroAnimation({ heroEl, navEl }) {
  gsap.set(heroEl, {
    visibility: "visible",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    y: "100%",
    zIndex: 5,
  });

  gsap.set(navEl, { y: "-100%", opacity: 0 });
  gsap.set(".product-wrap", {
    visibility: "visible",
  });
  const headerH1 = heroEl.querySelector(".header h1");
  gsap.set(headerH1, { visibility: "hidden" });
  const split = SplitText.create(headerH1, {
    type: "chars",
    charClass: "char",
  });
  gsap.set(split.chars, { y: "100%" });
  gsap.set(headerH1, { visibility: "visible" });

  const tl = gsap.timeline();

  tl.to(heroEl, { y: "0%", duration: 1.2, ease: "power4.out" }, 0);

  tl.call(
    () => {
      gsap.set(heroEl, {
        position: "relative",
        top: "auto",
        left: "auto",
        width: "100%",
        y: 0,
        duration: 1,
      });
    },
    null,
    1.2,
  );

  tl.to(
    split.chars,
    {
      y: "0%",
      duration: 1,
      ease: "hop",
      stagger: { each: 0.075, from: "random" },
    },
    1.4,
  );

  tl.to(
    heroEl.querySelector(".line"),
    { scaleX: 1, duration: 1, ease: "power2.out" },
    "-=0.65",
  );
  tl.to(navEl, { y: 0, opacity: 1, duration: 1.05, ease: "power4.out" }, 0.7);

  // Set initial state explicitly so it works on both first load AND back nav
  gsap.set(".content p, .content1 .para p, .content1 a", { y: 40, opacity: 0 });

  tl.to(
    ".content p",
    { y: 0, opacity: 1, duration: 1, stagger: 0.075, ease: "power4.out" },
    0.9,
  );
  tl.to(
    ".content1 .para p",
    { y: 0, opacity: 1, duration: 1, stagger: 0.075, ease: "power4.out" },
    0.9,
  );
  tl.to(
    ".content1 a",
    { y: 0, opacity: 1, duration: 1, stagger: 0.075, ease: "power4.out" },
    0.9,
  );

  // Row 1 clip reveal
  document.querySelectorAll(".image-container1 .product-detail");

  tl.to(
    ".image-container1 .img-reveal",
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.2,
    },
    1.9,
  );
  tl.to(
    ".image-container1 .img-reveal img",
    { y: "0%", scale: 1, duration: 1.3, ease: "power4.out", stagger: 0.1 },
    "<",
  );
  tl.to(
    ".image-container1 .product-name, .image-container1 .product-color",
    { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 },
    "-=0.8",
  );

  // ScrollTrigger rows
  tl.call(() => {
    document
      .querySelectorAll(".product-image2 .product-detail")
      .forEach((card) => {
        const imgReveal = card.querySelector(".img-reveal");
        const imgInner = card.querySelectorAll(".img-reveal img");
        const name = card.querySelector(".product-name");
        const color = card.querySelector(".product-color");

        gsap.set(imgReveal, { clipPath: "inset(100% 0% 0% 0%)" });
        gsap.set(imgInner, { y: "30%", scale: 1.1 });
        gsap.set([name, color], { y: 24, opacity: 0 });

        const st = { trigger: card, start: "top 88%", once: true };
        gsap.to(imgReveal, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: st,
        });
        gsap.to(imgInner, {
          y: "0%",
          scale: 1,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: st,
        });
        gsap.to([name, color], {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.3,
          scrollTrigger: st,
        });
      });
  });

  return () => {
    tl.kill();
    split.revert();
    ScrollTrigger.getAll().forEach((st) => st.kill());
  };
}

// ── HomePage ───────────────────────────────────────────────────────────────
function HomePage({ transitionRef, navRef, heroRef }) {
  const location = useLocation();
  const skipPreloader = location.state?.skipPreloader === true;
  const [preloaderDone, setPreloaderDone] = useState(skipPreloader);

  useEffect(() => {
    if (!preloaderDone) return;

    const heroEl = heroRef.current;
    const navEl = navRef.current;
    if (!heroEl || !navEl) return;

    const cleanup = runHeroAnimation({ heroEl, navEl });
    return cleanup;
  }, [preloaderDone, heroRef, navRef]);

  const handlePreloaderComplete = useCallback(() => setPreloaderDone(true), []);

  return (
    <>
      {!skipPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <Hero ref={heroRef} transitionRef={transitionRef} />
      <Products transitionRef={transitionRef} />
      <Footer />
    </>
  );
}

// ── AppInner ───────────────────────────────────────────────────────────────
function AppInner() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navRef = useRef(null);
  const heroRef = useRef(null);
  const transitionRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      gsap.to(".cursor", {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power1.out",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div className="cursor" />
      <PageTransition ref={transitionRef} />
      <Navbar
        ref={navRef}
        onMenuOpen={() => setMenuOpen(true)}
        transitionRef={transitionRef}
      />

      <Menu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        transitionRef={transitionRef}
      />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              transitionRef={transitionRef}
              navRef={navRef}
              heroRef={heroRef}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<ProductDetail transitionRef={transitionRef} />}
        />
        <Route
          path="/bag"
          element={<BagPage transitionRef={transitionRef} />}
        />
        <Route
          path="/shipping"
          element={<ShippingPage transitionRef={transitionRef} />}
        />
        <Route
          path="/about"
          element={<AboutPage transitionRef={transitionRef} />}
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppInner />
      </BrowserRouter>
    </CartProvider>
  );
}
