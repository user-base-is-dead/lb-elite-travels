import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { debounce, prefersReducedMotion } from "../../../../utils/performanceUtils.js";
import { useLoaderComplete } from "../../../../hooks/useLoaderComplete.js";
import "./JourneyChapter.css";

gsap.registerPlugin(ScrollTrigger);

export default function JourneyChapter({ dest, reverse = false }) {
  const ref = useRef(null);
  const titleRef = useRef(null);
  const blurbRef = useRef(null);
  const loaderReady = useLoaderComplete();

  useEffect(() => {
    if (!loaderReady) return undefined;
    const reduced = prefersReducedMotion();
    let titleSplit = null;
    let blurbSplit = null;
    const tweens = [];
    let ro = null;

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
      gsap.from(".chapter__sub", {
        opacity: 0,
        y: 20,
        duration: 0.75,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });
    }, ref);

    if (reduced) {
      let twReduce = null;
      if (titleRef.current && blurbRef.current && ref.current) {
        twReduce = gsap.from([titleRef.current, blurbRef.current], {
          opacity: 0,
          y: 24,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
        });
      }
      return () => {
        twReduce?.scrollTrigger?.kill();
        twReduce?.kill();
        ctx.revert();
      };
    }

    const setupCopy = () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      tweens.length = 0;
      titleSplit?.revert();
      blurbSplit?.revert();
      titleSplit = null;
      blurbSplit = null;

      if (!ref.current || !titleRef.current || !blurbRef.current) return;

      titleSplit = new SplitType(titleRef.current, {
        types: "words",
        wordClass: "chapter__title-word",
        tagName: "span",
      });

      blurbSplit = new SplitType(blurbRef.current, {
        types: "lines",
        lineClass: "chapter__blurb-line",
        tagName: "span",
      });

      gsap.set(titleSplit.words, { yPercent: 118, opacity: 0.85 });
      const twTitle = gsap.to(titleSplit.words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.95,
        stagger: 0.06,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true },
      });

      gsap.set(blurbSplit.lines, { yPercent: 100, opacity: 0.35 });
      const twBlurb = gsap.to(blurbSplit.lines, {
        yPercent: 0,
        opacity: 1,
        duration: 0.82,
        stagger: 0.075,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
      });

      tweens.push(twTitle, twBlurb);
    };

    setupCopy();

    const onResize = debounce(() => {
      setupCopy();
      ScrollTrigger.refresh();
    }, 280);
    ro = new ResizeObserver(onResize);
    if (ref.current) ro.observe(ref.current);

    return () => {
      ro?.disconnect();
      tweens.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      titleSplit?.revert();
      blurbSplit?.revert();
      ctx.revert();
    };
  }, [dest.slug, loaderReady]);

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
          <h2 ref={titleRef} className="chapter__title">
            {dest.title}
          </h2>
          <p ref={blurbRef} className="chapter__blurb">
            {dest.blurb}
          </p>

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
