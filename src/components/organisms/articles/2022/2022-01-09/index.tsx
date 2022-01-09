import { Box } from "@mui/material";
import { memo } from "react";
import MyDivider from "../../../../atoms/divider";
import Gist from "../../../../atoms/gist";
import L from "../../../../atoms/latex";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220109: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        RLLibの<code>PPOTrainer</code>
        を使うと、非常に簡単に強化学習を行えるかもしれない。そこで、マルバツゲームのAIを作ろうと思う。おそらく簡単に作れると思う。今は0:46。1時間以内にできるだろうか。
      </P>
      <P>
        まずはRLLibの<code>PPOTrainer</code>
        への環境の渡し方を知る必要がある。と思ったけれど、既に昨日それは行った。ということで次は、マルバツゲームの状態の持ち方を考える。
      </P>
      <P sx={{ mb: 1 }}>次のような、何もしない環境を構築することができた。</P>
      <Gist id="8db886b73832bd4113e53b14e729fc15" />
      <P sx={{ mt: 0 }}>
        <code>observation_space</code>を離散値の配列にしたい。
      </P>
      <P sx={{ mb: 1 }}>今は1:43。1時間以内に環境を作るところまでできた。</P>
      <Box>
        <Gist id="3c0388ac597b905b50f8866391c11174" />
      </Box>
      <P sx={{ mt: 0 }}>
        学習もいい感じに進んでおり、最初は-85861の報酬だったのが10回後は-2404になっている。あと何回か学習を行えばある程度強いAIが出来上がるかも知れない。
      </P>
      <P>
        実際に動かしてみると、反則負けの場所には置かないけれど、相手のリーチを放置してしまっている。報酬の与え方が間違っているんだと思う。今日はもう寝たいので、明日また考える。
      </P>
      <MyDivider />
      <P>2人ゲームのときにどうするかを考えなければならない。</P>
      <P>一旦PPOから離れて考える。もしかすると、PPOではマルバツゲームの学習が行えないかもしれない。</P>
      <ul>
        <li>AlphaZeroはルール以外の情報を持たずに学習を進められる</li>
        <li>モデルフリーとは、遷移関数と報酬関数がわからない環境のこと</li>
        <li>モデルベースとモデルフリーの大きな違いは、エージェントを定義するかどうか</li>
        <li>
          <code>PPOAgent</code>と検索するとヒットするため、PPOはモデルフリー
        </li>
        <li>「報酬」と「価値」は異なる。報酬は即時的に得られ、価値は長期的に得られる</li>
        <li>
          「現在の状態行動価値は、行動の報酬と、次の状態の状態行動価値の期待値から求められる」ことを表す方程式をベルマン方程式と呼び、
          <L c="Q(s_t, a_t) = E_{s+1}(r_{t+1} + \gamma E_{a+1}(Q(s_{t+1}, a_{t+1})))" />
          で表される
        </li>
        <li>Value BasedであればQ値を求めるときにNNを使用するが、Policy BasedだとどこでNNが使われるか？</li>
        <li>Policy BasedのアルゴリズムはすべてPolicy Gradientの派生</li>
        <li>
          <code>DQNAgent</code>はValue Based
        </li>
      </ul>
    </ArticleContent>
  );
});

export default Article20220109;
