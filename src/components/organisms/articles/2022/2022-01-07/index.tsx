import { Box, Divider } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import GLink from "../../../../atoms/global-link";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

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
        <li>上記のような自作の目的関数は次のように使用する</li>
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
      <Divider />
      <P>最近は箇条書きの日記ばかり書いていた、久しぶりに文章の日記を書く。</P>
      <P>
        機械学習には様々なアルゴリズムが存在するため、問題に対して適切なアルゴリズムを選択する能力が必要である。ここ数日間は機械学習の勉強に没頭したため、テーブルデータの回帰であればほとんど何も見ずに行えるようになった。分類問題はあまり行っていないので自信がない。
      </P>
      <P>
        回帰には<code>xgboost</code>
        というライブラリを使用している。このライブラリの行っていることは良くわかっていない。これまで試してきた回帰の中では
        <code>xgb.train()</code>
        が一番良いスコアが出るという理由だ。あと、Kaggleで人気というのも大きい。他にもLightGBMというライブラリがあるらしい。また使ってみようと思う。
      </P>
      <P>機械学習の知識を使って何か面白いことはできないだろうか。今は深夜の1:30。眠気がやってきたので寝る。</P>
    </ArticleContent>
  );
});

export default Article20220107;
