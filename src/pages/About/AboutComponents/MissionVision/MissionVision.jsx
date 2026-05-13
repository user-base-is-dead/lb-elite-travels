import { useRef } from "react";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation.js";
import "./MissionVision.css";

const blocks = [
  { tag: "Mission", title: "Slow journeys, well met.", body: "We design India tours around fewer destinations and longer stays — so the best moments arrive uninvited." },
  { tag: "Vision", title: "One country, deeply known.", body: "We work in India only. Twelve years of relationships, route knowledge, and very small black books." },
  { tag: "Promise", title: "Every detail, hand-checked.", body: "Every guide local. Every hotel slept in. Every restaurant eaten in twice — once for the food, once for the welcome." },
];

export default function MissionVision() {
  const ref = useRef(null);
  useScrollAnimation(ref);
  return (
    <section ref={ref} className="mv">
      <div className="container">
        <p className="label mv__eyebrow">— What we stand for</p>
        <div className="mv__grid">
          {blocks.map((b, i) => (
            <article key={b.tag} className="mv__card fade-up">
              <p className="mv__num">{String(i + 1).padStart(2, "0")}</p>
              <p className="label mv__tag">{b.tag}</p>
              <h3 className="mv__title">{b.title}</h3>
              <p className="mv__body">{b.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
