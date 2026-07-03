// src/components/Products.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import bag1 from "../assets/bag1.jpg";
import bag2 from "../assets/bag2.jpg";
import bag3 from "../assets/bag3.jpg";
import bag4 from "../assets/bag4.jpg";
import bag5 from "../assets/bag5.jpg";
import bag6 from "../assets/bag6.jpg";
import bag7 from "../assets/bag7.png";
import bag8 from "../assets/bag8.png";
import bag9 from "../assets/bag9.jpg";
import bag10 from "../assets/bag10.jpg";
import bag11 from "../assets/bag11.jpg";
import bag22 from "../assets/bag22.jpg";
import bag33 from "../assets/bag33.jpg";
import bag44 from "../assets/bag44.jpg";
import bag55 from "../assets/bag55.jpg";
import bag66 from "../assets/bag66.jpg";
import bag77 from "../assets/bag77.jpg";
import bag88 from "../assets/bag88.jpg";
const ROW1 = [
  {
    id: "soft-motion",
    primary: bag1,
    hover: bag11,
    name: "Soft Motion",
    price: "$36.50",
  },
  {
    id: "metro-carry",
    primary: bag2,
    hover: bag22,
    name: "Metro Carry",
    price: "$25.50",
  },
  {
    id: "modern-nomad",
    primary: bag3,
    hover: bag33,
    name: "Modern Nomad",
    price: "$30.00",
  },
  {
    id: "daily-form",
    primary: bag4,
    hover: bag44,
    name: "Daily Form",
    price: "$30.50",
  },
];

const ROW2_LEFT = [
  {
    id: "daily-form",
    primary: bag5,
    hover: bag55,
    name: "Daily Form",
    price: "$30.50",
    imgClass: "img1",
  },
  {
    id: "daily-form",
    primary: bag6,
    hover: bag66,
    name: "Daily Form",
    price: "$30.50",
    imgClass: "img2",
  },
];

const ROW2_RIGHT = [
  {
    id: "daily-form",
    primary: bag7,
    hover: bag77,
    name: "Daily Form",
    price: "$30.50",
    imgClass: "img3",
  },
];

const ROW3_LEFT = [
  {
    id: "daily-form",
    primary: bag8,
    hover: bag88,
    name: "Daily Form",
    price: "$30.50",
    imgClass: "img3",
  },
];

const ROW3_RIGHT = [
  {
    id: "daily-form",
    primary: bag9,
    hover: bag22,
    name: "Daily Form",
    price: "$30.50",
    imgClass: "img2",
  },
  {
    id: "daily-form",
    primary: bag10,
    hover: bag66,
    name: "Daily Form",
    price: "$30.50",
    imgClass: "img1",
  },
];

function ProductCard({
  id,
  primary,
  hover,
  name,
  price,
  imgClass = "",
  isRow = false,
  isLast = false,
  transitionRef,
}) {
  const imageRef = useRef(null);
  const primaryRef = useRef(null);
  const hoverRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const imageEl = imageRef.current;
    const primaryEl = primaryRef.current;
    const hoverEl = hoverRef.current;
    if (!imageEl) return;

    const onEnter = () => {
      gsap.to(primaryEl, { x: "100%", duration: 0.7, ease: "power3.out" });
      gsap.to(hoverEl, { x: "0%", duration: 0.7, ease: "power3.out" });
      gsap.to(".cursor", { scale: 8, duration: 0.3, ease: "power1.out" });
    };
    const onLeave = () => {
      gsap.to(primaryEl, { x: "0%", duration: 0.7, ease: "power3.out" });
      gsap.to(hoverEl, { x: "-100%", duration: 0.7, ease: "power3.out" });
      gsap.to(".cursor", { scale: 1, duration: 0.3, ease: "power1.out" });
    };

    imageEl.addEventListener("mouseenter", onEnter);
    imageEl.addEventListener("mouseleave", onLeave);
    return () => {
      imageEl.removeEventListener("mouseenter", onEnter);
      imageEl.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleClick = () => {
    // Reset hover state first
    gsap.to(primaryRef.current, { x: "0%", duration: 0.3 });
    gsap.to(hoverRef.current, { x: "-100%", duration: 0.3 });
    gsap.to(".cursor", { scale: 1, duration: 0.2 });

    // Curtain enters → navigate at midpoint → curtain leaves on new page
    transitionRef.current?.enter(() => {
      navigate(`/product/${id}`);
    });
  };

  const detailClass = [
    "product-detail",
    isRow ? "row" : "",
    isLast ? "lastd" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={detailClass}
      style={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <div className={`image ${imgClass}`} ref={imageRef}>
        <div className="img-reveal">
          <img
            className="img-primary"
            src={primary}
            alt={name}
            ref={primaryRef}
          />
          <img className="img-hover" src={hover} alt="" ref={hoverRef} />
        </div>
      </div>
      <div className="product-name">
        <p>{name}</p>
        <p>
          <span>{price}</span>
        </p>
      </div>
      <div className="product-color">• APPAREL</div>
    </div>
  );
}

export default function Products({ transitionRef }) {
  return (
    <section className="product-wrap">
      <section className="product-container">
        <div className="image-container1">
          {ROW1.map((p) => (
            <ProductCard
              key={p.id + p.primary}
              {...p}
              transitionRef={transitionRef}
            />
          ))}
        </div>

        <div className="product-image2">
          <div className="wrap">
            {ROW2_LEFT.map((p, i) => (
              <ProductCard key={i} {...p} isRow transitionRef={transitionRef} />
            ))}
          </div>
          {ROW2_RIGHT.map((p, i) => (
            <ProductCard key={i} {...p} isRow transitionRef={transitionRef} />
          ))}
        </div>

        <div className="product-image2">
          {ROW3_LEFT.map((p, i) => (
            <ProductCard key={i} {...p} isRow transitionRef={transitionRef} />
          ))}
          <div className="wrap last">
            {ROW3_RIGHT.map((p, i) => (
              <ProductCard
                key={i}
                {...p}
                isRow
                isLast
                transitionRef={transitionRef}
              />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
