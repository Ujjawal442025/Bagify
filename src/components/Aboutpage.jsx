// src/components/AboutPage.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage({ transitionRef }) {
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    transitionRef.current?.leave();

    // Header animate
    gsap.set(headerRef.current, { y: 60, opacity: 0 });
    gsap.to(headerRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      delay: 1.0,
    });

    // Each section scrolltrigger
    sectionsRef.current.forEach((el) => {
      if (!el) return;
      gsap.set(el, { y: 60, opacity: 0 });
      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const addSection = (el) => {
    if (el && !sectionsRef.current.includes(el)) sectionsRef.current.push(el);
  };

  const goToHome = (e) => {
    e.preventDefault();
    transitionRef.current?.enter(() =>
      navigate("/", { state: { skipPreloader: true } }),
    );
    setTimeout(() => transitionRef.current?.leave(), 1100);
  };

  return (
    <div style={{ backgroundColor: "var(--base-200)", minHeight: "100vh" }}>
      {/* ── HERO HEADER — full width ── */}
      <div
        ref={headerRef}
        style={{
          width: "100%",
          paddingTop: "10rem",
          paddingBottom: "4rem",
          paddingLeft: "4rem",
          paddingRight: "4rem",
          borderBottom: "1px solid rgba(20,20,20,0.1)",
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontSize: "1rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            opacity: 0.4,
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          Est. 2026 — New Delhi, India
        </p>

        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(4rem, 12vw, 14rem)",
            fontWeight: 800,
            textTransform: "uppercase",
            lineHeight: 0.88,
            letterSpacing: "-4px",
            color: "var(--base-300)",
          }}
        >
          About Bagify
        </h1>
      </div>

      {/* ── SECTION 1: Who we are ── */}
      <div
        ref={addSection}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem",
          padding: "6rem 4rem",
          borderBottom: "1px solid rgba(20,20,20,0.1)",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              opacity: 0.35,
              textTransform: "uppercase",
              marginBottom: "2rem",
            }}
          >
            01 — Who We Are
          </p>
          <h2
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(2rem, 4vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              textTransform: "uppercase",
            }}
          >
            Designed to
            <br />
            carry your
            <br />
            whole world.
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            gap: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              lineHeight: 1.7,
              opacity: 0.7,
            }}
          >
            Bagify was born out of a simple frustration — bags that looked good
            never worked well, and bags that worked well never looked good. We
            decided to fix that.
          </p>
          <p
            style={{
              fontFamily: "'PP Neue Montreal', sans-serif",
              fontSize: "1.4rem",
              lineHeight: 1.7,
              opacity: 0.7,
            }}
          >
            Founded by Ujjawal Kumar Jha in New Delhi, Bagify is a one-person
            studio obsessed with the intersection of utility and restraint.
            Every bag is designed to disappear into your life — not compete with
            it.
          </p>
        </div>
      </div>

      {/* ── SECTION 2: Big quote ── */}
      <div
        ref={addSection}
        style={{
          padding: "8rem 4rem",
          borderBottom: "1px solid rgba(20,20,20,0.1)",
        }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(2rem, 5vw, 6rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-3px",
            maxWidth: "1100px",
          }}
        >
          "We don't make statement pieces. We make pieces that let you make the
          statement."
        </p>
        <p
          style={{
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontSize: "1.1rem",
            opacity: 0.4,
            marginTop: "2rem",
            letterSpacing: "0.05em",
          }}
        >
          — Ujjawal Kumar Jha, Founder
        </p>
      </div>

      {/* ── SECTION 3: Values — 3 columns ── */}
      <div
        ref={addSection}
        style={{
          padding: "6rem 4rem",
          borderBottom: "1px solid rgba(20,20,20,0.1)",
        }}
      >
        <p
          style={{
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            opacity: 0.35,
            textTransform: "uppercase",
            marginBottom: "4rem",
          }}
        >
          02 — What We Stand For
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "3rem",
          }}
        >
          {[
            {
              num: "I",
              title: "Restraint",
              body: "We remove everything that doesn't need to be there. What's left is exactly what you need — no more, no less.",
            },
            {
              num: "II",
              title: "Durability",
              body: "A Bagify bag is meant to outlast trends, seasons, and the occasional monsoon. We use materials that age better than they start.",
            },
            {
              num: "III",
              title: "Honesty",
              body: "No inflated price tags, no fake collaborations. Just well-made bags sold at prices that make sense.",
            },
          ].map((v) => (
            <div
              key={v.num}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "3.5rem",
                  fontWeight: 800,
                  opacity: 0.08,
                  lineHeight: 1,
                }}
              >
                {v.num}
              </p>
              <div
                style={{
                  height: "1px",
                  backgroundColor: "var(--base-300)",
                  opacity: 0.15,
                }}
              />
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "-0.5px",
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  fontFamily: "'PP Neue Montreal', sans-serif",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  opacity: 0.6,
                }}
              >
                {v.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 4: Numbers ── */}
      <div
        ref={addSection}
        style={{
          padding: "6rem 4rem",
          borderBottom: "1px solid rgba(20,20,20,0.1)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "2rem",
        }}
      >
        {[
          { num: "10+", label: "Bags designed" },
          { num: "100%", label: "Made with intent" },
          { num: "01", label: "Designer" },
          { num: "∞", label: "Obsession with craft" },
        ].map((s) => (
          <div
            key={s.label}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(3rem, 5vw, 6rem)",
                fontWeight: 800,
                letterSpacing: "-3px",
                lineHeight: 1,
              }}
            >
              {s.num}
            </p>
            <p
              style={{
                fontFamily: "'PP Neue Montreal', sans-serif",
                fontSize: "1rem",
                opacity: 0.45,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── SECTION 5: Process ── */}
      <div
        ref={addSection}
        style={{
          padding: "6rem 4rem",
          borderBottom: "1px solid rgba(20,20,20,0.1)",
        }}
      >
        <p
          style={{
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontSize: "1rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            opacity: 0.35,
            textTransform: "uppercase",
            marginBottom: "4rem",
          }}
        >
          03 — How We Work
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            {
              step: "01",
              title: "Sketch",
              desc: "Every bag starts on paper. We sketch until the proportions feel right, then sketch some more.",
            },
            {
              step: "02",
              title: "Material",
              desc: "We source materials that earn their place. If it can't handle daily use, it doesn't make the cut.",
            },
            {
              step: "03",
              title: "Prototype",
              desc: "We build, carry, break, and rebuild. A bag goes through multiple prototypes before it's worth selling.",
            },
            {
              step: "04",
              title: "Release",
              desc: "When it's ready — not when the calendar says so — we release it.",
            },
          ].map((p, i, arr) => (
            <div
              key={p.step}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr",
                gap: "2rem",
                alignItems: "center",
                padding: "2.5rem 0",
                borderBottom:
                  i < arr.length - 1 ? "1px solid rgba(20,20,20,0.08)" : "none",
              }}
            >
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  opacity: 0.25,
                  letterSpacing: "0.1em",
                }}
              >
                {p.step}
              </p>
              <h3
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "2.2rem",
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "-1px",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  fontFamily: "'PP Neue Montreal', sans-serif",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  opacity: 0.6,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 6: CTA ── */}
      <div
        ref={addSection}
        style={{
          padding: "8rem 4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <h2
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(3rem, 7vw, 9rem)",
            fontWeight: 800,
            textTransform: "uppercase",
            lineHeight: 0.9,
            letterSpacing: "-4px",
            maxWidth: "800px",
          }}
        >
          Ready to carry something better?
        </h2>

        <button
          onClick={goToHome}
          style={{
            padding: "1.25rem 3rem",
            backgroundColor: "var(--base-300)",
            color: "var(--base-100)",
            border: "none",
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontSize: "1.1rem",
            fontWeight: 600,
            cursor: "pointer",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            alignSelf: "flex-end",
          }}
        >
          Shop Now <i className="ri-arrow-right-up-line" />
        </button>
      </div>

      <Footer />
    </div>
  );
}
