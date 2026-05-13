import { useRef } from "react";
import { useScrollAnimation } from "../../../../hooks/useScrollAnimation.js";
import "./TeamSection.css";

const team = [
  { name: "Lakshmi Bhatt", role: "Founder · Trip Architect", initials: "LB" },
  { name: "Arjun Mehra", role: "Himalayan routes", initials: "AM" },
  { name: "Priya Iyer", role: "South India lead", initials: "PI" },
  { name: "Vikram Singh", role: "Wildlife & safari", initials: "VS" },
];

export default function TeamSection() {
  const ref = useRef(null);
  useScrollAnimation(ref);
  return (
    <section ref={ref} className="team">
      <div className="container">
        <p className="label team__eyebrow">— The studio</p>
        <h2 className="team__title fade-up">A small team. <em className="italic" style={{ color: "var(--color-copper)" }}>Same idea since day one.</em></h2>
        <div className="team__grid">
          {team.map((m) => (
            <figure key={m.name} className="team__card fade-up">
              <div className="team__avatar"><span>{m.initials}</span></div>
              <figcaption>
                <p className="team__name">{m.name}</p>
                <p className="team__role">{m.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
