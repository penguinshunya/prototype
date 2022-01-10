import { Box } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import Img from "../../../../atoms/image";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import GameWrapper from "./GameWrapper";
import othello1 from "./images/othello.png";

const ALPHA_ZERO = `
from MCTS import MCTS
from othello.OthelloGame import OthelloGame
from othello.pytorch.NNet import NNetWrapper as NNet
from utils import dotdict

game = OthelloGame(8)
nnet = NNet(game)
nnet.load_checkpoint('./pretrained_models/othello/pytorch/', '8x8_100checkpoints_best.pth.tar')
args = dotdict({"numMCTSSims": 50, "cpuct": 1.0})
mcts = MCTS(game, nnet, args)

# 次の手を読む
game.getNextState(board, player, action)
`;

interface Props {}

export const Article20220110: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        <GLink href="https://github.com/suragnair/alpha-zero-general">Alpha Zero General</GLink>
      </P>
      <P>こちらのコードを動かしてみる。</P>
      <P>
        挫折しそうになった。Dockerコンテナを起動するときに
        <code>docker: Error response from daemon: Unknown runtime specified nvidia.</code>
        というエラーが発生した。setup_env.shに<code>docker run --runtime=nvidia ...</code>というコードがあり、
        <code>--runtime=nvidia</code>を削除したところ正常に起動した。
      </P>
      <P>
        次に<GLink href="https://qiita.com/bpzAkiyama/items/7d50f0e1ef1e262df984">こちらの記事</GLink>
        のコードを動かそうとすると、<code>from othello.pytorch.NNet import NNetWrapper as NNet</code>の行で
        <code>ImportError: cannot import name 'PILLOW_VERSION' from 'PIL'</code>というエラーが発生した。調べると
        <code>pillow 7.0.0</code>には<code>PILLOW_VERSION</code>が削除されたため<code>7.1.2</code>
        にアップグレードすればよいと書かれていたが、<code>conda list</code>でバージョンを調べると<code>9.0.0</code>
        だった。そこで<code>conda remove pillow</code>を実行しても削除されない。
      </P>
      <P>
        そこで、<code>conda list</code>
        を実行することで表示されるパッケージ一覧は、別にanacondaでインストールされているわけではないことを知る。ということで
        <code>pip uninstall pillow</code>を実行すると正常に削除できた。<code>7.1</code>
        をインストールすると「8以上でないと駄目」という警告が発生したため、<code>pip install "pillow&gt;=8,&lt;9"</code>
        でバージョン8をインストール。するとエラーは発生しなくなった。
      </P>
      <P>
        今はREADME.mdの通りに<code>python main.py</code>を実行している。<code>main.py</code>
        では6x6オセロの学習をしているようだ。Self Playは15分ほどで終了し、その後はTraining Netが行われている。
        <code>c.learn()</code>により学習が開始される。<code>.learn()</code>には次のように書かれている。
      </P>
      <Box component="blockquote" sx={{ my: 2.5 }}>
        Performs numIters iterations with numEps episodes of self-play in each iteration. After every iteration, it
        retrains neural network with examples in trainExamples (which has a maximum length of maxlenofQueue). It then
        pits the new neural network against the old one and accepts it only if it wins &gt;= updateThreshold fraction of
        games.
      </Box>
      <Box component="blockquote" sx={{ my: 2.5 }}>
        numIters個の反復を行い、各反復でnumEps個の自己学習エピソードを実行する。各反復の後、trainExamples(最大長はmaxlenofQueue)の例を用いてニューラルネットワークの再トレーニングを行う。そして、新しいニューラルネットワークを古いものと対戦させ、
        updateThreshold以上のゲームに勝利した場合のみ、それを受け入れる。
      </Box>
      <P>
        <code>
          {"{"} numIters: 1, numEps: 10 {"}"}
        </code>
        を設定すると、まず10回の自己学習が行われ、その後10回のEPOCH毎にTraining Netが20回行われる。Training
        NetではLoss_piとLoss_vの2つの値が確定する。学習が進むにつれて2つの値は小さくなっていく。それが終わると、Arena.playGamesという行が2行増える。その後「NEW/PREV WINS : 28 / 12 ; DRAWS : 0」と出力され、「ACCEPTING NEW MODEL」と出力される。
      </P>
      <P>
        よくわからないので、<GLink href="https://qiita.com/bpzAkiyama/items/7d50f0e1ef1e262df984">こちらの記事</GLink>のコードを動かすことにし、感覚を掴んでからまた考える。
      </P>
      <P>
        JumpakuさんのオセロAIとAlphaZeroのオセロAIを戦わせたところ、AlphaZeroが勝利した。
      </P>
      <Box>
        <Img src={othello1} width={256} />
      </Box>
      <P sx={{ mb: 1 }}>
        AlphaZeroを使うためには次のコードをDocker上で動かす。
      </P>
      <CodeBlock>{ALPHA_ZERO.trim()}</CodeBlock>
      <P>
        上記コードから、実装者は<code>Game</code>オブジェクトと<code>NNet</code>オブジェクトだけを実装すれば良いことがわかる。
      </P>
      <P>
        次は学習方法について調べる。
      </P>
      <MyDivider />
      <P>
        学習方法を調べる前に、このプログラムをCloud Run上で動かすことを考える。おそらく次の手順で動かすことができると思う。
      </P>
      <ol>
        <li>PythonのDockerコンテナを用意する</li>
        <li>そのコンテナに入り、PyTorchなどの必要なパッケージをインストールする</li>
        <li>AIが動作することを確認後、DjangoをインストールしてWeb APIを作成する</li>
        <li>ポートを公開し、ブラウザからアクセスできることを確認する</li>
        <li>Cloud Runにデプロイする</li>
      </ol>
      <P>
        PyTorchのインストール中に容量エラーが発生した。Dockerのリソースを10GBほど増やすとエラーは出なくなった。ただ、requirements.txt内のすべてのパッケージのインストールにかなりの時間を使っている。Cloud Runにデプロイする度にこの時間を使っていては、料金がかかってくる恐れがある。よって、PyTorchをインストール済みのDockerコンテナをDocker HubまたはGCPにアップロードして、それを使うことで対応する。もしGCPにアップロードした場合であっても、手元のPCからDockerイメージを取得することは果たして可能か？おそらく可能だと思うけれど、少しだけ面倒そう。「手元のPCでGCPへのログインを行うだけでOK」のような単純なものではないと思うがどうなんだろう。もしかするとできるかも。
      </P>
      <P>
        <GLink href="https://cloud.google.com/container-registry/docs/pushing-and-pulling">イメージの push と pull &nbsp;|&nbsp; Container Registry のドキュメント &nbsp;|&nbsp; Google Cloud</GLink>
      </P>
      <P>
        こちらのページを見てみると、Dockerイメージにタグ付けを行ってからGCRにプッシュすると良さそうだ。
      </P>
      <P>
        オセロAIを問題なく動かすことができた。次はDjangoを動かすことを考える。軽量なWebフレームワークで良かったため、DjangoではなくFlaskを選択した。<code>docker</code>コマンドでGCRにプッシュするために特殊なコマンドを実行する必要がある。<GLink href="https://cloud.google.com/container-registry/docs/advanced-authentication">こちら</GLink>に書かれている。
      </P>
      <P>
        ローカルのDockerイメージをGCRにプッシュしている。その中には3GBを超えるイメージもあり、一向に終わる気配がない。おそらく30分ほど経っているけれど、まだ500MBくらいしか進んでいない。動かすのはオセロAIだけなので、もっとスリムにしたいところ。
      </P>
      <P>
        GCR自体に料金はかからず、Cloud Storageの料金がかかるとのこと。転送に10円/GBくらいかかるので、Cloud Runにデプロイする毎に30円くらいかかるということだろうか。それはできれば避けたいところ。
      </P>
      <P>
        次のオセロは、黒がAlphaZeroで、白がJumpakuさんのAIである。まだ学習が少ないからか、AlphaZeroが負けることもある。
      </P>
      <GameWrapper />
    </ArticleContent>
  );
});

export default Article20220110;
