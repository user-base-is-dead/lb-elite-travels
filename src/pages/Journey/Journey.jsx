import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import JourneyHero from "./JourneyComponents/JourneyHero/JourneyHero.jsx";
import JourneyChapter from "./JourneyComponents/JourneyChapter/JourneyChapter.jsx";
import { destinations } from "../../data/destinations.js";
import { useScrollAnimation } from "../../hooks/useScrollAnimation.js";
import { useLoaderComplete } from "../../hooks/useLoaderComplete.js";
import "./Journey.css";

export default function Journey() {
  const ref = useRef(null);
  const loaderReady = useLoaderComplete();
  useScrollAnimation(ref);

  useEffect(() => {
    if (!loaderReady) return undefined;
    const notify = () => window.dispatchEvent(new CustomEvent("lenis:refresh"));
    notify();
    const rafId = requestAnimationFrame(() => notify());

    const root = ref.current;
    const imgs = root ? Array.from(root.querySelectorAll("img")) : [];
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", notify);
    });

    return () => {
      cancelAnimationFrame(rafId);
      imgs.forEach((img) => img.removeEventListener("load", notify));
    };
  }, [loaderReady]);

  return (
    <div ref={ref} className="journey page">
      <JourneyHero />

      <section className="journey__chapters">
        {destinations.map((d, i) => (
          <JourneyChapter key={d.slug} dest={d} reverse={i % 2 === 1} />
        ))}
      </section>

      <section className="journey__outro">
        <div className="container journey__outro-inner">
          <p className="label journey__outro-eyebrow">— Begin</p>
          <h2 className="journey__outro-title">
            None of these are <em className="italic">finished</em>.
          </h2>
          <p className="journey__outro-body">
            Every itinerary above is a starting line, not a script. Tell us how you travel —
            we&rsquo;ll redraw the map around you.
          </p>
          <Link to="/contact" className="journey__outro-cta label">
            Plan a journey <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
