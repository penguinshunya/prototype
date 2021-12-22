import { memo } from "react";
import CodeBlock from "../../../atoms/code-block";
import { P } from "../../../atoms/p";
import Article from "../../../molecules/article";

const CODE_BLOCK = `
const VERTEX_SOURCE = \`
attribute vec3 position;
void main(void) {
  gl_Position = vec4(position, 1.0);
}
\`;
const FRAGMENT_SOURCE = \`
void main(void) {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
\`;

const gl = document.getElementById("canvas").getContext("webgl");
const prg = program(gl, VERTEX_SOURCE, FRAGMENT_SOURCE);

const position = [
   0,  1,  0,
  -1, -1,  0,
   1,  0, -1,
];
const vbo = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW);
const loc = gl.getAttribLocation(prg, "position");
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc, 3, gl.FLOAT, false, 0, 0);

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLES, 0, 3);
`;

interface Props {}

export const Article20191227: React.VFC<Props> = () => {
  return (
    <Article title="2019年12月27日（金）">
      <P>仕事中、暇があればWebGLについて考えていた。</P>
      <P>
        どうしても腑に落ちないことがある。それは「なぜ光方向ベクトルに逆行列を掛けるとうまく影を表現できるか」という問題。どうしても「光を変換する」というのがイメージできない。それよりも、面の法線ベクトルに普通の行列を掛けたほうがイメージしやすい。だから僕はこちらの方針でいく。
      </P>
      <P>
        GLSLはデバッグがしにくい。「頂点シェーダに情報を渡すと、<code>gl_Position</code>
        にどういった値が格納されるか」というのは、実際に描画された図形から判断するしかない。頂点シェーダの出力を直接見る方法がわからない。おそらく探せば何らかの方法が見つかると思うけど、探すのが少し面倒。今回は、それよりもいい方法を思いついたので書いていく。
      </P>
      <P>
        前提として、描画される範囲は<code>-1 &lt;= x, y, z &lt;= 1</code>
        を満たす立方体の空間である。もし描画したい図形の座標がこの範囲に納まっているなら、行列による変換をする必要はない。つまり次のように書くだけで描画が完了する。
      </P>
      <CodeBlock language="javascript">{CODE_BLOCK.trim()}</CodeBlock>
    </Article>
  );
};

export default memo(Article20191227);
