import { Box, Typography } from "@mui/material";
import { memo } from "react";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import { P } from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import SampleOthelloByLocalStorage from "../../../othello/SampleOthelloByLocalStorage";
import SampleOthelloByState from "../../../othello/SampleOthelloByState";
import { Amidakuji } from "./Amidakuji";
import { GameWrapper } from "./GameWrapper";
import { SampleUseLongPress } from "./SampleUseLongPress";
import { SampleUseMouse } from "./SampleUseMouse";
import { UUIDCreate } from "./UUIDCreate";

interface Props {}

export const Article20211223: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <Box sx={{ my: 2 }}>
        <UUIDCreate />
      </Box>
      <MyDivider />
      <Box sx={{ my: 2 }}>
        <Amidakuji />
      </Box>
      <MyDivider />
      <Box sx={{ my: 2 }}>
        <SampleUseLongPress />
      </Box>
      <Box sx={{ my: 2 }}>
        <SampleUseMouse />
      </Box>
      <P>
        <GLink href="https://github.com/streamich/react-use">react-use</GLink>
        にあるいくつかのフックを使ってみた。自作したフックとほぼ同じフックがあった。自分の必要としているフックは他の人も必要としていることがわかり、安心した。
      </P>
      <MyDivider />
      <P>
        react-useのフックの中に<code>useMeasure</code>
        というフックがある。これは、要素の大きさなどの情報を取得するフックである。
      </P>
      <P>
        このフックは<code>ref</code>を返す。返された<code>ref</code>
        を要素に渡すことで、その要素の情報を取得できるという仕組みである。それに対して自作のフックでは、<code>ref</code>
        を渡す方式にしている。
      </P>
      <P>
        自作した当時は<code>ref</code>
        を渡す方式しか思いつかなかったためにそちらの方式を選んだが、知名度のあるライブラリが<code>ref</code>
        を返す方式を選択しているため、自作のフックもその方式に合わせたほうが良いのではと思った。けれど、
        <GLink href="https://zenn.dev/anozon/articles/react-multiple-ref-to-one-component">こちらの記事</GLink>
        を読むと渡す方式も悪くない良い気がしてきた。<code>ref</code>
        を返す方式だと、そのままではひとつの要素に対してひとつのフックしか紐付けられない。しかし、渡す方式であれば、特に考えることなくひとつの要素に複数のフックを紐付けられる。
      </P>
      <P>react-useに「複数のrefをひとつのrefにする」ようなフックがあればよいのだけど、そういったフックはなさそうだ。</P>
      <MyDivider />
      <P>
        <code>useLocalStorage</code>が非常に優れている。<code>useState</code>
        と、それに関連する部分を少し書き換えるだけで良い。
      </P>
      <P>
        昨日はオセロを実装したが、ゲームの状態をStateからLocalStorageに変える作業は、ほぼ機械的に行うことができた。5分以下で終わっていた気がする。フックがなければもっと時間がかかっていたと思う。本当に素晴らしい。
      </P>
      <P>
        <code>useLocalStorage</code>
        関数の第一引数にはオブジェクトのキーを渡す必要があるが、このキーが意味のない名前であっても特に支障はないため、ランダムに生成したUUIDを使用している。
        <code>useLocalStorage</code>
        はこれからも頻繁に使うと思うので、「ランダムにUUIDを生成する」という作業も頻繁に行うことになる。ということで、このページのヘッダーに「UUIDを生成してクリップボードにコピーするボタン」を追加しようと思っている。やり過ぎだろうか。
      </P>
      <MyDivider />
      <P>
        WebSocketを使ったゲーム開発も、Reactを使えば想像以上に簡単に実装できそう。データベースはFirestoreを使うのが良さげ。Firestoreは料金がかかるため、不特定多数に公開してしまうのは少し怖い。よってFirebase
        Authenticationによる認証は必須。
      </P>
      <MyDivider />
      <P>Firebaseプロジェクトを作成し、ドキュメントの通りに作業を進めた。今は次のような状態になっている。</P>
      <ul>
        <li>Firebase Authentication にユーザー takaya@penguinshunya.com がいる</li>
        <li>Identity Platform を有効化し、ユーザー自身によるアカウントの作成と削除を不可能している</li>
        <li>プロジェクトの Analytics は有効にしている</li>
        <li>Firestore のデータを読み書きできるのは Authentication の認証に通ったユーザーのみ</li>
        <li>プロジェクトは有料化している</li>
      </ul>
      <P>
        WebSocketと言っていたけれど、FirestoreのAPIがWebSocketをラップしてくれているので、開発者はFirestoreのAPIのみを調べれば良く、WebSocketの細かな仕様について知る必要はない。WebSocketを使って開発することも面白いが、今回はReactに集中したいので、とりあえず見ないふりをする。今回抱いた疑問の「Reactのフックを使うことでFirestoreがどれだけ扱いやすくなるか」を解決することだけに集中する。
      </P>
      <MyDivider />
      <P>
        2人ゲームをするためには2つのアカウントが必要である。とりあえずはログインフォームを実装する必要があるだろう。サクッと作成する。作成した。「ログインしているかどうか」の状態は、
        <code>BaseContext</code>
        ではなく独自フックとして取り出したほうが楽だった。今は15:55。次はゲームの状態をFirestoreに持たせたい。
      </P>
      <P>
        とりあえずは2人で対戦することではなく、「2つのデバイスで全く同じゲームの状態を共有する」ことをとりあえずの目的にする。昨日開発したオセロが使えそうだ。オセロの状態はLocal
        Storage固定であるため、まずはその部分を外に切り出す必要がある。そして、切り出した部分をFirestoreのフックに置き換えることで実装が完了となる。
      </P>
      <Box sx={{ display: "flex", flexWrap: "wrap", columnGap: 1, justifyContent: "space-around", my: 2, rowGap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ color: (theme) => theme.palette.secondary.main, fontWeight: "bold" }}>State</Typography>
          <SampleOthelloByState />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography sx={{ color: (theme) => theme.palette.secondary.main, fontWeight: "bold" }}>
            LocalStorage
          </Typography>
          <SampleOthelloByLocalStorage />
        </Box>
        <GameWrapper />
      </Box>
      <P>
        こちらの3つのオセロは、保存先の違いによる保持期間の違いを確かめるためのサンプルである。保存先がStateの場合、リロードすると状態がリセットされる。保存先がLocalStorageの場合、ブラウザを再起動しても状態は保持される。この点はFirestoreも同じだが、LocalStorageはクライアント側に保存されるのに対してFirestoreはサーバー側に保存される点が異なる。
      </P>
    </ArticleContent>
  );
});

export default Article20211223;
