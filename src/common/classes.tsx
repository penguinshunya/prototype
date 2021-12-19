export class Vec2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(v: Vec2) {
    return new Vec2(this.x + v.x, this.y + v.y);
  }
  applyMat2(m: Mat2) {
    return new Vec2(
      m.a[0][0] * this.x + m.a[0][1] * this.y,
      m.a[1][0] * this.x + m.a[1][1] * this.y
    );
  }
  multiplyScalar(s: number) {
    return new Vec2(this.x * s, this.y * s);
  }
  rotate(a: number) {
    const m = new Mat2(Math.cos(a), -Math.sin(a), Math.sin(a), Math.cos(a));
    return this.applyMat2(m);
  }
}

export class Mat2 {
  a: number[][];
  constructor(a11: number, a12: number, a21: number, a22: number) {
    this.a = [
      [a11, a12],
      [a21, a22],
    ];
  }
}

export class Vec3 {
  x: number;
  y: number;
  z: number;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  add(v: Vec3) {
    return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  multiplyScalar(s: number) {
    return new Vec3(this.x * s, this.y * s, this.z * s);
  }
  normalize(): Vec3 {
    const l = this.length();
    return this.multiplyScalar(1 / l);
  }
  dot(v: Vec3) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
  cross(v: Vec3) {
    return new Vec3(
      this.y * v.z - this.z * v.y,
      this.z * v.x - this.x * v.z,
      this.x * v.y - this.y * v.x
    );
  }
  // ロドリゲスの回転公式
  // https://science-log.com/%E6%95%B0%E5%AD%A6/3%E6%AC%A1%E5%85%83%E3%81%AE%E5%9B%9E%E8%BB%A2%E8%A1%8C%E5%88%97/
  rotate(shaft: Vec3, a: number): Vec3 {
    const n = shaft.normalize();
    return this
      .multiplyScalar(Math.cos(a))
      .add(n.multiplyScalar((1 - Math.cos(a)) * this.dot(n)))
      .add(n.cross(this).multiplyScalar(Math.sin(a)));
  }
  rotateShaft(shaft: Vec3): Vec3 {
    if (shaft.length() === 0) return this;
    return this.rotate(shaft.normalize(), shaft.length());
  }
  toString(): string{
    const u = this;
    const v = 1000;
    const s = [Math.round(u.x * v) / v, Math.round(u.y * v) / v, Math.round(u.z * v) / v];
    return `(${s[0]}, ${s[1]}, ${s[2]})`;
  }
}
