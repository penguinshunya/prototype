import { useEffect, useRef, useState } from "react";

export const Test: React.VFC<{}> = () => {
  const divRef = useRef<HTMLDivElement>(null!);
  const [size, setSize] = useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    const div = divRef.current;
    const observer = new ResizeObserver((entries) => {
      for (const e of entries) {
        setSize(e.contentRect);
      }
    });
    observer.observe(div);
    return () => {
      observer.unobserve(div);
    };
  }, []);

  return (
    <div ref={divRef}>
      {size === null ? "-" : <>({size.width}, {size.height})</>}
    </div>
  );
};
