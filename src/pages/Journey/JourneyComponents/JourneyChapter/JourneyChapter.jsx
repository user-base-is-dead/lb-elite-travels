import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./JourneyChapter.css";

gsap.registerPlugin(ScrollTrigger);

export default function JourneyChapter({ dest, reverse = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".chapter__img", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.from(".chapter__num", {
        opacity: 0,
        x: -30,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
      gsap.from(".chapter__title, .chapter__sub, .chapter__blurb", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <article
      ref={ref}
      className={`chapter ${reverse ? "chapter--reverse" : ""}`}
    >
      <div className="container chapter__inner">
        <div className="chapter__visual">
          <div className="chapter__img-wrap">
            <img className="chapter__img" src={dest.image} alt={dest.title} loading="lazy" />
          </div>
          <p className="label chapter__region">{dest.region}</p>
        </div>

        <div className="chapter__copy">
          <p className="chapter__num">{dest.number}</p>
          <p className="label chapter__sub">{dest.subtitle}</p>
          <h2 className="chapter__title">{dest.title}</h2>
          <p className="chapter__blurb">{dest.blurb}</p>

          <div className="chapter__meta">
            <div>
              <p className="label chapter__metaLabel">Length</p>
              <p className="chapter__metaVal">{dest.duration}</p>
            </div>
            <div>
              <p className="label chapter__metaLabel">Style</p>
              <p className="chapter__metaVal">{dest.category}</p>
            </div>
          </div>

          <ul className="chapter__highlights">
            {dest.highlights.map((h, i) => (
              <li key={i}>
                <span className="chapter__bullet">✦</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
