import { Box, Link } from "@mui/material";
import Article from "../../../molecules/article";
import SampleLoadingButton from "./SampleLoadingButton";
import SampleUseAsyncRetry from "./SampleUseAsyncRetry";

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
      <Box sx={{ my: 2 }}>
        <SampleLoadingButton />
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
      ふと非同期処理を実装したくなったので、QiitaのAPIサーバーからユーザー情報を取得するボタンを作った。<br />
      Reactをベースに日記を書くと、ふと実装したくなった機能をTypeScriptで気軽に実装できるのが嬉しい。
      <Box sx={{ my: 2 }}>
        
      </Box>
    </Article>
  );
};

export default Article20211221;
