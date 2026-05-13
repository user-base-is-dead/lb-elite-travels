import { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader() {
  const [pct, setPct] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const dur = 600;
    const step = (now) => {
      const t = Math.min(1, (now - start) / dur);
      setPct(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setHide(true), 100);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`loader ${hide ? "is-hide" : ""}`}>
      <div className="loader__inner">
        <p className="label loader__brand">LB Elite Travels</p>
        <h1 className="loader__title">Incredible India.</h1>
        <div className="loader__bar"><span style={{ width: `${pct}%` }} /></div>
        <p className="loader__pct">{String(pct).padStart(3, "0")}</p>
      </div>
    </div>
  );
}
