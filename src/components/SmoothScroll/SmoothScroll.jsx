import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function refreshLenisScroll(lenis) {
  if (!lenis) return;
  lenis.start();
  lenis.resize();
  ScrollTrigger.refresh();
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const { pathname } = useLocation();

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

    lenisRef.current = lenis;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

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
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onRefresh = () => refreshLenisScroll(lenisRef.current);
    window.addEventListener("lenis:refresh", onRefresh);
    window.addEventListener("loader:complete", onRefresh);
    return () => {
      window.removeEventListener("lenis:refresh", onRefresh);
      window.removeEventListener("loader:complete", onRefresh);
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    const syncRoute = () => {
      lenis.start();
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      lenis.scrollTo(0, { immediate: true, force: true });
      lenis.resize();
      ScrollTrigger.refresh();
    };

    syncRoute();
    const raf = requestAnimationFrame(() => syncRoute());
    const t1 = window.setTimeout(syncRoute, 120);
    const t2 = window.setTimeout(syncRoute, 400);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return children;
}
