import { useRef } from "react";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation.js";
import "./Testimonials.css";

const items = [
  {
    quote:
      "They didn’t plan our trip. They composed it. Every dawn was already waiting for us — the boat in Varanasi, the tea in Munnar, the silence in Spiti.",
    author: "Ananya & Rohan",
    meta: "Heritage + Himalayas, 2025",
  },
  {
    quote:
      "Three weeks across Rajasthan and the south. Not a single dull hour. Our guide felt like family by day two.",
    author: "Marco & Lucia",
    meta: "Heritage + Beaches, 2024",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  useScrollAnimation(ref);

  return (
    <section ref={ref} className="testimonials">
      <div className="container">
        <p className="label testimonials__eyebrow fade-up">— Travellers say</p>
        <div className="testimonials__list">
          {items.map((t, i) => (
            <blockquote key={i} className="testimonials__item fade-up">
              <p className="testimonials__quote">“{t.quote}”</p>
              <footer className="testimonials__footer">
                <span className="label">— {t.author}</span>
                <span className="testimonials__meta">{t.meta}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
