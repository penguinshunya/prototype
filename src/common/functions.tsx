export async function sleep() {
  return new Promise(r => window.requestAnimationFrame(r));
}
