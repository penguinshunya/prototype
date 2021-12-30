import { useEffect } from "react";

export function useEffectMouseDown(
  enabled: boolean,
  onMouseMove?: (e: MouseEvent) => unknown,
  onMouseUp?: (e: MouseEvent) => unknown
) {
  useEffect(() => {
    if (!enabled) return;
    if (onMouseMove !== undefined) {
      window.addEventListener("mousemove", onMouseMove);
    }
    if (onMouseUp !== undefined) {
      window.addEventListener("mouseup", onMouseUp);
    }
    return () => {
      if (onMouseMove !== undefined) {
        window.removeEventListener("mousemove", onMouseMove);
      }
      if (onMouseUp !== undefined) {
        window.removeEventListener("mouseup", onMouseUp);
      }
    };
  }, [enabled, onMouseMove, onMouseUp]);
}
