// src/components/PageTransition.jsx
// ─────────────────────────────────────────────
// Black curtain that slides bottom→top on route change.
// Used by both: leaving a page (play) and entering a page (reverse).
// Exported as a ref-forwarded component so App can trigger it.
// ─────────────────────────────────────────────
import { forwardRef, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";

CustomEase.create("hop2", "0.9,0,0.1,1");

const PageTransition = forwardRef(function PageTransition(_, ref) {
  const curtainRef = useRef(null);
  const headingRef = useRef(null);

  useImperativeHandle(ref, () => ({
    // Call this BEFORE navigating — curtain sweeps up, heading animates in
    enter(onMidpoint) {
      const tl = gsap.timeline();

      // 1. Curtain slides up from bottom covering screen
      tl.fromTo(
        curtainRef.current,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.85,
          ease: "hop2",
        },
      );

      // 2. Heading chars drop in
      tl.fromTo(
        ".pt-char",
        { y: "100%" },
        {
          y: "0%",
          duration: 0.7,
          ease: "hop2",
          stagger: { each: 0.09, from: "random" },
        },
        "-=0.3",
      );

      // 3. Fire navigation at midpoint
      tl.call(() => onMidpoint?.(), null, "+=0.2");

      return tl;
    },

    // Call this AFTER new page mounts — heading exits, curtain sweeps down
    leave() {
      const tl = gsap.timeline();

      // 1. Heading chars exit up
      tl.to(".pt-char", {
        y: "-100%",
        duration: 0.5,
        ease: "hop2",
        stagger: { each: 0.07, from: "random" },
      });

      // 2. Curtain sweeps down revealing new page
      tl.to(
        curtainRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.85,
          ease: "hop2",
        },
        "-=0.2",
      );

      return tl;
    },
  }));

  return (
    <div
      ref={curtainRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        backgroundColor: "#141414",
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Heading — same style as preloader */}
      <div
        ref={headingRef}
        style={{ overflow: "hidden", mixBlendMode: "difference" }}
      >
        <h1
          style={{
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontSize: "clamp(2rem, 12vw, 5rem)",
            textTransform: "uppercase",
            lineHeight: 0.85,
            color: "#fff",
            display: "flex",
          }}
        >
          {"Bagify".split("").map((char, i) => (
            <span
              key={i}
              className="pt-char"
              style={{
                display: "inline-block",
                transform: "translateY(100%)",
                willChange: "transform",
              }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
});

export default PageTransition;
