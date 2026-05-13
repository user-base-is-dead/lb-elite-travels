import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./JourneyHero.css";

export default function JourneyHero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".jhero__line > span > span", {
        yPercent: 110,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.07,
        delay: 0.1,
      });
      gsap.from(".jhero__meta > *", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.6,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const lines = ["Four chapters,", "one country."];
  return (
    <section ref={ref} className="jhero">
      <div className="container">
        <p className="label jhero__eyebrow">— The journey</p>

        {lines.map((line, li) => (
          <h1
            key={li}
            className={`jhero__line ${li === 1 ? "jhero__line--italic" : ""}`}
          >
            {line.split(/(\s+)/).map((w, i) =>
              /\s+/.test(w) ? (
                <span key={i}>{w}</span>
              ) : (
                <span key={i} className="jhero__word">
                  <span>{w}</span>
                </span>
              )
            )}
          </h1>
        ))}

        <div className="jhero__meta">
          <p className="jhero__lede">
            Heritage to Himalayas, backwaters to wild grass — four ways into the
            subcontinent, each shaped slowly and only for you.
          </p>
          <div className="jhero__row">
            <div>
              <p className="label jhero__tag">Where</p>
              <p className="jhero__val">India only</p>
            </div>
            <div>
              <p className="label jhero__tag">Pace</p>
              <p className="jhero__val">Slow, considered</p>
            </div>
            <div>
              <p className="label jhero__tag">Format</p>
              <p className="jhero__val">Private, bespoke</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
