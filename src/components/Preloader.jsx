import { useLayoutEffect, useRef } from "react";
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
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const runAnimation = () => {
      const ctx = gsap.context(() => {
        // hide heading first
        gsap.set(headingRef.current, { visibility: "hidden" });

        const split = SplitText.create(headingRef.current, {
          type: "chars",
          charClass: "char",
        });

        gsap.set(split.chars, { y: "100%" });
        gsap.set(headingRef.current, { visibility: "visible" });

        gsap.set(".preloader-img", {
          rotate: (i) => INIT_ROTATIONS[i],
        });

        const tl = gsap.timeline({ delay: 0.2 });

        tl.to(".preloader-img", {
          scale: 1,
          clipPath: "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
          duration: 1,
          ease: "power2.out",
          stagger: 0.15,
        });

        tl.to(
          split.chars,
          {
            y: "0%",
            duration: 1,
            ease: "power3.out",
            stagger: 0.08,
          },
          0.3,
        );

        tl.to(
          counterRef.current,
          {
            y: "0%",
            onStart: () => {
              const obj = { v: 0 };
              gsap.to(obj, {
                v: 100,
                duration: 2,
                onUpdate: () => {
                  counterRef.current.textContent = String(
                    Math.round(obj.v),
                  ).padStart(3, "0");
                },
              });
            },
          },
          "<",
        );

        tl.to(counterRef.current, {
          y: "-100%",
          duration: 0.6,
        });

        tl.to(
          split.chars,
          {
            y: "-100%",
            duration: 0.7,
            stagger: 0.05,
          },
          "-=0.3",
        );

        tl.to(".preloader-img", {
          scale: 0,
          duration: 0.6,
          stagger: 0.05,
        });

        tl.to(preloaderRef.current, {
          clipPath: "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
          duration: 0.8,
        });

        tl.call(() => {
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          onComplete?.();
        });
      }, preloaderRef);

      return () => ctx.revert();
    };

    // 🔥 IMPORTANT: wait for images first
    preloadImages(IMAGES).then(() => {
      runAnimation();
    });
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader-images">
        {IMAGES.map((src, i) => (
          <div className="preloader-img" key={i}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>

      <div className="preload-header">
        <h1 ref={headingRef}>Bagify</h1>
        <div className="preload-counter">
          <p ref={counterRef}>000</p>
        </div>
      </div>
    </div>
  );
}
