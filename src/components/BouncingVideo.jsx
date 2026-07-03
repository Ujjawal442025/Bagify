import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./BouncingVideo.css";

const gifs = ["/video2.gif", "/video3.gif", "/video4.gif"];

export default function BouncingVideo() {
  const circleRef = useRef(null);

  const [index, setIndex] = useState(0);

  const position = useRef({
    x: 150,
    y: 120,
  });

  const velocity = useRef({
    x: 2.5,
    y: 2,
  });

  const SIZE = 260;

  // Bounce Animation
  useEffect(() => {
    const tick = () => {
      const p = position.current;
      const v = velocity.current;

      p.x += v.x;
      p.y += v.y;

      // Left Wall
      if (p.x <= 0) {
        p.x = 0;
        v.x *= -1;

        gsap.fromTo(
          circleRef.current,
          { scaleX: 1.12, scaleY: 0.9 },
          {
            scaleX: 1,
            scaleY: 1,
            duration: 0.25,
            overwrite: true,
          },
        );
      }

      // Right Wall
      if (p.x >= window.innerWidth - SIZE) {
        p.x = window.innerWidth - SIZE;
        v.x *= -1;

        gsap.fromTo(
          circleRef.current,
          { scaleX: 1.12, scaleY: 0.9 },
          {
            scaleX: 1,
            scaleY: 1,
            duration: 0.25,
            overwrite: true,
          },
        );
      }

      // Top Wall
      if (p.y <= 0) {
        p.y = 0;
        v.y *= -1;

        gsap.fromTo(
          circleRef.current,
          { scaleX: 0.9, scaleY: 1.12 },
          {
            scaleX: 1,
            scaleY: 1,
            duration: 0.25,
            overwrite: true,
          },
        );
      }

      // Bottom Wall
      if (p.y >= window.innerHeight - SIZE) {
        p.y = window.innerHeight - SIZE;
        v.y *= -1;

        gsap.fromTo(
          circleRef.current,
          { scaleX: 0.9, scaleY: 1.12 },
          {
            scaleX: 1,
            scaleY: 1,
            duration: 0.25,
            overwrite: true,
          },
        );
      }

      gsap.set(circleRef.current, {
        x: p.x,
        y: p.y,
      });
    };

    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
    };
  }, []);

  // Change GIF every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % gifs.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bouncing-video" ref={circleRef}>
      <img src={gifs[index]} alt="gif" draggable={false} />
    </div>
  );
}
