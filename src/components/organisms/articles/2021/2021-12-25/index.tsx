import { Box } from "@mui/material";
import { memo } from "react";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import LocalLink from "../../../../atoms/local-link";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import ConwaysGameOfLife from "../../../life-game/LifeGame";

interface Props {}

export const Article20211225: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        <GLink href="https://jumpaku.hatenablog.com/entry/2019/09/17/Jumpaku_Othello">
          Jumpakuさんが公開されているオセロAPI
        </GLink>
        を、<LocalLink to="/article/982c9eaf-3b32-8f7b-3962-5283437e4048">この記事</LocalLink>
        で使わせていただいた。「Firestore」の白番でだけオセロAIが有効になる。現時点でログインできるのは僕だけなので、僕しかオセロAIの動きを確認できない。
      </P>
      <P>
        片方が強いオセロは、ただ眺めているだけで楽しい。AIが次に置く場所を予測しながら見ているのも楽しい。黒は完全にランダムに置くので、すべてのマスに置ききることなくゲームが終了することもある。そちらのほうが頻度的には高いと思う。すべてのマスが埋まって綺麗な形になったことが1回あって面白かった。
      </P>
      <P>このようなAPIを無料で公開してくださっているJumpakuさんには感謝である。</P>
      <MyDivider />
      <P>昨日は久しぶりに充実した一日を過ごした。ホロライブツリーを見に行ったことが良かったんだと思う。</P>
      <P>
        1mくらい前に歩いていた人が階段を踏み外してしまい、どうしようかと思い眺めていると、お互いに一礼して特に何事もなく終わった。たったそれだけのことだけど、外に出るとこういうこともあるのだなと思った。久しぶりに外に出ると、こんな些細なことでも面白いと感じる。引きこもり生活を2ヶ月ほど続けているけれど、外に出るのも悪くないと思った。
      </P>
      <P>
        年末が気分を変えてくれているのかもしれない。これがもし6月とかであれば、6月に休みはほとんどないため精神的に追い詰められており、どこかに出かける心の余裕がない。よって、外が楽しいものと気付く機会が得られない。
      </P>
      <P>
        しかし、12月は年末年始にまとまった休みがあるため、どこかに出かけることに対する精神的なハードルが低い。だから昨日はホロライブツリーを見に行ったし、それによって外の世界の様々なことを楽しむことができた。
      </P>
      <P>
        秋葉原のショップに同人誌があったので色々見ていたんだけど、その中に、32歳から青春を取り戻そうとする人の物語の本があった。サンプルとして見られる4〜8ページしか見ていないけれど、そこには1日1変という教訓が書かれており、それを実践することにより生活を変えることができたと書かれていた。
      </P>
      <P>
        1日1変とは、1日に1つは何らかの変化を与えようという考え方のことであり、その変化は本当に些細なもので良い。たとえばコンビニで買い物するときに、買ったことのない飲み物を買うなど。これまでは、どのようにすれば毎日を充実して過ごせるのだろうと考えていたが、1日1変の考え方を取り入れることで、少しずつ毎日が充実していくのだと思う。
      </P>
      <P>これからは、1日1変を意識して行動しようと思う。</P>
      <MyDivider />
      <P>
        FirebaseでのGoogle Analyticsの使い方を調べているのだけど、その途中で、Google公式が
        <GLink href="https://support.google.com/firebase/answer/9267735">どのようなイベントを収集すれば良いか</GLink>
        についてまとめてくれているページを見つけた。このような有益な情報を公開してくれているのが本当にありがたい。
      </P>
      <MyDivider />
      <Box sx={{ my: 2 }}>
        <ConwaysGameOfLife />
      </Box>
    </ArticleContent>
  );
});

export default Article20211225;
