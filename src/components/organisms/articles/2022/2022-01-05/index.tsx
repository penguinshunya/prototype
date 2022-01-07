import { Box, Divider } from "@mui/material";
import { memo } from "react";
import GLink from "../../../../atoms/global-link";
import Img from "../../../../atoms/image";
import L from "../../../../atoms/latex";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import image1 from "./images/1638514964487.png";

interface Props {}

export const Article20220105: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>自力でKaggleやNishikaに提出できるくらいのレベルにはなれた。提出するまで様々な知識が必要だった。</P>
      <ul>
        <li>実行環境をどうするか : Google Colabを使えば、環境構築をする手間が省ける</li>
        <li>
          入力ファイルの扱い方 : 一時的に使う場合は直接Google Colabにアップロード、永続化させたい場合はGoogle
          DriveにアップロードしてGoogle Colabのプロジェクトにマウントする
        </li>
        <li>
          データの加工方法 : <code>np.ndarray</code>のデータは<code>pd.DataFrame</code>に移し替えてから加工する
        </li>
        <li>
          カテゴリ変数の扱い方 : <code>pd.get_dummies()</code>を使ってダミー変数に置き換える
        </li>
        <li>
          ニューラルネットワークの構築方法 : <code>keras.models.Sequential</code>をインスタンス化して<code>.add()</code>
          でレイヤーを追加する
        </li>
      </ul>
      <P>上記の他にも、モデルに学習させる方法、CSV出力する方法、入力形式がTSVのときの対処法なども知る必要がある。</P>
      <P>
        提出は行えるようになったが、モデルの選択はまだテキトーである。ニューラルネットワークの構築も、「unitsを増やしすぎずに層を増やせばいい」くらいの感覚しかない。もっと適切にモデルを選択できるようにする必要がある。
      </P>
      <P>
        ただ、このテキトーさでも、ニューラルネットワークであればある程度のスコアが出ることがわかった。とりあえずはこのままでも良いかもしれない。今は画像認識と自然言語に興味があるので、CNNとRNNの使い方を勉強してみる。
      </P>
      <Divider />
      <P>『Kaggleで勝つデータ分析の技術』を読んだときのメモ</P>
      <ul>
        <li>予測対象は何かを理解せずにコードを書き始めるのは流石にまずい</li>
        <li>データ理解をEDA(Exploratory Data Analysis)と呼ぶ</li>
        <li>GBDTが楽そう。欠損値をそのまま扱うことができるため</li>
        <li>ラベルエンコーディングを使って性別等の文字列を数値に変換</li>
        <li>
          上位に入るためには「良い特徴量」を作る必要がある ←
          この特徴量は元のデータから算出するため、情報量自体は増えていないように思える。どういうことだろう？
        </li>
        <li>コンペでは、安定して高い精度が出せるGBDTをまず試すことがほとんど</li>
        <li>
          ラベルエンコーディングとダミーの違いは、列数が増えるかどうか。ラベルエンコーディングは列数が増えず、ダミーは列数が増える
        </li>
        <li>
          GBDTの分類には<code>XGBClassifier</code>を使う。目的変数は
          <L c="0" />か<L c="1" />
          の値をとる
        </li>
        <li>
          <GLink href="https://www.kaggle.com/c/titanic/submissions">
            ニューラルネットワークよりもGBDTのほうがスコアが良かった
          </GLink>
          （DNN: 0.75119, GBDT: 0.78468）
        </li>
        <li>
          <code>.predict_proba()</code>を使う理由は、<code>logloss</code>を求める際に確率を使うから
        </li>
        <li>
          <code>KFold</code>によりk分割交差検証、<code>itertools.product</code>
          などでハイパーパラメータのチューニングを行える
        </li>
        <li>レコード間に相関がある場合は、リークと呼ばれる適切なバリデーションを行えない事象を引き起こす</li>
      </ul>
      <P></P>
      <Divider />
      <P></P>
      <ul>
        <li>RMSEやMAEは回帰の評価指標の一種</li>
        <li>RMSEはMSEのルートを取ったもので、誤差の単位が元の値と等しい（RMSE: Root Mean Squared Error）</li>
        <li>MAE: Mean Absolute Error</li>
        <li>これらは損失関数として利用しても問題なさそう</li>
        <li>分類の評価指標にはF1-score、logloss、AUCなどが使われる</li>
        <li>
          loglossの計算式は
          <L c="-(y\log p + (1 - y) \log (1 - p))" />（<L c="y" />
          は実際の値、
          <L c="p" />
          は予測値）。実際に
          <L c="y" />に<L c="0, 1" />
          を代入するとわかる
        </li>
        <li>AUCは楽に理解できそうではなさそう</li>
        <li>マルチラベル分類は、二値分類をクラスの数だけ繰り返すのが一般的</li>
        <li>テーブルデータと画像と自然言語の3つを同時に扱うコンペがある</li>
        <li>外れ値かどうかの判定が難しそう</li>
        <li>混合行列は4つの要素TP、TN、FP、FNからなる</li>
        <li>loglossはcross entropyとも呼ばれる</li>
        <li>
          <GLink href="https://yaakublog.com/crossentropy_binarycrossentropy">
            Cross Entropy と Binary Cross Entropy の違い
          </GLink>
        </li>
        <li>目的関数と評価指標の違い。目的関数は微分可能でなければならないが、評価指標はそうではない（たぶん）</li>
        <li>たとえば回帰タスクではRMSEが使えるが、MAEは使えないなど</li>
        <li>loglossは目的関数として使用可能</li>
        <li>評価指標に制限はほとんどない</li>
        <li>評価指標を目的関数として使用できるケースは少ない</li>
      </ul>
      <P></P>
      <Divider />
      <P />
      <ul>
        <li>機械学習アルゴリズムは、教師あり学習と教師なし学習に分けられる</li>
        <li>強化学習とレコメンドシステムは、機械学習アルゴリズムに含まれない</li>
        <li>機械学習アルゴリズムは学習前のデータ収集や前処理が必要とされるが、強化学習はそれらを必要としない</li>
        <li>強化学習の使用例は、オセロや将棋のAIである</li>
      </ul>
      <P>
        <Box sx={{ mb: 1 }}>
          <Img src={image1} width={456} />
        </Box>
        引用 :{" "}
        <GLink href="https://jp.mathworks.com/discovery/reinforcement-learning.html">
          強化学習 – これだけは知っておきたい3つのこと - MATLAB
        </GLink>
      </P>
      <ul>
        <li>強化学習の複雑な問題は、ディープラーニングネットワークに依存している</li>
        <li>強化学習は、一般的にサンプル効率が低いと考えられている。並列化により高速化できる</li>
        <li>機械学習アルゴリズムの選択を正しく行えることが重要</li>
        <li>教師あり学習で解く問題は、「回帰」と「分類」に分けられる</li>
      </ul>
    </ArticleContent>
  );
});

export default Article20220105;
