import { useEffect, useState } from "react";
import type { RefObject } from "react";

export function useInView(
  ref: RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: "0px" },
) {
  const [isVisible, setIsVisible] = useState(false);
  const threshold = options.threshold ?? 0.1;
  const root = options.root ?? null;
  const rootMargin = options.rootMargin ?? "0px";

  useEffect(() => {
    if (isVisible) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold, root, rootMargin });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold, root, rootMargin, isVisible]);

  return isVisible;
}
