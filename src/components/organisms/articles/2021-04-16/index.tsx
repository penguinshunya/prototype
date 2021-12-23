import { Box } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../atoms/code-block";
import { P } from "../../../atoms/p";
import ArticleContent from "../../../molecules/article-content";
import SampleApp from "./SampleApp";

const CODE_SHADER = `
const fragmentShader = \`
void main() {
  gl_FragColor = vec4(0.5, 0.7, 0.6, 1.0);
}
\`;

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
`;

interface Props {
}

export const Article20210416: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <Box sx={{ my: 2 }}>
        <SampleApp />
      </Box>
      <CodeBlock>{CODE_SHADER.trim()}</CodeBlock>
      <P>
        Three.jsでシェーダを描画する最小限のReactコード。
      </P>
    </ArticleContent>
  );
});

export default Article20210416;
