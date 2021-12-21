import { Box, Link, Typography } from "@mui/material";
import Article from "../../../molecules/article";
import SampleUnixDateTime from "./SampleUnixDateTime";
import SampleLoadingButton from "./SampleLoadingButton";
import SampleUseAsyncRetry from "./SampleUseAsyncRetry";
import Latex from "../../../atoms/latex";

interface Props {}

export const Article20211221: React.VFC<Props> = () => {
  return (
    <Article title="2021年12月21日（火）">
      <Link href="https://mui.com/getting-started/installation/" target="_blank">
        MUI
      </Link>
      を試している。
      <br />
      <br />
      バージョンがv4からv5に上がり、より使いやすくなっている。
      <br />
      たとえば、日付を選択するコンポーネントが標準で使えたり、ローディング状態を持つボタン
      <code>&lt;LoadingButton /&gt;</code>が追加されたり、
      <code>&lt;Box /&gt;</code>コンポーネントに<code>sx</code>
      プロパティが追加されたりしている。
      <Box sx={{ alignItems: "center", columnGap: 1, display: "flex", my: 2 }}>
        <SampleLoadingButton />
        <Typography sx={{ color: "info.main" }}>押すと1秒間ローディング状態になるボタン</Typography>
      </Box>
      <code>sx</code>プロパティは<code>style</code>
      プロパティを拡張したもので、<code>useTheme</code>を使わずに
      <code>theme</code>の値が使える。
      <br />
      <br />
      まだ本格的には使っていないけれど、<code>sx</code>
      プロパティによりコード量が10%くらい削減されると思う。
      <br />
      <br />
      今日もまた仕事のやる気が出ない。
      <br />
      こんなときは誰かと話すのが最善なのだろうけれど、あいにく僕には話し相手がいない。
      <br />
      だからここに吐き出していこうと思う。
      <br />
      <br />
      Netlifyでは、特別な設定無しにCreate React Appのビルドとデプロイが自動で行われる。
      <br />
      これが非常に素晴らしい。
      <br />
      手元でビルドしたり、設定ファイルを弄ったりする必要がない。
      <br />
      ただただGitHubにプッシュするだけでいい。
      <br />
      更に、カスタムドメインの設定とSSL証明書の発行も無料で行える。
      <br />
      <br />
      今のところNetlifyで料金を意識したことはない。
      <br />
      おそらくデプロイの回数などに制限があるんだと思う。
      <br />
      調べてみる。
      <br />
      <br />
      転送量とリクエスト制限がある。
      <br />
      趣味で使う分には全く影響がなさそうなので、これからも気にせず使っていく。
      <br />
      <Box sx={{ my: 2 }}>
        <SampleUseAsyncRetry />
      </Box>
      <Link href="https://qiita.com/api/v2/docs" target="_blank">
        Qiita API v2ドキュメント - Qiita:Developer
      </Link>
      <br />
      <br />
      ふと非同期処理を実装したくなったので、QiitaのAPIサーバーからユーザー情報を取得するボタンを作った。
      <br />
      Reactをベースに日記を書くと、ふと実装したくなった機能をTypeScriptで気軽に実装できるのが嬉しい。
      <Box sx={{ my: 2 }}>
        <SampleUnixDateTime />
      </Box>
      これは、UNIX時間と日時を相互変換するプログラム。
      <br />
      内部では、独自コンポーネントの<code>&lt;NumberTextField /&gt;</code>と<code>&lt;DayjsDateTimePicker /&gt;</code>
      を使用している。
      <br />
      これら2つのコンポーネントは、<code>@mui/material</code>と<code>@mui/lab</code>と<code>dayjs</code>に依存している。
      <br />
      <br />
      三平方の定理は
      <Latex content={`c = \\pm\\sqrt{a^2 + b^2}`} />
      である。
      <br />
      <br />
      ということで、LaTeXが使えるようになった。
      <br />
      NPMに<code>katex</code>というライブラリがあり、こちらを使用している。
      <br />
      <code>katex</code>の<Link href="https://github.com/KaTeX/KaTeX" target="_blank">GitHubリポジトリ</Link>のスター数は14,600を超えているため信頼できる。<br />
      <code>katex</code>単体ではReactに対応していないため、30行程度の小さなラッパーを作成した。<br />
      <code>&lt;Latex content={"{"}`c = \\pm\\sqrt{"{"}a^2 + b^2{"}"}`{"}"} /&gt;</code>と書くことで、先程の数式を表示できる。
    </Article>
  );
};

export default Article20211221;
