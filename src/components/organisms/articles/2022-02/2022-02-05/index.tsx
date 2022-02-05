import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

const CODES = `
struct Data;

impl Iterator for Data {
    type Item = Data;
    fn next(&mut self) -> Option<Self::Item> {
        Some(Data)
    }
}

fn main() {
    let data = Data;
    for _ in data.take(10) {
        dbg!("d");
    }
}
`;

interface Props {}

export const Article20220205: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>久しぶりにRustを触っている。今度こそRustで何か有用なアプリケーションを作成したい。</P>
      <ul>
        <li>
          RustでUnion Findを実装してみた。所有権周りで何らかのバグに遭遇するかと思ったけど、別に何も起こらなかった
        </li>
        <li>
          <code>input!</code>マクロを使うことで、競プロの入力を少ないコードで取得できる
        </li>
        <li>
          axumというWebフレームワークが2021年8月頃に誕生した。このフレームワークは非同期処理で実質デファクトスタンダードのtokioの開発者と同じ人が開発している（厳密には違うかも。ニュアンス的にそんな感じ）。ということでかなり信頼できる。個人的にはactix-webよりも信頼できるので、これから作るWebアプリケーションではaxumを使うことにする
        </li>
        <li>
          クレートが簡単に使える。<code>yarn add XXX</code>のようなコマンドは用意されていないけれど、Cargo.tomlに
          <code>regex = "1"</code>と記述するだけで<code>regex</code>クレートが使えるようになる。だいぶ楽なほうだと思う
        </li>
        <li>
          sccacheを使うことで、コード修正から動作確認までの間隔が短くなってくれる。ないと数秒待つ必要があったので、だいぶ楽になった（もしかすると勘違いの可能性あり）
        </li>
        <li>
          パターンマッチが素晴らしい。<code>let (a, b, c) = (1, 2, 3);</code>
          のように書けるのが地味にありがたい（なんか、パターンマッチに触れるたびに感動している気がする…）
        </li>
        <li>
          <code>yield</code>のようなものはなさそう。あってもデファクトっぽいものはない
        </li>
        <li>
          けれど、<code>BufReader</code>の<code>.read_lines()</code>はメモリを節約できるっぽい
        </li>
        <li>
          今調べてみると、<code>BufReader.lines()</code>は<code>Lines&lt;B&gt;</code>を返す。<code>Lines</code>構造体は
          <code>Iterator</code>トレイトを実装している。そして、<code>Iterator</code>トレイトは<code>next()</code>
          メソッドを実装している。ということで、<code>Iterator</code>
          トレイトを実装することで、メモリを節約しながらシーケンシャルなデータを表現できる。<code>.take()</code>
          があれば無限のデータも表現できる。確認する
        </li>
        <li>
          <code>let v = vec![1, 2, 3]; v.iter().take(2);</code>のように<code>.take()</code>は存在していた。
          <code>.iter()</code>は<code>Iter</code>構造体を返し、<code>.take()</code>は<code>Iterator</code>
          トレイトで実装されている。ということで、<code>Iter</code>構造体は<code>Iterator</code>
          トレイトであるらしいのだけど、そのような実装は見つけられなかった。もう少し深く知りたい
        </li>
      </ul>
      <MyDivider />
      <P>独自のイテレータは次のように作成できる</P>
      <CodeBlock>{CODES.trim()}</CodeBlock>
      <P>
        よって、<code>Iter</code>構造体もどこかで<code>impl Iterator for Iter</code>
        のように書かれていないといけない。けれど見つからない。まあいっか。とりあえず放置。それよりも、
        <code>Iterator</code>の<code>.next()</code>を実装するだけで、<code>Iterator</code>
        に付随する様々な便利メソッドも同時に利用可能になるのが素晴らしい。一般的なデータの集合（<code>Vec</code>や
        <code>HashMap</code>など）からは簡単に<code>Iterator</code>
        トレイトの構造体を取得できるようになっていると思うので、だいぶ助かる。
      </P>
    </ArticleContent>
  );
});

export default Article20220205;
