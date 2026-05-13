import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { isTouchDevice } from "../../utils/performanceUtils.js";
import "./CustomCursor.css";

function shouldHideCursor() {
  if (typeof window === "undefined") return true;
  if (isTouchDevice()) return true;
  if (window.matchMedia("(hover: none)").matches) return true;
  if (window.innerWidth < 900) return true;
  return false;
}

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hidden, setHidden] = useState(() => shouldHideCursor());

  useEffect(() => {
    const update = () => setHidden(shouldHideCursor());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (hidden) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const xTo = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const grow = () => ring.classList.add("is-hover");
    const shrink = () => ring.classList.remove("is-hover");

    window.addEventListener("mousemove", onMove);
    const interactive = document.querySelectorAll("a, button, input, textarea, select");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, [hidden]);

  if (hidden) return null;

  return (
    <>
      <div ref={ringRef} className="cursor cursor--ring" />
      <div ref={dotRef} className="cursor cursor--dot" />
    </>
  );
}
