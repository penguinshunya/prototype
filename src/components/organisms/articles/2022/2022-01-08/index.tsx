import { Box } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import Img from "../../../../atoms/image";
import L from "../../../../atoms/latex";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import result1 from "./images/result.png";

const POINT_ON_LINE = `
!pip install gym keras-rl2 >> /dev/null

import gym
import gym.spaces
import numpy as np

class PointOnLine(gym.core.Env):
  def __init__(self):
    # 行動空間。速度を上げる、そのまま、下げるの3通り
    self.action_space = gym.spaces.Discrete(3)
    high = np.array([1.0, 1.0]) # 観測空間(state)の次元(位置と速度の2次元)とそれらの最大値
    self.observation_space = gym.spaces.Box(low=-high, high=high)
    # 行動空間と観測空間の作成
  
  def step(self, action):
    dt = 0.1
    acc = (action - 1.0) * 0.1
    self._vel += acc * dt
    self._vel = np.clip(self._vel, -1.0, 1.0)
    self._pos += self._vel * dt
    self._pos = np.clip(self._pos, -1.0, 1.0)

    # episodeを終了するかどうか
    done = abs(self._pos) < 0.1 and abs(self._vel) < 0.1
    if done:
      reward = 1.0  # 終了時に報酬を与える
    else:
      reward = -0.01 * abs(self._pos)
    
    # 次の状態、報酬、episodeを終了するか、追加情報
    return np.array([self._pos, self._vel]), reward, done, {}

  def reset(self):
    self._pos = np.random.rand() * 2.0 - 1.0
    self._vel = 0.0
    return np.array([self._pos, self._vel])

from keras.models import Sequential
from keras.layers import Dense, Activation, Flatten
import keras

from rl.agents.dqn import DQNAgent
from rl.policy import EpsGreedyQPolicy
from rl.memory import SequentialMemory

env = PointOnLine()
nb_actions = env.action_space.n

model = Sequential()
model.add(Flatten(input_shape=(1,) + env.observation_space.shape))
model.add(Dense(16))
model.add(Activation('relu'))
model.add(Dense(16))
model.add(Activation('relu'))
model.add(Dense(16))
model.add(Activation('relu'))
model.add(Dense(nb_actions))
model.add(Activation('linear'))

memory = SequentialMemory(limit=50000, window_length=1)
policy = EpsGreedyQPolicy(eps=0.1)
dqn = DQNAgent(model=model, nb_actions=nb_actions, memory=memory, nb_steps_warmup=100,
                target_model_update=1e-2, policy=policy)
dqn.compile(keras.optimizers.adam_v2.Adam(learning_rate=1e-3), metrics=["mae"])

history = dqn.fit(env, nb_steps=50000, visualize=False, verbose=2, nb_max_episode_steps=300)

import rl.callbacks
class EpisodeLogger(rl.callbacks.Callback):
  def __init__(self):
    self.observations = {}
    self.rewards = {}
    self.actions = {}

  def on_episode_begin(self, episode, logs):
    self.observations[episode] = []
    self.rewards[episode] = []
    self.actions[episode] = []
  
  def on_step_end(self, step, logs):
    episode = logs["episode"]
    self.observations[episode].append(logs['observation'])
    self.rewards[episode].append(logs['reward'])
    self.actions[episode].append(logs['action'])

cb_ep = EpisodeLogger()
dqn.test(env, nb_episodes=10, visualize=False, callbacks=[cb_ep])

import matplotlib.pyplot as plt
for obs in cb_ep.observations.values():
  plt.plot([o[0] for o in obs])
plt.xlabel("step")
plt.ylabel("pos")
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
      <CodeBlock>{POINT_ON_LINE.trim()}</CodeBlock>
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
    </ArticleContent>
  );
});

export default Article20220108;
