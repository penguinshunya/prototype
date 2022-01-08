import { Box } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import Img from "../../../../atoms/image";
import L from "../../../../atoms/latex";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import kde1 from "./images/kde.png";
import kde2 from "./images/kde2.png";

const CUSTOM_OBJECTIVE_FUNCTION = `
def my_squared_error(y_hat: np.array, dtrain: xgb.DMatrix) -> [np.array, np.array]:
  y = dtrain.get_label()
  N = y_hat.shape[0]
  gradient = y_hat - y
  hessian = np.ones(N)
  return gradient, hessian
`;

const USE_CUSTOM_OBJECTIVE_FUNCTION = `
model = xgb.train(
  { "eval_metric": "mae", "tree_method": "gpu_hist" },
  train, 
  num_boost_round=500, 
  early_stopping_rounds=20, 
  evals=[(train, 'train'), (valid, 'eval')], 
  obj=my_squared_error)
`;

const PSEUDO_HUBER = `
def pseudo_huber(preds, dtrain):
  d = preds - dtrain.get_label()
  delta = 1.0
  scale = 1 + (d / delta) ** 2
  scale_sqrt = np.sqrt(scale)
  grad = d / scale_sqrt
  hess = 1 / scale / scale_sqrt
  return grad, hess
`;

const STANDARD_NORMAL = `
rand = np.random.RandomState(seed=0)
df = pd.DataFrame(rand.standard_normal(10000))
df.plot.kde()
`;

const RESET_INDEX = `
df1 = pd.DataFrame(np.array([1, 2, 3]))
df2 = pd.DataFrame(np.array([4, 5, 6]))
df = pd.concat([df1, df2])
df.reset_index(drop=True)
`;

const REINFORCEMENT_LEARNING = `
!pip install keras-rl2 gym

import numpy as np
import gym

from keras.models import Sequential
from keras.layers import Dense, Activation, Flatten
from keras.optimizer_v2.adam import Adam

from rl.agents.dqn import DQNAgent
from rl.policy import BoltzmannQPolicy
from rl.memory import SequentialMemory

ENV_NAME = 'CartPole-v0'
env = gym.make(ENV_NAME)
np.random.seed(123)
env.seed(123)
nb_actions = env.action_space.n

model = Sequential()
model.add(Flatten(input_shape=(1,) + env.observation_space.shape))
model.add(Dense(16))
model.add(Activation("relu"))
model.add(Dense(16))
model.add(Activation("relu"))
model.add(Dense(16))
model.add(Activation("relu"))
model.add(Dense(nb_actions))
model.add(Activation("linear"))

memory = SequentialMemory(limit=50000, window_length=1)
policy = BoltzmannQPolicy()

dqn = DQNAgent(model=model, memory=memory, nb_actions=nb_actions, nb_steps_warmup=10, target_model_update=1e-2, policy=policy)
dqn.compile(Adam(learning_rate=1e-3), metrics=['mae'])
history = dqn.fit(env, nb_steps=50000, verbose=2)

dqn.save_weights('dqn_{}_weights.h5f'.format(ENV_NAME), overwrite=True)
dqn.test(env, nb_episodes=5, visualize=False)
`;

interface Props {}

