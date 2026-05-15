import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLoaderComplete } from "../../../../hooks/useLoaderComplete.js";
import "./StatsCounter.css";

const stats = [
  { n: 500, label: "Journeys curated" },
  { n: 28, label: "States covered" },
  { n: 11, label: "Years on the road" },
];

export default function StatsCounter() {
  const ref = useRef(null);
  const loaderReady = useLoaderComplete();

  useEffect(() => {
    if (!loaderReady) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [loaderReady]);

  return (
    <section ref={ref} className="stats">
      <div className="container stats__inner">
        <div className="stats__intro">
          <p className="label stats__eyebrow">— Manifesto</p>
          <p className="stats__est">Est.<br />’14</p>
        </div>
        <div className="stats__body">
          <p className="stats__line">
            We don’t do continents. We do one. India is enough for a lifetime —
            its forts, its forests, its faiths, its food. We map the journey,
            you live it.
          </p>
          <div className="stats__grid">
            {stats.map((s) => (
              <div key={s.label} className="stats__cell">
                <p className="stats__num">
                  <span data-count={s.n}>0</span>
                  <span className="stats__plus">+</span>
                </p>
                <p className="label stats__label">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
