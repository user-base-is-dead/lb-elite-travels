import { useRef } from "react";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation.js";
import "./WhyChooseUs.css";

const reasons = [
  { n: "01", title: "Local, always", body: "Every guide, driver, and host is from the region you’re visiting. Nothing parachuted in." },
  { n: "02", title: "Slower than slow", body: "We add fewer destinations, longer stays, and built-in nothing-days. The best moments aren’t scheduled." },
  { n: "03", title: "One country", body: "We work in India only. Twelve years of relationships, route knowledge and very small black books." },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  useScrollAnimation(ref);

  return (
    <section ref={ref} className="why">
      <div className="container">
        <p className="label why__eyebrow">— Why choose us</p>
        <h2 className="why__title fade-up">
          Crafted by hand, <em className="italic" style={{ color: "var(--color-gold)" }}>not by template.</em>
        </h2>
        <div className="why__grid">
          {reasons.map((r) => (
            <div key={r.n} className="why__card fade-up">
              <p className="why__num">{r.n}</p>
              <h3 className="why__cardTitle">{r.title}</h3>
              <p className="why__body">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
