import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useClipReveal } from "../../../../hooks/useScrollAnimation.js";
import "./FeaturedDestinations.css";

const featured = [
  { img: "/images/journey-varanasi.jpg", label: "Varanasi · Sunrise on the Ganges", tall: true },
  { img: "/images/journey-spiti.jpg", label: "Spiti · The cold desert", tall: false },
  { img: "/images/journey-jaisalmer.jpg", label: "Jaisalmer · Golden fort", tall: false },
  { img: "/images/journey-andaman.jpg", label: "Havelock · Andaman waters", tall: true },
];

export default function FeaturedDestinations() {
  const ref = useRef(null);
  useClipReveal(ref);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".feat__head .fade-up").forEach((el) =>
        gsap.from(el, { y: 30, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } })
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="feat">
      <div className="container">
        <div className="feat__head">
          <div className="fade-up">
            <p className="label feat__eyebrow">— Signature journeys</p>
            <h2 className="feat__title">
              Stories <em className="italic" style={{ color: "var(--color-copper)" }}>we love</em> to tell.
            </h2>
          </div>
          <Link to="/journey" className="label feat__link">View all <span aria-hidden>→</span></Link>
        </div>

        <div className="feat__grid">
          {featured.map((j, i) => (
            <figure key={i} className={`feat__card ${j.tall ? "feat__card--tall" : ""}`}>
              <img src={j.img} alt={j.label} loading="lazy" className="clip-reveal feat__img" />
              <figcaption className="label feat__caption">{j.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
