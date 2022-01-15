import { Typography } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import L from "../../../../atoms/latex";
import P from "../../../../atoms/p";
import Q from "../../../../atoms/q";
import ArticleContent from "../../../../molecules/article-content";

const DROPOUT = `
import tensorflow as tf
input = tf.random.uniform((2, 3, 5))
output = tf.keras.layers.Dropout(0.1)(input)
print(input)
print(output)
`;

const FINE_TUNING_FREEZE = `
for param in model.parameters():
  param.requires_grad = False
`;

interface Props {}

export const Article20220115: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>機械学習の勉強が楽しい。これまでできなかったことができるようになっていく。</P>
      <P>昨日は、TensorFlowのチュートリアルに沿ってTransformerを構築した。構築していく上で得た知識を書いていく。</P>
      <P>
        Embeddingを使うことで、整数をベクトルに変換できる。そのベクトルに位置エンコーディングベクトルを足すことにより準備は完了する。Encoder-Decoderモデルでは、このベクトルはまずMulti-Head
        Attentionに渡す。といっても、渡す前にQ、K、Vの各Dense層にベクトルが渡され、その結果がMulti-Head
        Attentionに渡される。
      </P>
      <Q solved>
        <Typography>Transformerではどのように訓練を行い、どのように予測するか？</Typography>
        <MyDivider />
        <Typography>
          訓練データの正解のトークン列の、最後のトークンだけを抜いてTransformerに渡す。そうして得た次トークンの予測が、先程抜いたトークンと一致していれば正解とする。
          <br />
          予測については、エンコーダに翻訳したいトークン列を、デコーダに「文の開始」を表すトークンだけからなるトークン列を渡す。すると次のトークンが得られる。これを繰り返し、予測結果が「文の終わり」を表すトークンになったときに終了する。これで翻訳ができている。
        </Typography>
      </Q>
      <Q>
        <Typography>文をベクトルに変換する方法を知りたい。</Typography>
      </Q>
      <Q>
        <Typography>
          2022年1月時点での、英文をトークン列またはベクトル列に変換する最良の方法。<code>transformers</code>
          モジュールを使う？
        </Typography>
      </Q>
      <Q>
        <Typography>
          <code>Dropout</code>の使い方。次のコードを動かしても出力内容が同じで、ドロップアウトされているように見えない。
        </Typography>
        <CodeBlock>{DROPOUT.trim()}</CodeBlock>
      </Q>
      <Q solved>
        <Typography>
          <code>bert-base-cased</code>と<code>bert-base-uncased</code>の違い
        </Typography>
        <MyDivider />
        <Typography>
          変換時に小文字にするかどうか。<code>cased</code>は小文字にせず、<code>uncased</code>は小文字にする。
        </Typography>
      </Q>
      <Q>BERTを使うとき、Encoder-DecoderモデルのDecoder部分を実装することになるか？</Q>
      <P>
        Huggingface
        Transformersのドキュメントが読み辛い。APIの具体的な使い方がわからない。GitHubにexamplesなどのドキュメントがあるといいけど。と思ってGitHubリポジトリを見ると、
        <GLink href="https://github.com/huggingface/transformers/tree/master/examples/tensorflow">こちら</GLink>
        にあった。
      </P>
      <MyDivider />
      <P>
        TensorFlowしか勉強する気はなかったけれど、検索にヒットする上位記事はPyTorchで書かれているものが多いため、PyTorchも勉強することにした。「pytorch
        勉強」で検索すると、
        <GLink href="https://takuroooooo.hatenablog.com/entry/2020/10/30/Keras%E3%82%92%E5%8B%89%E5%BC%B7%E3%81%97%E3%81%9F%E5%BE%8C%E3%81%ABPyTorch%E3%82%92%E5%8B%89%E5%BC%B7%E3%81%97%E3%81%A6%E8%BA%93%E3%81%84%E3%81%9F%E3%81%93%E3%81%A8">
          『Kerasを勉強した後にPyTorchを勉強して躓いたこと』
        </GLink>
        というページがヒットした。まさに僕のために用意されたページだと思った。
      </P>
      <ul>
        <li>PyTorchは「Define by Run」というアプローチを取っている？</li>
        <li>
          PyTorchでは、GPUを使いたいときに明示的に指定する必要がある（
          <code>device = torch.device("cuda:0"); model = model.to(device)</code>のように書く）。データも
          <code>.to()</code>を使ってGPUに転送する
        </li>
        <li>
          モデルは「学習状態」か「評価状態」かを持っている。学習状態に移行する場合は<code>model.train()</code>
          を、評価状態に移行する場合は<code>model.eval()</code>
          を呼び出す。これはレイヤーの挙動がこれら状態によって変化することがあるため（そういえばTensorFlowでも、
          <code>Dropout</code>には<code>training</code>
          という真偽値を受け取る引数があった。ドロップアウト層の挙動はどう変わるんだろう？）
        </li>
        <li>
          PyTorchと関係ないけれど、先程のページに「学習中は計算グラフを作って、誤差逆伝播法で誤差を計算グラフ上に伝播させて重みを更新する必要がある」と書かれている。TensorFlowで
          <code>with GradientTape() as tap:</code>としていたのは、裏で計算グラフを構築するためだったのかもしれない
        </li>
        <li>評価状態のときは計算グラフを構築する必要はないため、裏での計算グラフの構築は行われない</li>
      </ul>
      <P>このページに書かれている情報はこれだけだった。意外とTensorFlowとPyTorchの違いはそんなにないのかもしれない。</P>
      <MyDivider />
      <P>
        <GLink href="https://pytorch.org/blog/computational-graphs-constructed-in-pytorch/">こちらの記事</GLink>
        では、PyTorchで行われている計算グラフの構築について、C++のコードを交えて具体的に説明してくれている。本筋とはズレるけれど、PyTorchは
        <GLink href="https://github.com/pytorch/pytorch/blob/e7cd59c7a061c78d8d0265e4308b5933e44f9176/tools/autograd/derivatives.yaml#L840-L843">
          このようなYAMLファイル
        </GLink>
        を作ってC++を自動生成しているようだ。C++だけで記述しようとすると冗長になってしまうのだろうか。
      </P>
      <P>
        <GLink href="https://pytorch.org/tutorials/beginner/blitz/tensor_tutorial.html">
          PyTorch公式のチュートリアル
        </GLink>
        を進めていく。
      </P>
      <ul>
        <li>演算子オーバーロードが本当に楽</li>
        <li>
          値を書き換えるときは<code>tensor[:,1] = 0</code>と書ける
        </li>
        <li>テンソルの形を変えたり結合したりするのは直感的に行える</li>
        <li>
          <code>.T</code>も問題なく使える
        </li>
        <li>テンソルの通常メソッドを呼び出しても元の値は書き換えられない</li>
        <li>
          元の値を書き換えるときはメソッドの末尾に<code>_</code>をつける（ただし計算の履歴には残らない）
        </li>
        <li>
          <code>.numpy()</code>でndarray型に変換（TensorFlowと同じ）
        </li>
        <li>関数の実行タイミングを相手に任せたいときに関数渡しを行う</li>
        <li>
          PyTorchは状態が暗黙的に書き換えられることが多い気がする。たとえば、<code>.backward()</code>
          を呼び出すとテンソルの
          <code>.grad</code>プロパティが書き換えられるし、<code>.eval()</code>
          を呼び出すと評価状態に移行する。前者の例で、もし<code>.backward()</code>
          を呼び出さなかったら、最適化時にどうなるんだろう？
        </li>
        <li>
          <GLink href="https://pytorch.org/tutorials/beginner/blitz/autograd_tutorial.html">こちらのページ</GLink>
          に、自動微分の具体的な説明がありそう。これから読んでいく
        </li>
      </ul>
      <MyDivider />
      <ul>
        <li>
          <L c="a" />と<L c="b" />
          をパラメータとして、
          <L c="Q = 3a^3 - 2b" />
          で表せる
          <L c="Q" />
          を損失とする。
          <L c="Q" />の<code>.backward()</code>を実行すると、各パラメータの<code>.grad</code>
          が更新される。更新される値は、
          <L c="a" />は<L c="\frac{\partial Q}{\partial a} = 9a^2" />、<L c="b" />は
          <L c="\frac{\partial Q}{\partial b} = -2b" />
          である
        </li>
        <li>
          本筋とはズレるけど、チュートリアルは「説明→実装」のことが多い気がする（実装が先なのは稀？）。PyTorchチュートリアルは実装が後で統一されているため、コードブロックの上の余白は小さく、下の余白は大きくなっている。このブログでもそうしようかな
        </li>
        <li>
          引数なしの<code>.backward()</code>は、スカラー出力に対してのみ有効。今回の
          <L c="Q" />
          はベクトルであるため、<code>external_grad = torch.tensor([1., 1.]); Q.backward(gradient=external_grad)</code>
          とする必要がある
        </li>
        <li>
          <code>.backward()</code>呼び出し毎に計算グラフが0から構築される
        </li>
        <li>
          <strong>ファインチューニングでは、ほとんどのパラメータは「凍結」される。</strong>
          凍結するために次のようなコードを書く
        </li>
      </ul>
      <CodeBlock>{FINE_TUNING_FREEZE.trim()}</CodeBlock>
      <ul>
        <li>
          上記のように全パラメータを凍結した後、<code>model.fc = nn.Linear(512, 10)</code>
          のように書くことで既存のレイヤーを上書きする。ファインチューニングは思っていた以上に簡単！（PyTorchの場合だけ？）
        </li>
      </ul>
      <MyDivider />
      <P>
        PyTorchのチュートリアルを進めることで、ファインチューニングの具体的な方法を知ることができた。これは予想外だった。TensorFlowとPyTorchの2つのライブラリを勉強することで、得られる情報の量は2倍される（PyTorchを知らなかった頃は、TensorFlowで書かれたコードしか読まなかったため）。よって、これまで知れなかったことを知ることができる。語学を勉強することの楽しさが少しわかった気がする。英語を理解すればどれだけ世界が広がるだろうか。
      </P>
      <ul>
        <li>
          <code>weight = weight - learning_late * gradient</code>という物凄くわかりやすい更新式
        </li>
        <li>PyTorchでは、入力の次元数を明示的に指定する必要がある。初学者はPyTorchのほうがいいかも</li>
        <li>
          PyTorchでモデルを自作するときに実装が必要なメソッドは<code>.forward(self, x)</code>。<code>.backward()</code>
          は自動で作られる
        </li>
      </ul>
    </ArticleContent>
  );
});

export default Article20220115;
