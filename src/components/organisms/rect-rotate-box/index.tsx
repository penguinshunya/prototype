import { useEffect, useMemo, useRef } from "react";
import { makeFunction } from "./functions";

type Props = JSX.IntrinsicElements["canvas"] & {
  color?: string | CanvasGradient | CanvasPattern;
  count?: number;
  distPerSec?: number;
  lineWidth?: number;
  padding?: number;
  radius?: number;
  rate?: number;
};

export const RectRotateBox: React.VFC<Props> = ({
  color: rawColor,
  count: rawCount,
  distPerSec: rawDistPerSec,
  lineWidth: rawLineWidth,
  padding: rawPadding,
  radius: rawRadius,
  rate: rawRate,
  ...props
}) => {
  const color = useMemo(() => rawColor ?? "black", [rawColor]);
  const count = useMemo(() => rawCount ?? 16, [rawCount]);
  const distPerSec = useMemo(() => rawDistPerSec ?? -8, [rawDistPerSec]);
  const lineWidth = useMemo(() => rawLineWidth ?? 5, [rawLineWidth]);
  const padding = useMemo(
    () => (rawPadding ?? 8) + lineWidth / 2,
    [lineWidth, rawPadding]
  );
  const radius = useMemo(
    () => (rawRadius === 0 ? 1 : rawRadius) ?? 32,
    [rawRadius]
  );
  const rate = useMemo(() => rawRate ?? 0.6, [rawRate]);

  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    const B = padding;
    const W = canvas.width - B * 2;
    const H = canvas.height - B * 2;
    const f = makeFunction(W, H, radius);
    let time = 0;
    let id: number | null = null;
    function tick() {
      id = window.requestAnimationFrame(tick);
      time += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 1; i += 1 / count) {
        const ps: { x: number; y: number }[] = [];
        for (let j = 0; j < rate; j += 1 / 16) {
          const t =
            (i + j * (1 / count) + (time * distPerSec) / (2 * H + 2 * W) / 60) %
            1;
          const p = f(t);
          p.x += B;
          p.y += B;
          ps.push(p);
        }
        ctx.beginPath();
        ctx.moveTo(ps[0].x, ps[0].y);

        let j;
        for (j = 1; j < ps.length - 2; j++) {
          const xc = (ps[j].x + ps[j + 1].x) / 2;
          const yc = (ps[j].y + ps[j + 1].y) / 2;
          ctx.quadraticCurveTo(ps[j].x, ps[j].y, xc, yc);
        }
        ctx.quadraticCurveTo(ps[j].x, ps[j].y, ps[j + 1].x, ps[j + 1].y);
        ctx.stroke();
      }
    }
    tick();
    return () => {
      if (id !== null) {
        window.cancelAnimationFrame(id);
      }
    };
  }, [color, count, distPerSec, lineWidth, padding, radius, rate]);

  return (
    <canvas
      ref={canvasRef}
      {...props}
    />
  );
};

export default RectRotateBox;
