import { Box } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

const KYOMU = `
!pip install ray "ray[rllib]" >> /dev/null

import gym
from ray.rllib.agents.ppo import PPOTrainer

class GameEnv(gym.Env):
  def __init__(self, config):
    self.action_space = gym.spaces.Discrete(1)
    self.observation_space = gym.spaces.Box(0.0, 1.0, shape=(1,))
  
  def reset(self):
    return [0.0]

  def step(self, action):
    return [0.0], 1, True, {}

trainer = PPOTrainer({ "env": GameEnv, "num_workers": 0 })

for i in range(10):
  results = trainer.train()
  print(results['episode_reward_mean'])
`;

const ENV_CODE = `
class GameEnv(gym.Env):
  def __init__(self, config):
    self.action_space = gym.spaces.Discrete(9)
    self.observation_space = gym.spaces.Box(
      np.concatenate([np.full(9, 0), np.array([1])]), 
      np.concatenate([np.full(9, 2), np.array([2])]), 
      dtype=np.int32,
    )

  def _conv(self):
    return np.concatenate([ self._board.reshape(-1), np.array([self._turn]) ])

  def _judge(self):
    b = self._board
    if b[0][0] != 0 and b[0][0] == b[1][1] and b[1][1] == b[2][2]:
      return b[0][0]
    if b[0][2] != 0 and b[0][2] == b[1][1] and b[1][1] == b[2][0]:
      return b[0][2]
    for i in range(3):
      if b[i][0] != 0 and b[i][0] == b[i][1] and b[i][1] == b[i][2]:
        return b[i][0]
      if b[0][i] != 0 and b[0][i] == b[1][i] and b[1][i] == b[2][i]:
        return b[0][i]
    for i in range(3):
      for j in range(3):
        if b[i][j] == 0:
          return 0
    return -1

  def reset(self):
    self._board = np.array([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
    self._turn = 1
    return self._conv()

  def step(self, action):
    x, y = action // 3, action % 3
    if self._board[x][y] != 0:
      return self._conv(), -10000, False, {}

    self._board[x][y] = self._turn
    result = self._judge()
    if result == 0:
      self._turn = 3 - self._turn
      return self._conv(), 0, False, {}
    elif result == -1:
      return self._conv(), 0, True, {}
    else:
      return self._conv(), 10, True, {}

trainer = PPOTrainer({ "env": GameEnv, "num_workers": 0 })

for i in range(10):
  results = trainer.train()
  print(results['episode_reward_mean'])
`;

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
      <Box>
        <CodeBlock>{KYOMU.trim()}</CodeBlock>
      </Box>
      <P>
        <code>observation_space</code>を離散値の配列にしたい。
      </P>
      <P sx={{ mb: 1 }}>今は1:43。1時間以内に環境を作るところまでできた。</P>
      <Box>
        <CodeBlock>{ENV_CODE.trim()}</CodeBlock>
      </Box>
      <P sx={{ mt: 1 }}>
        学習もいい感じに進んでおり、最初は-85861の報酬だったのが10回後は-2404になっている。あと何回か学習を行えばある程度強いAIが出来上がるかも知れない。
      </P>
    </ArticleContent>
  );
});

export default Article20220109;
