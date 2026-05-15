import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { debounce, prefersReducedMotion } from "../../../../utils/performanceUtils.js";
import { useLoaderComplete } from "../../../../hooks/useLoaderComplete.js";
import "./JourneyHero.css";

gsap.registerPlugin(ScrollTrigger);

export default function JourneyHero() {
  const ref = useRef(null);
  const ledeRef = useRef(null);
  const loaderReady = useLoaderComplete();

  useEffect(() => {
    if (!loaderReady) return undefined;
    const reduced = prefersReducedMotion();
    let ledeSplit = null;
    let ledeTween = null;
    let ro = null;

    const ctx = gsap.context(() => {
      gsap.from(".jhero__line > span > span", {
        yPercent: 110,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.07,
        delay: 0.1,
      });
      gsap.from(".jhero__row > div", {
        opacity: 0,
        y: 20,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.65,
      });
    }, ref);

    const setupLedeLines = () => {
      ledeTween?.scrollTrigger?.kill();
      ledeTween?.kill();
      ledeSplit?.revert();
      ledeSplit = null;
      if (reduced || !ledeRef.current || !ref.current) return;

      ledeSplit = new SplitType(ledeRef.current, {
        types: "lines",
        lineClass: "jhero__lede-line",
        tagName: "span",
      });

      gsap.set(ledeSplit.lines, { yPercent: 100, opacity: 0.25 });

      ledeTween = gsap.to(ledeSplit.lines, {
        yPercent: 0,
        opacity: 1,
        ease: "none",
        stagger: 0.14,
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=48%",
          scrub: 0.55,
        },
      });
    };

    if (!reduced) {
      setupLedeLines();
      const onResize = debounce(() => {
        setupLedeLines();
        ScrollTrigger.refresh();
      }, 280);
      ro = new ResizeObserver(onResize);
      if (ref.current) ro.observe(ref.current);
    } else if (ledeRef.current) {
      gsap.from(ledeRef.current, {
        opacity: 0,
        y: 14,
        duration: 0.75,
        delay: 0.55,
        ease: "power2.out",
      });
    }

    return () => {
      ro?.disconnect();
      ledeTween?.scrollTrigger?.kill();
      ledeTween?.kill();
      ledeSplit?.revert();
      ctx.revert();
    };
  }, [loaderReady]);

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
          <p ref={ledeRef} className="jhero__lede">
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
