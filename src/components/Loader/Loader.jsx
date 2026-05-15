import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Loader.css";

export default function Loader() {
  const [pct, setPct] = useState(0);
  const [introDone, setIntroDone] = useState(false);
  const brandRef = useRef(null);
  const titleRef = useRef(null);
  const barRef = useRef(null);
  const pctRef = useRef(null);
  const innerRef = useRef(null);
  const loaderRef = useRef(null);


  useEffect(() => {
    // Stop scroll while loading
    window.dispatchEvent(new Event("lenis:stop"));
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => setIntroDone(true)
    });
    tl.fromTo(brandRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.9 }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 40, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.1 },
      "-=0.5"
    )
    .fromTo([barRef.current, pctRef.current],
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
      "-=0.6"
    );
  }, []);


  useEffect(() => {
    if (!introDone) return;

    let raf;
    let currentPct = 0;
    let targetPct = 0;
    let isReady = document.readyState === "complete";
    let phase = 0;
    let lerpFactor = 0.005;

    const checkpoints = [
      { pct: 15, delay: 500 },
      { pct: 40, delay: 400 },
      { pct: 75, delay: 800 },
      { pct: 96, delay: 1200 }
    ];
    let timeoutId;

    const runFakeProgress = () => {
      if (isReady) return;
      if (phase < checkpoints.length) {
        targetPct = checkpoints[phase].pct;
        timeoutId = setTimeout(() => {
          phase++;
          runFakeProgress();
        }, checkpoints[phase].delay);
      }
    };

    timeoutId = setTimeout(() => {
      if (!isReady) runFakeProgress();
    }, 300);

    const triggerExit = () => {
      const tl = gsap.timeline({
        onStart: () => {
          window.dispatchEvent(new Event("loader:exit"));
        },
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = "none";
          window.dispatchEvent(new Event("lenis:start"));
          document.body.style.overflow = "";
          window.__LB_LOADER_COMPLETE__ = true;
          window.dispatchEvent(new Event("loader:complete"));
        }
      });

      tl.to(innerRef.current, {
        opacity: 0,
        y: -40,
        duration: 0.6,
        ease: "power3.in"
      });

      tl.to(loaderRef.current, {
        y: "100%",
        rotateX: 10,
        duration: 1.4,
        ease: "expo.inOut"
      }, "-=0.3");
    };

    const onComplete = () => {
      isReady = true;
      targetPct = 100;
      clearTimeout(timeoutId);
    };

    if (isReady) {
      setTimeout(onComplete, 100);
    } else {
      window.addEventListener("load", onComplete);
    }

    const step = () => {
      if (lerpFactor < 0.03) {
        lerpFactor += 0.0002;
      }
      
      currentPct += (targetPct - currentPct) * lerpFactor;
      setPct(Math.round(currentPct));

      if (currentPct >= 99.5 && isReady) {
        setPct(100);
        setTimeout(triggerExit, 500);
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeoutId);
      window.removeEventListener("load", onComplete);
    };
  }, [introDone]);

  return (
    <div ref={loaderRef} className="loader">
      <div className="loader__bg-lines" aria-hidden="true">
        {[...Array(5)].map((_, i) => <span key={i} />)}
      </div>

      <div ref={innerRef} className="loader__inner">
        <p ref={brandRef} className="label loader__brand">LB Elite Travels</p>
        <h1 ref={titleRef} className="loader__title">Incredible India.</h1>
        <div ref={barRef} className="loader__bar">
          <span style={{ width: `${pct}%` }} />
        </div>
        <p ref={pctRef} className="loader__pct">{String(pct).padStart(3, "0")}</p>
      </div>
    </div>
  );
}
