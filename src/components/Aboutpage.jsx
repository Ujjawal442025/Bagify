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
    <div className="about-page">
      {/* ── HERO HEADER — full width ── */}
      <div ref={headerRef} className="about-header">
        <p className="about-header-meta">Est. 2026 — New Delhi, India</p>
        <h1 className="about-header-title">About Bagify</h1>
      </div>

      {/* ── SECTION 1: Who we are ── */}
      <div ref={addSection} className="about-section-grid">
        <div>
          <p className="about-section-label">01 — Who We Are</p>
          <h2 className="about-section-title">
            Designed to
            <br />
            carry your
            <br />
            whole world.
          </h2>
        </div>
        <div className="about-desc-col">
          <p className="about-desc-p">
            Bagify was born out of a simple frustration — bags that looked good
            never worked well, and bags that worked well never looked good. We
            decided to fix that.
          </p>
          <p className="about-desc-p">
            Founded by Ujjawal Kumar Jha in New Delhi, Bagify is a one-person
            studio obsessed with the intersection of utility and restraint.
            Every bag is designed to disappear into your life — not compete with
            it.
          </p>
        </div>
      </div>

      {/* ── SECTION 2: Big quote ── */}
      <div ref={addSection} className="about-quote-section">
        <p className="about-quote-text">
          "We don't make statement pieces. We make pieces that let you make the
          statement."
        </p>
        <p className="about-quote-author">— Ujjawal Kumar Jha, Founder</p>
      </div>

      {/* ── SECTION 3: Values — 3 columns ── */}
      <div ref={addSection} className="about-values-section">
        <p className="about-values-label">02 — What We Stand For</p>

        <div className="about-values-grid">
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
            <div key={v.num} className="about-value-card">
              <p className="about-value-num">{v.num}</p>
              <div className="about-value-divider" />
              <h3 className="about-value-title">{v.title}</h3>
              <p className="about-value-body">{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 4: Numbers ── */}
      <div ref={addSection} className="about-stats-grid">
        {[
          { num: "10+", label: "Bags designed" },
          { num: "100%", label: "Made with intent" },
          { num: "01", label: "Designer" },
          { num: "∞", label: "Obsession with craft" },
        ].map((s) => (
          <div key={s.label} className="about-stat-card">
            <p className="about-stat-num">{s.num}</p>
            <p className="about-stat-label">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ── SECTION 5: Process ── */}
      <div ref={addSection} className="about-process-section">
        <p className="about-values-label">03 — How We Work</p>

        <div className="about-process-container">
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
              className={`about-process-row ${
                i < arr.length - 1 ? "bordered" : ""
              }`}
            >
              <p className="about-process-step">{p.step}</p>
              <h3 className="about-process-title">{p.title}</h3>
              <p className="about-process-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 6: CTA ── */}
      <div ref={addSection} className="about-cta-section">
        <h2 className="about-cta-title">Ready to carry something better?</h2>

        <button onClick={goToHome} className="about-cta-btn">
          Shop Now <i className="ri-arrow-right-up-line" />
        </button>
      </div>

      <Footer />
    </div>
  );
}
