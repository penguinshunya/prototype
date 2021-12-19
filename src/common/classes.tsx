import * as THREE from "three";

export class Vec2 {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  add(v: Vec2) {
    const r = this.three().add(v.three());
    return new Vec2(r.x, r.y);
  }
  multiplyScalar(s: number) {
    const r = this.three().multiplyScalar(s);
    return new Vec2(r.x, r.y);
  }
  rotate(a: number) {
    const r = this.three().rotateAround(new THREE.Vector2(), a);
    return new Vec2(r.x, r.y);
  }
  three() {
    return new THREE.Vector2(this.x, this.y);
  }
}
