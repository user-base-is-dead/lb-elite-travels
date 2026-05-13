import { useEffect, useState } from "react";
import { isLowEndDevice, isTouchDevice, prefersReducedMotion } from "../utils/performanceUtils.js";

export function useDeviceDetect() {
  const [device, setDevice] = useState({
    isLowEnd: false,
    isTouch: false,
    reducedMotion: false,
    isMobile: false,
  });

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    const update = () => {
      setDevice({
        isLowEnd: isLowEndDevice(),
        isTouch: isTouchDevice(),
        reducedMotion: prefersReducedMotion(),
        isMobile: mql.matches,
      });
    };
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return device;
}
