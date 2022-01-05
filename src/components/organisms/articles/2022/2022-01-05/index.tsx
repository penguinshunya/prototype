import { memo } from "react";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220105: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        自力でKaggleやNishikaに提出できるくらいのレベルにはなれた。提出するまで様々な知識が必要だった。
      </P>
      <ul>
        <li>実行環境をどうするか : Google Colabを使えば、環境構築をする手間が省ける</li>
        <li>入力ファイルの扱い方 : 一時的に使う場合は直接Google Colabにアップロード、永続化させたい場合はGoogle DriveにアップロードしてGoogle Colabのプロジェクトにマウントする</li>
        <li>データの加工方法 : <code>np.ndarray</code>のデータは<code>pd.DataFrame</code>に移し替えてから加工する</li>
        <li>カテゴリ変数の扱い方 : <code>pd.get_dummies()</code>を使ってダミー変数に置き換える</li>
        <li>ニューラルネットワークの構築方法 : <code>keras.models.Sequential</code>をインスタンス化して<code>.add()</code>でレイヤーを追加する</li>
      </ul>
      <P>
        上記の他にも、モデルに学習させる方法、CSV出力する方法、入力形式がTSVのときの対処法なども知る必要がある。
      </P>
      <P>
        提出は行えるようになったが、モデルの選択はまだテキトーである。ニューラルネットワークの構築も、「unitsを増やしすぎずに層を増やせばいい」くらいの感覚しかない。もっと適切にモデルを選択できるようにする必要がある。
      </P>
      <P>
        ただ、このテキトーさでも、ニューラルネットワークであればある程度のスコアが出ることがわかった。とりあえずはこのままでも良いかもしれない。今は画像認識と自然言語に興味があるので、CNNとRNNの使い方を勉強してみる。
      </P>
    </ArticleContent>
  );
});

export default Article20220105;
