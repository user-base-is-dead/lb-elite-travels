import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(scopeRef, selector = ".fade-up", options = {}) {
  useEffect(() => {
    const scope = scopeRef?.current || document;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(selector).forEach((el) => {
        gsap.from(el, {
          y: options.y ?? 40,
          opacity: 0,
          duration: options.duration ?? 1,
          ease: options.ease ?? "expo.out",
          scrollTrigger: {
            trigger: el,
            start: options.start ?? "top 88%",
            once: true,
          },
        });
      });
    }, scope);
    return () => ctx.revert();
  }, [scopeRef, selector, options.y, options.duration, options.ease, options.start]);
}

export function useClipReveal(scopeRef, selector = ".clip-reveal") {
  useEffect(() => {
    const scope = scopeRef?.current || document;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(selector).forEach((el) => {
        gsap.to(el, {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    }, scope);
    return () => ctx.revert();
  }, [scopeRef, selector]);
}
