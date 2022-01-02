import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import GLink from "../../../../atoms/global-link";
import Latex from "../../../../atoms/latex";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

const SUMMARY = `
Model: "sequential_12"
_________________________________________________________________
 Layer (type)                Output Shape              Param #   
=================================================================
 permute_12 (Permute)        (None, 8, 8, 2)           0         
                                                                 
 conv2d_121 (Conv2D)         (None, 8, 8, 128)         2432      
                                                                 
 conv2d_122 (Conv2D)         (None, 8, 8, 128)         147584    
                                                                 
 conv2d_123 (Conv2D)         (None, 8, 8, 128)         147584    
                                                                 
 conv2d_124 (Conv2D)         (None, 8, 8, 128)         147584    
                                                                 
 conv2d_125 (Conv2D)         (None, 8, 8, 128)         147584    
                                                                 
 conv2d_126 (Conv2D)         (None, 8, 8, 128)         147584    
                                                                 
 conv2d_127 (Conv2D)         (None, 8, 8, 128)         147584    
                                                                 
 conv2d_128 (Conv2D)         (None, 8, 8, 128)         147584    
                                                                 
 conv2d_129 (Conv2D)         (None, 8, 8, 128)         147584    
                                                                 
 conv2d_130 (Conv2D)         (None, 8, 8, 128)         147584    
                                                                 
 conv2d_131 (Conv2D)         (None, 8, 8, 1)           128       
                                                                 
 flatten_10 (Flatten)        (None, 64)                0         
                                                                 
 bias_8 (Bias)               (None, 64)                64        
                                                                 
 activation_7 (Activation)   (None, 64)                0         
                                                                 
=================================================================
Total params: 1,330,880
Trainable params: 1,330,880
Non-trainable params: 0
_________________________________________________________________
`;

const FILE_UPLOAD = `
from google.colab import drive
drive.mount('/content/drive')
`;

interface Props {}

export const Article20220102: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        今日は、以下のページを見ながらオセロAIを作っていく。
        <br />
        <GLink href="https://qiita.com/TokyoYoshida/items/07bd3cdca6a7e50c3114">
          やってみたら簡単！ディープラーニング・オセロを作って自分を負かすまで強くした話(その1)
        </GLink>
      </P>
      <P>
        まずは学習データを作るところから始める。これが一番大変な作業らしい。
        <GLink href="https://www.ffothello.org/informatique/la-base-wthor/">こちら</GLink>
        から棋譜データをダウンロードし、<GLink href="https://lavox.github.io/wthor.html">こちら</GLink>
        でバイナリからテキストに変換する。そしてGoogle
        Colaboratoryで新しいノートブックを作成し、先程生成したテキストファイルをアップロードする。この際に「リサイクル時に削除される」のように表示される。どうやら長期間は保存されないようだ。Google
        Colaboratoryのフォントが等幅ではないため変えたいが、少し調べても簡単にできそうにはないため我慢する。
      </P>
      <P>
        CSVファイルの読み込みは簡単に行えた。<code>DataFrame</code>オブジェクトは<code>df["カラム名"]</code>
        のように書くことで、その列名のデータ一覧を取得できる。<code>df[""].str</code>の意味を調べたいが、Google
        Colaboratoryの<code>str</code>の部分にカーソルを当てても<code>Any</code>
        型としか表示されず、何者かがわからない。ローカルにPythonの環境を作ってもよいが、その際に問題に遭遇した場合に手が止まってしまうので今は避けておく。
        <code>df[""]</code>は<code>Series</code>型なので、それに<code>str</code>
        メソッドまたはプロパティが存在するかどうかをネットで調べる。どうやら<code>str</code>
        には沢山のメソッドが存在しており、これを呼び出すことにより、データを文字列として処理した新たな<code>DataFrame</code>
        を生成することができるようだ。具体的には、<code>str.extractall</code>
        メソッドを呼び出すと、正規表現に一致してキャプチャされた文字列を含む新たな<code>DataFrame</code>
        を生成する。生成された<code>DataFrame</code>
        の形は少し複雑になる（Excelで複数のセルを結合したようなテーブル）。<code>df.reset_index()</code>
        により、複雑な形を単純な形に変換できる。
      </P>
      <P>
        現段階では置いた石の情報は「<code>a1</code>」の形式なので、これを「<code>[0, 0]</code>
        」の形式に変換する。その他にも様々な変換を行い、最終的には<code>x_train</code>と<code>y_train</code>
        が出来上がる。<code>x_train</code>は「現在の盤面の状態」を表し、<code>y_train</code>
        は「次に置く石の場所」を表す。
      </P>
      <P>
        画像の特徴を抽出する際には畳み込みニューラルネットワーク（以下CNN）が使われる。これは、複数のピクセルを「まとめて」見ることで特徴を抽出できることが多いからだと思う。たとえば右下に向かう直線と左下に向かう直線を見分けたいとき、特定のピクセルに注目するよりも全体を眺めたほうが判別しやすい。オセロも画像と同じく二次元の情報であるため、記事の中ではCNNが使われている。
      </P>
      <P>
        記事では17層からなるCNNを構築している。<code>model.summary()</code>
        を呼び出すことでモデルの詳細を知ることができる。今回作成したCNNは次のような構造を持つ。
      </P>
      <CodeBlock>{SUMMARY.trim()}</CodeBlock>
      <P>
        <code>x_train</code>の各次元ごとの要素数は
        <Latex text="2, 8, 8" />
        である。その順序を入れ替えるために<code>Permute</code>を使用している。これを次元の入れ替えと呼ぶ。次元の入れ替えと、記事内で出てくるchannel last、channel
        firstは何らかの関連性があるようだ。なぜチャンネルというものがあるんだろう？盤面を表すだけであれば、3種類の数を使えば2次元配列で表現できる。これを、わざわざ2つのチャンネルに分解して3次元で表す理由はなんだろう？
      </P>
      <P>
        Google
        Colaboratory上で長時間の機械学習を行った場合にどのようなエラーが発生するかを確認する。Epochを増やすほど学習に時間がかかる。Epochは「時代」という意味で、一つの訓練データを何回繰り返して学習させるかを表す数値である。これを600にすることで、同じデータで600回学習させられる。
      </P>
      <CodeBlock>{FILE_UPLOAD.trim()}</CodeBlock>
      <P>
        上記コードを実行すると、Google DriveをGoogle Colabにマウントできる。ノートブック上で<code>!ls "/content/drive"</code>を実行すると内容を表示できる。<code>!ls</code>のように、先頭に<code>!</code>をつけることでLinuxコマンドを実行できる。
      </P>
      <CodeBlock>!df -h drive</CodeBlock>
      <P>
        マウントしたdriveディレクトリの空き容量を確認するときは、上記コマンドを実行する。
      </P>
    </ArticleContent>
  );
});

export default Article20220102;
