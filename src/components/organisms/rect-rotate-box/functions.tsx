import { Vec2 } from "../../../common/classes";

export function makeFunction(W: number, H: number, R: number) {
  const L = 2 * (W - 2 * R) + 2 * (H - 2 * R) + 2 * Math.PI * R;
  console.assert(R > 0 && L >= 0);
  return (t: number) => {
    let _t = (t % 1 + 1) % 1;
    let x = 0, y = R;
    {
      const a = Math.min(_t, (H - 2 * R) / L);
      y += a * L; _t -= a;
    }
    {
      const a = Math.min(_t, (Math.PI * R / 2) / L);
      const v = new Vec2(1, 0).rotate(a * L / R + Math.PI / 2 * 2).add(new Vec2(1, 0)).multiplyScalar(R);
      x += v.x; y -= v.y; _t -= a;
    }
    {
      const a = Math.min(_t, (W - 2 * R) / L);
      x += a * L; _t -= a;
    }
    {
      const a = Math.min(_t, (Math.PI * R / 2) / L);
      const v = new Vec2(1, 0).rotate(a * L / R + Math.PI / 2 * 3).add(new Vec2(0, 1)).multiplyScalar(R);
      x += v.x; y -= v.y; _t -= a;
    }
    {
      const a = Math.min(_t, (H - 2 * R) / L);
      y -= a * L; _t -= a;
    }
    {
      const a = Math.min(_t, (Math.PI * R / 2) / L);
      const v = new Vec2(1, 0).rotate(a * L / R + Math.PI / 2 * 0).add(new Vec2(-1, 0)).multiplyScalar(R);
      x += v.x; y -= v.y; _t -= a;
    }
    {
      const a = Math.min(_t, (W - 2 * R) / L);
      x -= a * L; _t -= a;
    }
    {
      const a = Math.min(_t, (Math.PI * R / 2) / L);
      const v = new Vec2(1, 0).rotate(a * L / R + Math.PI / 2 * 1).add(new Vec2(0, -1)).multiplyScalar(R);
      x += v.x; y -= v.y; _t -= a;
    }
    return { x, y };
  };
}
