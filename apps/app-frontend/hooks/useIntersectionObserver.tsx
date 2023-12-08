import { useState, useEffect, useRef, useCallback } from "react";

export type IntersectionObserverHookCallback = (node: Element | null) => void;
export type IntersectionObserverHookResponse = [
  IntersectionObserverHookCallback,
  boolean,
];

const useIntersectionObserver = (
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: "0px",
    threshold: 0.0,
  },
  showDebugLog?: boolean,
): IntersectionObserverHookResponse => {
  const { root, rootMargin, threshold } = options;
  const thresholdAsString = Array.isArray(threshold)
    ? threshold.toString()
    : threshold;
  const [isVisible, setIsVisible] = useState(false);
  const observer = useRef<IntersectionObserver | undefined>(undefined);

  const disconnect = () => {
    if (observer.current != undefined) {
      showDebugLog && console.log("useIntersectionObserver: disconnecting");
      observer.current.disconnect();
      observer.current = undefined;
    }
  };

  const setTarget = useCallback<IntersectionObserverHookCallback>(
    (node: Element | null) => {
      disconnect();
      showDebugLog &&
        console.log("useIntersectionObserver: setting target", node, root);
      observer.current = new IntersectionObserver((entries) => {
        let isNodeVisible = false;
        entries.forEach((entry) => {
          isNodeVisible = isNodeVisible || entry.isIntersecting;
        });
        showDebugLog &&
          console.log("useIntersectionObserver: visible", isNodeVisible);
        setIsVisible(isNodeVisible);
      }, options);

      if (node) {
        observer.current.observe(node);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [root, rootMargin, thresholdAsString],
  );

  useEffect(() => {
    return () => {
      showDebugLog && console.log("useIntersectionObserver: cleaning up");
      disconnect();
    };
  }, [observer, showDebugLog]);

  return [setTarget, isVisible];
};

export default useIntersectionObserver;
