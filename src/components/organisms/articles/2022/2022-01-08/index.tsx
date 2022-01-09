import { Box } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import Gist from "../../../../atoms/gist";
import GLink from "../../../../atoms/global-link";
import Img from "../../../../atoms/image";
import L from "../../../../atoms/latex";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import result1 from "./images/result.png";

const RAY_PPO_TRAINER_OUTPUT = `
Iter: 0; avg. reward=-0.09283582089552245
Iter: 1; avg. reward=0.39382716049382716
Iter: 2; avg. reward=0.6535195530726258
Iter: 3; avg. reward=0.7113592233009709
Iter: 4; avg. reward=0.7413452914798205
Iter: 5; avg. reward=0.7652719665271966
Iter: 6; avg. reward=0.7763754045307443
Iter: 7; avg. reward=0.7841232227488151
Iter: 8; avg. reward=0.7899302865995352
Iter: 9; avg. reward=0.7938744257274117
`;

interface Props {}

export const Article20220108: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        <code>DQNAgent</code>は<code>memory</code>引数を取る。この<code>memory</code>
        にはメモリを確保したオブジェクトを渡す。このメモリ領域にどういったデータが保存されているのかが微妙にわからない。Experience
        Replayという局所解を抑えるための手法があり、それを実現するためにはある程度のメモリ領域が必要なためなのか、それとも別の目的があるのか…。
      </P>
      <P>
        <GLink href="https://qiita.com/goodclues/items/9b2b618ac5ba4c3be1c5">こちらの記事</GLink>にはExperience
        Replay用のメモリだと書かれている。
      </P>
      <P>
        話は逸れるが、上記の記事にはExperience
        Replayを使用する目的も書かれている。DNNでは時系列に相関があるデータをそのまま学習させるとうまくいかないので、過去の経験からいくつかの経験をランダムに選び、それを学習に利用しているとのこと。このあたりの詳しい理論はわからない。今は「Experience
        Replayにより正しく学習が行えるようになる」程度の認識に留めておく。
      </P>
      <P>
        <code>DQNAgent</code>コンストラクタの<code>memory</code>引数が必須なことから、Experience
        Replayの重要度がわかる。
      </P>
      <P>
        強化学習の学習方法についてわからないことがあったが、
        <GLink href="https://qiita.com/icoxfog417/items/242439ecd1a477ece312">こちらの記事</GLink>
        を読むことで解決した。機械学習の「評価」は「行動」の直後に行わなければならないが、強化学習で解く問題の対象では行動の評価はすぐに下せない。例えばオセロの場合、数十回行動した結果にようやく勝敗という評価が得られる。強化学習はこのような問題を解くために利用される。
      </P>
      <P>
        上記の記事には報酬やポリシーの意味も書かれている。報酬は即時報酬とのこと。これがよくわからない。勝敗の結果が得られて初めて報酬を与えられるので、即時的に与える報酬の決め方がわからない。ポリシーはわかりやすくで、状況
        <L c="s" />
        を引数に取り行動
        <L c="a" />
        を返す関数である。このようなモデル化を「マルコフ決定過程」と呼ぶ。
      </P>
      <P>
        <GLink href="https://www.hellocybernetics.tech/entry/2019/06/24/192311">こちらの記事</GLink>
        のマルコフ決定過程の説明が物凄く分かりやすかった。
      </P>
      <MyDivider />
      <P>
        ハンズオン教材として最適な記事を見つけた。今回はこちらを試す。
        <br />
        <GLink href="https://qiita.com/inoory/items/e63ade6f21766c7c2393">
          [Python] Keras-RLで簡単に強化学習(DQN)を試す
        </GLink>
      </P>
      <Gist id="16448ae2761aad9208e3b78881babf43" />
      <P>上記コードを実行すると、次のようなグラフが描画される。</P>
      <Box sx={{ my: 2 }}>
        <Img src={result1} width={364} />
      </Box>
      <P>写経したコードを細かく見ていく。</P>
      <ul>
        <li>
          <code>gym.spaces.Discrete(3)</code>を<code>self.action_space</code>に設定することで、<code>.step()</code>
          の第二引数に
          <L c="0, 1, 2" />
          のいずれかの値が渡る。オセロAIでは、<code>gym.spaces.Discrete(128)</code>を設定することになると思う
        </li>
        <li>
          <code>self.observation_space</code>
          には状態を設定する。オセロAIでは、3つの値をとるセルが64個と、どちらの番かを表す値の合計65個の数が必要になりそう
        </li>
        <li>
          <code>.step()</code>
          は、次の状態、報酬、エピソードを終了するかどうか、補足情報の4つの値を返す。オセロAIでは、置くのが許されていない場所に置くと
          <L c="-10000" />
          の報酬、勝つと
          <L c="100" />
          の報酬、などとすればいいのだろうか
        </li>
        <li>
          <code>.step()</code>
          で主に行う処理は、現在の状態と次に取る行動から次の状態を求めることである。オセロAIでは、現在の盤面の状態と次に置く場所から次の盤面の状態を作ることになる
        </li>
        <li>
          <code>DQNAgent#compile()</code>に<code>optimizer=Adam(learning_rate=1e-3)</code>
          を渡している。これは一体なんだろう？
        </li>
        <li>
          <code>DQNAgent#test()</code>の<code>callbacks</code>
          引数にオブジェクトを渡すことで、ステップ終了後に任意の処理を呼び出せる
        </li>
        <li>
          <code>EpsGreedyQPolicy(eps=0.1)</code>は、確率
          <L c="0.1" />
          でランダムな行動を、
          <L c="0.9" />
          で最適な行動を取ることを表す。他にも様々なポリシーがあるが、オセロAIでは<code>EpsGreedyQPolicy</code>
          を使えば良さそうだ
        </li>
      </ul>
      <P>
        <code>Policy#select_action</code>の定義は<code>def select_action(self, q_values)</code>となっている。
        <code>q_values</code>には各行動のQ値が格納されている。Q値だけを使って次の行動を選択するのでシンプル。
      </P>
      <P>
        <strong>DQNでは、同じ構造のニューラルネットワークを2つ用意する。</strong>
      </P>
      <MyDivider />
      <P>
        <GLink href="https://github.com/ray-project/ray">Ray</GLink>
        と呼ばれるライブラリが、RLライブラリの中で最も多くのGitHubスター数を獲得しているように思う。そこでRayを使ってみることにした。
      </P>
      <P>
        Rayのコア部分にはRLは含まれず、サブモジュールの<code>ray[rllib]</code>
        にRL関連のオブジェクトが含まれる。サンプルコードでは<code>PPOTrainer</code>
        オブジェクトが使われており、このオブジェクトはDQNとはまた違うPPOというRLアルゴリズムが使われている。
        <GLink href="https://www.slideshare.net/harmonylab/dqnppo">こちらのスライド</GLink>
        を見ると、PPOはDQNを参考にして作られたようだ。ただしQ-Learningの延長ではなく、Actor-CriticやPolicy
        Gradientsなどの延長である。Actor-CriticとPolicy Gradientsは聞いたことがない。
      </P>
      <P>
        Policy
        Gradientsを理解するためには、Value-BasedとPolicy-Basedを理解する必要があるようだ。断片的な知識を書いていく。
      </P>
      <ul>
        <li>DQNを非同期分散処理で実装したものをGorilaと呼ぶ</li>
        <li>
          DQNではポリシーは<code>EpsGreedyQPolicy</code>を使用した。Policy
          Basedな手法だとここまでシンプルではなく、もう少し最適化されている？行動確率という言葉が出てきていて、式は
          <L c="\pi(a|s)" />
          で表される。この式にQ値は含まれていないので、純粋に状態
          <L c="s" />
          から行動
          <L c="a" />
          が選ばれる確率を表しているようだ
        </li>
        <li>
          状態価値関数は
          <L c="V(s)" />
          で、状態行動価値関数は
          <L c="Q(s, a)" />
          で表される
        </li>
        <li>
          スライドでは状態価値関数を
          <L c="V(s, a)" />
          と表しているけれど、これは間違いだろうか？
        </li>
        <li>
          <GLink href="https://www.tcom242242.net/entry/ai-2/%E5%BC%B7%E5%8C%96%E5%AD%A6%E7%BF%92/actor-critic/">
            Actor-Critic
          </GLink>
          のわかりやすい説明
        </li>
        <li>TD誤差のTDはTemporal Differenceの略で、TD誤差を0にするようにQ関数を更新する</li>
      </ul>
      <P sx={{ mb: 1 }}>
        以下のコードは<GLink href="http://arduinopid.web.fc2.com/N82.html">こちらのページ</GLink>にあるコードで、
        <code>numpy</code>以外のモジュールを必要としないTD学習の実装である。
      </P>
      <Gist id="68ce0a1f4c7e755ef6fb22d71603255f" />
      <P>そして次のコードは、PPOによる強化学習のコードである。</P>
      <Gist id="77820452deffc21d36258f5027ccb0f1" />
      <P>上記コードを実行すると、次のように出力される。</P>
      <Box>
        <CodeBlock>{RAY_PPO_TRAINER_OUTPUT.trim()}</CodeBlock>
      </Box>
      <P sx={{ mt: 1 }}>
        学習を繰り返していくうちに、報酬が最大の
        <L c="0.8" />
        に近付いていることがわかる。
      </P>
      <P>
        Rayの<code>PPOTrainer</code>のAPIドキュメントは以下である。
        <br />
        <GLink href="https://docs.ray.io/en/latest/rllib-training.html">RLlib Training APIs &#8212; Ray v1.9.1</GLink>
      </P>
    </ArticleContent>
  );
});

export default Article20220108;
