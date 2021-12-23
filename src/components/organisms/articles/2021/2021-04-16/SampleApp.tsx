import { memo, useEffect, useRef } from "react";
import * as THREE from "three";

const fragmentShader = `
void main() {
  gl_FragColor = vec4(0.5, 0.7, 0.6, 1.0);
}
`;

interface Props {}

export const SampleApp: React.VFC<Props> = memo(() => {
  const ref = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const canvas = ref.current;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-50, 50, 50, -50, 0.1, 10);
    const renderer = new THREE.WebGLRenderer({ canvas });

    const geometry = new THREE.PlaneGeometry(98, 98);
    const material = new THREE.ShaderMaterial({
      fragmentShader,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    camera.position.z = 10;

    renderer.render(scene, camera);
  }, []);

  return <canvas ref={ref} width={256} height={256} />;
});

export default SampleApp;
