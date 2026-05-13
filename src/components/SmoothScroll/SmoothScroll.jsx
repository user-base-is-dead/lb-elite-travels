import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    const lenis = new Lenis({
      duration: isTouch ? 1.0 : 1.4,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -11 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: isTouch ? 1.8 : 1.4,
      lerp: isTouch ? 0.14 : 0.1,
      syncTouch: true,
      syncTouchLerp: isTouch ? 0.1 : 0.075,
      gestureOrientation: "vertical",
      orientation: "vertical",
      autoResize: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onLock = () => lenis.stop();
    const onUnlock = () => lenis.start();
    window.addEventListener("lenis:stop", onLock);
    window.addEventListener("lenis:start", onUnlock);

    return () => {
      window.removeEventListener("lenis:stop", onLock);
      window.removeEventListener("lenis:start", onUnlock);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
  return children;
}
