import { useEffect, useState } from "react";

const LOADER_DONE_KEY = "__LB_LOADER_COMPLETE__";

function isLoaderDone() {
  if (typeof window === "undefined") return false;
  return window[LOADER_DONE_KEY] === true;
}

export function useLoaderComplete() {
  const [ready, setReady] = useState(isLoaderDone);

  useEffect(() => {
    if (isLoaderDone()) {
      setReady(true);
      return undefined;
    }
    const onDone = () => {
      window[LOADER_DONE_KEY] = true;
      setReady(true);
    };
    window.addEventListener("loader:complete", onDone);
    return () => window.removeEventListener("loader:complete", onDone);
  }, []);

  return ready;
}
