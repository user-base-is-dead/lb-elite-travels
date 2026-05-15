import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParticleField from "../../../../components/ParticleField/ParticleField.jsx";
import { useLoaderComplete } from "../../../../hooks/useLoaderComplete.js";
import "./HeroSection.css";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const headlineRef = useRef(null);
  const loaderReady = useLoaderComplete();

  useEffect(() => {
    if (!loaderReady) return undefined;
    const ctx = gsap.context(() => {
      if (imgRef.current) {
        gsap.to(imgRef.current, {
          yPercent: 18,
          scale: 1.15,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero__word > span");
        const leadText = headlineRef.current.querySelector(".hero__lead");
        
        const tl = gsap.timeline();
        
        tl.fromTo(words, 
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.05 }
        )
        .fromTo(leadText,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.8"
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [loaderReady]);

  return (
    <section ref={sectionRef} className="hero">
      <img
        ref={imgRef}
        className="hero__img"
        src="/images/hero-india.jpg"
        alt="A traveller before the Taj Mahal at dawn"
        fetchpriority="high"
        decoding="async"
      />
      <div className="hero__overlay" />
      <ParticleField density={window.innerWidth < 768 ? 20 : 40} color="#e8c07a" />

      <div className="hero__content container">
        <div className="hero__top">
          <p className="label">Est. 2014 · India</p>
          <p className="label hero__top-right">28 states. 8 union territories. <br/> One slow continent.</p>
        </div>

        <div ref={headlineRef}>
          <h1 className="hero__headline hero__headline--italic">
            {"Incredible India,".split(/(\s+)/).map((w, i) =>
              /\s+/.test(w) ? <span key={i}>{w}</span> : (
                <span key={i} className="hero__word"><span>{w}</span></span>
              )
            )}
          </h1>
          <h1 className="hero__headline">
            {"curated.".split(/(\s+)/).map((w, i) =>
              /\s+/.test(w) ? <span key={i}>{w}</span> : (
                <span key={i} className="hero__word"><span>{w}</span></span>
              )
            )}
          </h1>

          <div className="hero__bottom">
            <p className="hero__lead">
              A small studio of India natives crafting deeply researched, slow journeys —
              heritage, Himalayas, backwaters, wildlife.
            </p>
          </div>
        </div>
      </div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