export const Article20220107: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P></P>
      <ul>
        <li>
          xgboostの目的関数(objective function)は自作できる。次のように自作する。コードは
          <GLink href="https://nigimitama.hatenablog.jp/entry/2019/11/06/000000">こちら</GLink>のものを使用
        </li>
      </ul>
      <Box sx={{ my: 1 }}>
        <CodeBlock>{CUSTOM_OBJECTIVE_FUNCTION.trim()}</CodeBlock>
      </Box>
      <ul>
        <li>戻り値の1つ目は微分した値を、2つ目は二階微分した値を返しているらしい</li>
        <li>上記の目的関数は次のように使用する</li>
      </ul>
      <Box sx={{ my: 1 }}>
        <CodeBlock>{USE_CUSTOM_OBJECTIVE_FUNCTION.trim()}</CodeBlock>
      </Box>
      <ul>
        <li>次の自作関数を作成したが、学習が進まなかった。eval-maeがずっと同じ値になる</li>
      </ul>
      <Box sx={{ mb: 2, mt: 1 }}>
        <CodeBlock>{PSEUDO_HUBER.trim()}</CodeBlock>
      </Box>
      <MyDivider />
      <P>最近は箇条書きの日記ばかり書いていた、久しぶりに文章の日記を書く。</P>
      <P>
        機械学習には様々なアルゴリズムが存在するため、問題に対して適切なアルゴリズムを選択する能力が必要である。ここ数日間は機械学習の勉強に没頭したため、テーブルデータの回帰であればほとんど何も見ずに行えるようになった。分類問題はあまり行っていないので自信がない。
      </P>
      <P>
        回帰には<code>xgboost</code>
        というライブラリを使用している。このライブラリの行っていることは良くわかっていない。これまで試してきた回帰の中では
        <code>xgb.train()</code>
        が一番良いスコアが出る。あと、Kaggleで人気というのも大きい。他にもLightGBMというライブラリがあるらしい。また使ってみようと思う。
      </P>
      <P>機械学習の知識を使って何か面白いことはできないだろうか。今は深夜の1:30。眠気がやってきたので寝る。</P>
      <MyDivider />
      <P>呟きながらでないとチュートリアルコードを読み終える自信がないため、こちらに呟きながら読んでいく。</P>
      <ul>
        <li>
          <code>import lightgbm as lgb</code>により、LightGBMモジュールを読み込んでいる
        </li>
        <li>
          <code>optuna</code>というモジュールも読み込んでいる
        </li>
        <li>
          Seabornにフォントを設定するときは<code>sns.set("IPAexGothic")</code>のように記述する
        </li>
        <li>
          <code>xfeat</code>というモジュールに、<code>LabelEncoder</code>や<code>Pipeline</code>
          などの便利なものが色々とあるようだ。sklearnで使っているのは<code>mean_absolute_error</code>と
          <code>KFold</code>だけになっている
        </li>
        <li>
          <code>japanese_matplotlib</code>をインポートしてから<code>matplotlib.pyplot</code>
          をインポートしている。この順序に意味はあるか（入れ替えるとエラーは発生するか）
        </li>
      </ul>
      <P sx={{ mb: 1 }}>
        コードを気軽に試せるように、新たにNotebookを作成した。こちらで色々試していく。
        <br />
        そういえば、<code>rand.standard_normal()</code>
        により作成した配列をカーネル密度推定プロットに描画すると、きちんと正規分布の形になるかを知りたい。ということで実装する。
      </P>
      <CodeBlock>{STANDARD_NORMAL.trim()}</CodeBlock>
      <P sx={{ my: 1 }}>こちらのコードを実行したところ、次のようなグラフが生成された。</P>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
        <Img src={kde1} width={324} />
        <Img src={kde2} width={324} />
      </Box>
      <P sx={{ mt: 1 }}>
        2つ目の画像は、<code>.kde()</code>に<code>xlim=(-4, 4)</code>
        を渡したときの結果である。確かに正規分布の形をしているようだ。個人的には、思っていたよりも途中の傾きが真っ直ぐに見える。
      </P>
      <MyDivider />
      <P>引き続きチュートリアルコードを読む。</P>
      <ul>
        <li>
          テーブルデータに含まれる扱いづらいデータは、地道にひとつずつ置換しているようだ。例えば和暦を西暦に変換したり、数値列に稀に含まれる「30〜60」などの範囲のデータを「45」に置き換えたり
        </li>
        <li>
          <code>from glob import glob</code>の<code>glob()</code>
          を使ってファイル一覧を取得している。今回はひとつのディレクトリ内に複数のトレーニングデータが含まれているため、
          <code>glob()</code>でファイルのリストを取得してから逐次読み込んでいる
        </li>
        <li>
          <code>pd.concat</code>により行方向に結合したデータは、元のインデックス値を保持している。リセットするために
          <code>.reset_index()</code>を呼んでいる。元のインデックスを削除するために、引数として<code>drop=True</code>
          を渡している。次のコードを実行することで確認できる
        </li>
      </ul>
      <Box sx={{ my: 1 }}>
        <CodeBlock>{RESET_INDEX.trim()}</CodeBlock>
      </Box>
      <ul>
        <li>
          <L c="0, 1, 2, 0, 1, 2" />
          というインデックスが、実行後に
          <L c="0, 1, 2, 3, 4, 5" />
          に変わっていることがわかる
        </li>
        <li>
          <code>Series</code>オブジェクトはiterableではないため、<code>.iteritems()</code>
          を呼ぶことでiterableに変換している
        </li>
        <li>
          <code>df.nunique()</code>を呼び出すことで、ラベルが列名で値がユニーク値の個数な<code>Series</code>
          オブジェクトが取得できる。このメソッドは、ユニーク値の個数が1個以下の列を削除するときに使用する（このような列は情報を持たないことに等しいため）
        </li>
        <li>
          <code>Series#str.contains()</code>は<code>regex=True</code>
          引数を受け取れる。これにより、正規表現に一致するかどうかがわかる
        </li>
        <li>
          「取引時点」列には「2011年第3四半期」や「2011年第1四半期」などの値が存在する。チュートリアルコードの作成者は、これらは時系列順に並び替えて連番を割り振ったほうが良いと判断したようだ。そこで、
          <code>set</code>と<code>list</code>と<code>sorted</code>
          を使って「取引時点」列の値を昇順に並び替え、連番を割り振っている。こうしてできた新たな列には「取引時点_enc」という名前をつけている。現時点で「取引時点」列は削除しないようだ
        </li>
        <li>
          <code>df.groupby()</code>の評価値はそのままではnotebookにデータを表示できない。<code>.mean()</code>
          などの集計用のメソッドを呼び出すことで初めて描画できるようになる
        </li>
        <li>
          <code>DataFrameGroupby#agg()</code>の第一引数には<code>["sum", "mean"]</code>
          のように配列を渡せる。これにより、複数の集計関数を一度に適用できる
        </li>
        <li>
          <strong>
            <code>df.apply(func, axis=1)</code>を使うことで、各行の情報を使って新たな<code>Series, DataFrame</code>
            を作れる
          </strong>
        </li>
        <li>
          <code>Series#apply()</code>もある。こちらは、関数型プログラミングの<code>map</code>関数と同じと考えれば良い
        </li>
        <li>
          <code>optuna</code>や<code>xfeat</code>は、pipコマンドでインストールする必要がある
        </li>
        <li>
          <code>xfeat.SelectNumerical().fit_transform(df)</code>により、数値データの列だけからなる<code>DataFrame</code>
          を取得できる。対称的なのは<code>xfeat.SelectCategorical()</code>
        </li>
        <li>
          <code>xfeat.Pipeline</code>を使ってパイプラインを構築できる。
        </li>
        <li>
          特徴量生成で、「各市町村の最寄り駅からの距離の個数、平均、最小値、最大値」を作っている。これらのデータを各行に持たせることでどういった効果を狙っているかがわからない
        </li>
      </ul>
      <MyDivider />
      <P>特徴量生成はここまで。ここからはモデル構築。</P>
      <ul>
        <li>
          <code>lgb.train()</code>は<code>categorical_feature</code>
          という引数を受け取る。これは、ラベルエンコーディングされたカテゴリ変数の列名のリストを受け取る引数で、これを使うことにより、おそらくだけど、カテゴリ変数の数値の差を気にすることがなくなるのだと思う（例えば都道府県で北海道に1、沖縄に2、鹿児島に47を割り当てたとき、これらを単なる数値データとして扱うと、北海道と沖縄は近くなり、北海道と鹿児島は遠くなる。
          <code>categorical_feature</code>に列名を指定することで、このような差を気にする必要がない）
        </li>
        <li>
          しかし、<GLink href="https://qiita.com/sinchir0/items/b038757e578b790ec96a">こちらの記事</GLink>
          によると、int型の列は自動的にCategorical Featureの対象となるため、<code>SelectCategorical</code>と
          <code>LabelEncoder</code>で変換したデータを<code>lgb.train()</code>に渡すときは、
          <code>categorical_feature</code>には特に何も渡す必要がなさそう
        </li>
        <li>「sparseなデータ」とは、「0が多いデータ」のことである。one-hot encodingを行うとsparseなデータになる</li>
        <li>
          <code>lightgbm</code>には、<code>.plot_importance()</code>という、Feature
          Importanceをプロットする特別な関数が用意されている。Feature
          Importanceというのは、機械学習において重要な数値らしい
        </li>
      </ul>
      <MyDivider />
      <P>チュートリアルコードを読み終えた。これまで書いた箇条書きをまとめる。</P>
      <P>
        <code>lightgbm</code>では、<code>lgb.train()</code>に<code>categorical_feature</code>
        引数を渡すことでカテゴリ変数をLightGBMに認識させられる。カテゴリ変数はint型またはstring型でなければならないが、
        <code>xfeat</code>の<code>SelectCategorical</code>や<code>LabelEncoder</code>
        を使うことで簡単にint型に変換できる。
      </P>
      <P>
        チュートリアルコードを読むことで、カテゴリ変数の扱い方を理解できた。<code>xgboost</code>では、
        <code>DMatrix</code>コンストラクタに<code>enable_categorical=True</code>
        を渡すことでカテゴリ変数を認識させられる気がする。一度試してみる。
      </P>
      <P>
        <code>df.apply(axis=1)</code>
        の存在を知れたのは大きかった。このメソッドを使うことで、行情報を使って簡単に、新たな列を作ることができる。
        <code>.map()</code>よりも使いやすそうなので、これからは<code>.apply()</code>を頻繁に使うことになるだろう。
      </P>
      <MyDivider />
      <P>疑問点もいくつか出てきた。</P>
      <P>
        各行に「自分の属する市区町村の数値データの個数、平均、最小値、最大値」を持たせている。なぜこれらのデータを持たせているのだろう。
      </P>
      <P>
        Feature Importanceの重要性。参考にした記事とチュートリアルコードの双方で、Feature
        Importanceの値を出力している。LightGBMにも<code>lightgbm.plot_importance()</code>
        という関数が用意されている。この情報を得ることが重要な理由は何か。
      </P>
      <MyDivider />
      <P>
        チュートリアルコードをしっかりと読むことで、様々な知識が得られた。次は何をするのが良いだろう。色々と選択肢がある。CNNを試す、RNNを試す、Kaggleを使う、courseraの続きを見る、Nishikaのスコアを上げる努力をする。今は喫茶店にいる。これらのことは、外で歩きながら考えることにする。
      </P>
      <MyDivider />
      <P>
        Andrew
        Ngさんのコースでは強化学習の講義は行われないため、強化学習は後回しでも良いと思っていた。しかし、どうしても強化学習の仕組みが気になるので、自分で調べることにした。僕の記憶が誤りでなければ、強化学習はディープラーニングを前提としているところがあるので、Kerasが使えるGoogle
        Colabでも強化学習の実装は可能だと思う。まずは「Keras 強化学習」で検索してみる。
      </P>
      <P>
        <GLink href="https://github.com/keras-rl/keras-rl">keras-rl</GLink>
        を使えばサクッと強化学習を試せるようだ。Google Colab上で使ってみる。
        <GLink href="https://www.tcom242242.net/entry/ai-2/%E5%BC%B7%E5%8C%96%E5%AD%A6%E7%BF%92/keras-rl-sample/">
          こちらの記事
        </GLink>
        を参考にする。
      </P>
      <P>
        DenseとActivationはよく見るけれど、きちんと調べたことがなかった。これから調べる。Dense層は全結合層とも呼ばれる。そちらの呼び方だとすぐに理解できた。Activation層では非線形変換が行われる。Dense層で行われる線形変換をどれだけ繰り返しても結果が線形にしかならないため、それを避けるために非線形変換であるActivation層を間に挟む。Activation層で行われる変換を活性化関数と呼ぶ。活性化の英語がActivationであるためActivation層と呼ばれる。Activation層のノード数はひとつ前のノード数と等しい。ただただノードの持つ値に活性化関数を適用するだけである。
      </P>
      <P>
        バージョンの違いによるエラーをいくつか解決することで、先程の記事の手順で強化学習を実装することができた。今回行った強化学習の対象はCartPole課題と呼ばれるもので、手のひらに乗った縦長の棒を落とさないようにすることに似ている。落とさないように手のひらを左右に動かすことを機械に学ばせる。自力で実装しようとすると大変そうだが、Pythonモジュールの
        <code>gym</code>内に必要な実装のほとんどが含まれている。今回はこれを使用する。
      </P>
      <P>
        無事強化学習を実装し終えたが、まだ全然自分で実装している感じがしない。ある程度自分でも実装できるように、写経したコードの意味を理解していこうと思う。
      </P>
      <P>notebookの内容は次のようになっている。</P>
      <CodeBlock>{REINFORCEMENT_LEARNING.trim()}</CodeBlock>
      <P>
        <code>model</code>の出力層のノード数は<code>nb_actions</code>
        になっている。この値は、エージェントが次に取れる行動の個数である。CartPole課題では左右の2通りであるため、
        <code>nb_actions</code>も2になる。
      </P>
      <P>
        keras-rlの<code>Policy</code>クラスは抽象クラスで、<code>select_action</code>
        メソッドの実装のみを具象クラスに求める。具象クラスのひとつ<code>BoltzmannQPolicy</code>
        は、引数としてQ値を受け取り、戻り値として<code>nb_actions</code>
        個のランダムな値を返す（間違っているかもしれない）。
      </P>
      <P>集中力がなくなってきたので少し休憩する。</P>
    </ArticleContent>
  );
});

export default Article20220107;
