import { Box, Link, Typography } from "@mui/material";
import { memo } from "react";
import Latex from "../../../../atoms/latex";
import { P } from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import SampleLoadingButton from "./SampleLoadingButton";
import SampleUnixDateTime from "./SampleUnixDateTime";
import SampleUseAsyncRetry from "./SampleUseAsyncRetry";

interface Props {}

export const Article20211221: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        <Link href="https://mui.com/getting-started/installation/" target="_blank">
          MUI
        </Link>
        を試している。バージョンがv4からv5に上がり、より使いやすくなっている。
      </P>
      <P>
        たとえば、日付を選択するコンポーネントが標準で使えたり、ローディング状態を持つボタン
        <code>&lt;LoadingButton /&gt;</code>が追加されたり、<code>&lt;Box /&gt;</code>コンポーネントに<code>sx</code>
        プロパティが追加されたりしている。
      </P>
      <Box sx={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 1, my: 2 }}>
        <SampleLoadingButton />
        <Typography sx={{ color: "info.main" }}>押すと1秒間ローディング状態になるボタン</Typography>
      </Box>
      <P>
        <code>sx</code>プロパティは<code>style</code>
        プロパティを拡張したもので、<code>useTheme</code>を使わずに
        <code>theme</code>の値が使える。まだ本格的には使っていないけれど、<code>sx</code>
        プロパティによりコード量が10%くらい削減されると思う。
      </P>
      <P>
        今日もまた仕事のやる気が出ない。こんなときは誰かと話すのが最善なのだろうけれど、あいにく僕には話し相手がいない。だからここに吐き出していこうと思う。
      </P>
      <P>
        Netlifyでは、特別な設定無しにCreate React
        Appのビルドとデプロイが自動で行われる。これが非常に素晴らしい。手元でビルドしたり、設定ファイルを弄ったりする必要がない。ただただGitHubにプッシュするだけでいい。更に、カスタムドメインの設定とSSL証明書の発行も無料で行える。
      </P>
      <P>今のところNetlifyで料金を意識したことはない。おそらくデプロイの回数などに制限があるんだと思う。調べてみる。</P>
      <P>
        調べてみると、転送量とリクエスト制限があることがわかった。しかし、趣味で使う分には全く影響がなさそうなので、これからも気にせず使っていく。
      </P>
      <Box sx={{ my: 2 }}>
        <SampleUseAsyncRetry />
      </Box>
      <Box sx={{ my: 2 }}>
        <Link href="https://qiita.com/api/v2/docs" target="_blank">
          Qiita API v2ドキュメント - Qiita:Developer
        </Link>
      </Box>
      <P>
        ふと非同期処理を実装したくなったので、QiitaのAPIサーバーからユーザー情報を取得するボタンを作った。Reactをベースに日記を書くと、ふと実装したくなった機能をTypeScriptで気軽に実装できるのが嬉しい。
      </P>
      <Box sx={{ my: 2 }}>
        <SampleUnixDateTime />
      </Box>
      <P>
        これは、UNIX時間と日時を相互変換するプログラム。内部では、独自コンポーネントの
        <code>&lt;NumberTextField /&gt;</code>と<code>&lt;DayjsDateTimePicker /&gt;</code>
        を使用している。これら2つのコンポーネントは、<code>@mui/material</code>と<code>@mui/lab</code>と
        <code>dayjs</code>に依存している。
      </P>
      <P>
        三平方の定理は
        <Latex text={`c = \\pm\\sqrt{a^2 + b^2}`} />
        である。
      </P>
      <P>
        ということで、LaTeXが使えるようになった。NPMに<code>katex</code>というライブラリがあり、こちらを使用している。
        <code>katex</code>の
        <Link href="https://github.com/KaTeX/KaTeX" target="_blank">
          GitHubリポジトリ
        </Link>
        のスター数は14,600を超えているため信頼できる。<code>katex</code>
        単体ではReactに対応していないため、30行程度の小さなラッパーを作成した。
        <code>
          &lt;Latex content={"{"}`c = \\pm\\sqrt{"{"}a^2 + b^2{"}"}`{"}"} /&gt;
        </code>
        と書くことで、先程の数式を表示できる。
      </P>
      <P>唐突だけど、過去に書いた文章のすべてをここに残すことにした。まとめている過程で新たな発見があると思う。</P>
      <P>
        ちょうど2年前、僕はWebGLを使って3Dゲームを作ろうとしていた。その頃はまだTypeScriptをよく知らず、JavaScriptだけで3Dゲームを作っていた。今では考えられないが、参考サイトがJavaScriptで書かれていたことも大きかったんだと思う。それを踏まえると、TypeScriptでWebGLのチュートリアルを作成すれば需要があるのでは？などと考えたりする。過去に書いたJavaScriptのプログラムをTypeScriptで書き直してみようかな。
      </P>
    </ArticleContent>
  );
});

export default Article20211221;
