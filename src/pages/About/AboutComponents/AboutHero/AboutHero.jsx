import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLoaderComplete } from "../../../../hooks/useLoaderComplete.js";
import "./AboutHero.css";

export default function AboutHero() {
  const ref = useRef(null);
  const loaderReady = useLoaderComplete();

  useEffect(() => {
    if (!loaderReady) return undefined;
    const ctx = gsap.context(() => {
      gsap.from(".about-hero__line > span > span", {
        yPercent: 110,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.07,
        delay: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, [loaderReady]);

  const lines = ["A studio,", "not a travel desk."];
  return (
    <section ref={ref} className="about-hero">
      <div className="container">
        <p className="label about-hero__eyebrow">— About the studio</p>
        {lines.map((line, li) => (
          <h1 key={li} className={`about-hero__line ${li === 0 ? "about-hero__line--italic" : ""}`}>
            {line.split(/(\s+)/).map((w, i) =>
              /\s+/.test(w) ? <span key={i}>{w}</span> : (
                <span key={i} className="about-hero__word"><span>{w}</span></span>
              )
            )}
          </h1>
        ))}
      </div>
    </section>
  );
}
