import { Link } from "@mui/material";
import { memo } from "react";
import { P } from "../../../atoms/p";
import Article from "../../../molecules/article";

interface Props {}

export const Article20191225: React.VFC<Props> = () => {
  return (
    <Article title="2019年12月25日（水）">
      <P>
        今日はクリスマスだけど、悲しいことに僕には関係がない。ということで、昨日に引き続きシャドウマッピングの勉強をしている。
      </P>
      <P>
        <Link href="https://wgld.org/s/sample_038/" target="_blank">
          wgld.orgのコード
        </Link>
        を写経してみて実際に動かしたけど、まだよくわからない。なぜ影が付くのか。その仕組みを理解するために、ここにアウトプットしながら考えていく。
      </P>
      <P>
        GLSLのプログラムは2つ存在する。下準備のプログラムと、実際に描画するプログラム。まずは下準備のプログラムを理解していこうと思う。頂点シェーダの
        <code>vPosition</code>
        には、変換行列が適用された頂点座標が入る。これはフラグメントシェーダに渡る。よって、フラグメントシェーダは、ピクセルの座標を知ることができる。しかし、
        <code>vPosition</code>を使わなくても、代わりに<code>gl_FragCoord.z</code>
        を使うことでも影を付けられる。そちらのほうがコード量が少ないため、今回はそちらを理解していく。
      </P>
      <ul>
        <li>下準備のプログラムのカメラは光源の位置</li>
        <li>
          <code>convRGBA()</code>は光源からのピクセル位置を色情報に変換する
        </li>
        <li>これをテクスチャに変換してスクリーン描画で利用する</li>
        <li>フラグメントシェーダは、色情報しか作り出せない</li>
        <li>だから深度値を色情報として出力する</li>
        <li>
          下準備のプログラムが出力する色情報には、深度値の情報しかない。しかし、付随的にピクセルの座標も持っている。そうでないと、「奥にあるものより手前にあるものを優先して描画する」機能を実装できない
        </li>
        <li>
          でも下準備のプログラムの出力は結局テクスチャとして利用されるため、ピクセル座標の情報は二次元座標に変換される。xとyは座標として持ち、zは色として持つ
        </li>
      </ul>
      <P>
        <code>texture2DProj()</code>の第二引数として渡す<code>vec4</code>型の変数の<code>z</code>と<code>w</code>
        は無視されるのだろうか。
      </P>
    </Article>
  );
};

export default memo(Article20191225);
