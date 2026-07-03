// src/components/Preloader.jsx
// ─────────────────────────────────────────────
// Handles the full preloader sequence using GSAP + SplitText.
// Calls onComplete() when animation finishes so App can unlock scroll.
// ─────────────────────────────────────────────
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/all";
import bag1 from "../assets/bag1.jpg";
import bag3 from "../assets/bag3.jpg";
import bag44 from "../assets/bag44.jpg";
import bag2 from "../assets/bag2.jpg";
import bag11 from "../assets/bag11.jpg";
import bag55 from "../assets/bag55.jpg";
gsap.registerPlugin(SplitText, CustomEase);
CustomEase.create("hop", "0.8,0,0.2,1");
CustomEase.create("hop2", "0.9,0,0.1,1");

const IMAGES = [bag1, bag3, bag44, bag2, bag11, bag55];

const INIT_ROTATIONS = [7.5, -2.5, -10, 12.5, -5, 5];
// 🔥 preload helper
const preloadImages = (images) => {
  return Promise.all(
    images.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve;
        }),
    ),
  );
};
export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const headingRef = useRef(null);
  const counterRef = useRef(null);

  useLayoutEffect(() => {
    // Lock scroll while preloader runs
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    const ctx = gsap.context(() => {
      // ── Hide heading before split so chars never flash visible ──
      gsap.set(headingRef.current, { visibility: "hidden" });

      // ── Split the heading chars ──
      const split = SplitText.create(headingRef.current, {
        type: "chars",
        charClass: "char",
        mask: "chars",
      });

      // ── Immediately push all chars below their mask — no CSS dependency ──
      gsap.set(split.chars, { y: "100%" });

      // ── Now safe to show the heading (chars are hidden inside mask) ──
      gsap.set(headingRef.current, { visibility: "visible" });

      // ── Set initial rotations on images ──
      gsap.set(".preloader-img", {
        rotate: (i) => INIT_ROTATIONS[i],
      });

      const tl = gsap.timeline({ delay: 0.5 });

      // 1. Images fan in
      tl.to(".preloader-img", {
        scale: 1,
        clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
        duration: 1,
        ease: "hop",
        stagger: 0.2,
      });

      // 2. Heading chars drop in (random stagger)
      tl.to(
        split.chars,
        {
          y: "0%",
          duration: 1,
          ease: "hop2",
          stagger: { each: 0.125, from: "random" },
        },
        "0.35",
      );

      // 3. Counter rises + counts 0→100
      tl.to(
        counterRef.current,
        {
          y: "0%",
          duration: 1,
          ease: "hop2",
          onStart: () => {
            const counter = { value: 0 };
            gsap.to(counter, {
              value: 100,
              duration: 2,
              delay: 0.5,
              ease: "power2.inOut",
              onUpdate: () => {
                counterRef.current.textContent = String(
                  Math.round(counter.value),
                ).padStart(3, "0");
              },
            });
          },
        },
        "<",
      );

      // 4. Counter exits up
      tl.to(
        counterRef.current,
        { y: "-100%", duration: 0.75, ease: "hop2" },
        3.25,
      );

      // 5. Heading chars exit up
      tl.to(
        split.chars,
        {
          y: "-100%",
          duration: 0.75,
          ease: "hop2",
          stagger: { each: 0.125, from: "random" },
        },
        3.25,
      );

      // 6. Images collapse
      tl.to(
        ".preloader-img",
        {
          scale: 0,
          clipPath: "polygon(20% 20%, 80% 20%, 80% 20%, 20% 80%)",
          ease: "hop2",
          stagger: -0.075,
        },
        3.5,
      );

      // 7. Preloader clips out
      tl.to(
        preloaderRef.current,
        {
          clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
          duration: 1,
          ease: "hop2",
        },
        4.35,
      );

      // 8. Call parent AFTER preloader fully clipped out
      tl.call(
        () => {
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          document.body.style.height = "";
          onComplete?.();
        },
        null,
        ">",
      );
    }, preloaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      {/* Background images */}
      <div className="preloader-images">
        {IMAGES.map((src, i) => (
          <div className="preloader-img" key={i}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>

      {/* Big heading + counter */}
      <div className="preload-header">
        <h1 ref={headingRef}>Bagify</h1>
        <div className="preload-counter">
          <p ref={counterRef}>000</p>
        </div>
      </div>
    </div>
  );
}
