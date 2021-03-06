import { Box } from "@mui/material";
import { memo } from "react";
import CodeBlock from "../../../../atoms/code-block";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import { P } from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import { SampleOthelloByLocalStorage } from "../../../othello/SampleOthelloByLocalStorage";
import { InnerBox } from "./InnerBox";
import { SampleLocalStorage } from "./SampleLocalStorage";

const CODE_FIRESTORE = `
const { users, modifyUser, deleteUser } = useFirestoreUsers();
`;

const CODE_LOCALSTORAGE = `
const { users, modifyUser, deleteUser } = useLocalStorageUsers();
`;

interface Props {}

export const Article20211222: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        &lt;br /&gt;しか使わなかった場合、Chrome
        DevToolsで文章を選択したときに全文が選択されてしまう。これは不便なので、段落ごとに&lt;p
        /&gt;で囲うのがいいと思う。ということで、これからは&lt;p /&gt;を使っていく。
      </P>
      <P>
        最近は自殺も視野に入れ始めている。自殺した時の写真を自動で撮影してデプロイし、Twitterに自動投稿すればバズりそうだ、などと考えている。まあ実行に移すことは絶対にないけれど。
      </P>
      <P>今日も仕事をする気が起きない。</P>
      <P>
        最近思考が飛び飛びになってしまっている。順序立てて考えることができない。たとえば、文章を書いている途中に別のことを考えてしまい、気がつけば全く別のことをしている。これはおそらく環境が悪いんだと思う。周りに注意を逸らすようなものばかりあるのが悪い。
      </P>
      <P>
        環境を変えるためには何をすればいいだろう。もっといいところに住むというのも悪くない。ただ、生活水準を上げることを恐れている。この考え方はおそらくひろゆきの影響だと思うけれど、生活水準を上げてしまうと元に戻すことはできない。簡単に言ってしまえば依存症と同じである。生活水準を上げてしまうことと麻薬をすることは、僕にとっては同じことである。そして、僕は依存症に対して極度の恐れがあるから、生活水準を上げることが怖い。
      </P>
      <P>
        知識を蓄積することは自分のためになると思う。それは学問だけに限らず、犬種やアニメや小説や土地の知識なども自分のためになる。なぜなら、そういった知識は人とコミュニケーションをするときに役立つからである。
      </P>
      <P>
        これまで僕は、こういった様々な知識を取り入れずに生きてきた。興味がないという姿勢を崩さず、ITの知識だけを只管に取り入れてきた。よって、僕が人と話すときに使える話題といえばITしかない。
      </P>
      <P>今の僕はどういったことなら話せるだろうか。思いついたことを書いていく。</P>
      <InnerBox>
        <P>
          Haskellについて。Haskellは純粋関数型言語である。パーサーを書くための
          <GLink href="https://hackage.haskell.org/package/parsec">Parsec</GLink>
          というライブラリが非常に優れている。パーサーを実装する際の雑多な処理を書くことなく、本質部分の実装だけに集中できる。
        </P>
        <P>
          代数的データ型を学んだことは、その後のプログラミング人生に大きな影響を与えた。具体的には、新たなプログラミング言語を学ぶとき、まず代数的データ型のようなことを実現できるかどうかを調べるようになった。異なる型を同じ型として扱いたいことがよくあり、それを実現するためには代数的データ型が最も理想に近いからである。
        </P>
      </InnerBox>
      <InnerBox>
        <P>
          Rustについて。所有権という概念があり、書き換えの権限は高々一人しか持たない。マルチスレッドプログラミングを行うときの所有権の移動がとても面白かった記憶がある。
        </P>
      </InnerBox>
      <InnerBox>
        <P>
          競技プログラミングについて。競プロをすることにより、様々な知識を学ぶことができた。コンピュータサイエンスという学問があることを後に知ったが、そこでは競プロ界隈でよく見る「計算量」や「二分探索」、「2進数」といった用語が出てきており、競プロは実生活に役に立つものだと確信した。現にRDBのインデックスは、競プロをしていれば自然と理解できる。
        </P>
        <P>
          様々な知識とは、具体的には、巡回セールスマン問題、部分和問題といった線形時間では解けない問題があること、問題を言い換えたり式変形したりすることにより問題が解きやすくなったりすること、この世には、いくら頑張っても決して超えられない人がいること、グラフ理論という分野があることなど、考えればキリがない。
        </P>
        <P>今はまた挫折してしまっているが、いつかまた再開できればいいなと思っている。</P>
      </InnerBox>
      <InnerBox>
        <P>
          ゲームの自作について。JavaScriptを使えば、新たに環境を用意することなくゲームを作ることができる。ゲーム画面を描画するための
          <code>&lt;canvas /&gt;</code>
          を用意し、そこに好きに描画していく。オセロなどの簡単なゲームであれば、通常のDOM要素を使用して実装する。このときに、Reactを使うとスマートに実装できる。
        </P>
      </InnerBox>
      <InnerBox>
        <P>
          Reactについて。React + TypeScript +
          VSCodeという組み合わせは、これまでの人生の中で最もGUIアプリを開発しやすい組み合わせである。
        </P>
        <P>
          本来、変数の状態を変更したときは、それに合わせて自分の手で画面の状態を変更しなければならない。つまり、変数と画面の同期は自分で行わなければならない。しかし、Reactを使うことにより、変数の状態の変更時に自動で画面の状態も変更してくれる。
        </P>
        <P>他にもReact Hooksというものがある。これを使うことで、副作用を綺麗に分離できるようになる。</P>
        <P>ここではFirestoreを扱うフックを考える。</P>
        <P>
          フックは「現在のFirestoreの状態…①」と「Firestoreの状態を変更する関数…②」を返すことにする。②を呼び出すとFirestoreの状態が更新され、それが終わると変更後の①がフックから渡ってくる。このときに再レンダリングが走る。
        </P>
        <P>
          Firestoreを扱うためには様々な手続きが必要である。変更を検知するためのサブスクリプション、取得したデータを扱いやすい形に変換、GUIで変更したデータをFirestoreのデータ形式に変換、など、様々な処理が必要である。こういった「Firestoreの使用者が知る必要のない処理」を、フックとして完全に分離することが可能である。
        </P>
        <P>使用者側は次のコードだけ書けば良い。</P>
        <CodeBlock>{CODE_FIRESTORE.trim()}</CodeBlock>
        <P>
          次にLocal
          Storageを扱うフックを考える。といっても、使用者側はFirestoreと全く同じインタフェースで扱える。たとえば次のようなコードになる。
        </P>
        <CodeBlock>{CODE_LOCALSTORAGE.trim()}</CodeBlock>
        <P>
          フックの実装は異なるが、使用者側はその差異を全く意識することなくデータを扱える。使用者は「localStorageにユーザー情報を保存する関数はXXXで、取得する関数はYYYだ」のように2つ以上の関数を覚える必要はなく、ただただフックの関数だけを知っていれば良い。フックの返すオブジェクトが何かがわからない場合でも、VSCodeのコード補完や「定義元に移動」を使えば予測できる。
        </P>
        <P>
          「その変数についての情報を得たければ、その変数をクリックするだけで良い」というのは便利である。VSCodeはその機能を提供してくれている。
        </P>
      </InnerBox>
      <MyDivider />
      <P>
        記事のタグには同じタグが複数含まれてはいけないため、Setデータ構造を使うのが適切である。
        <br />
      </P>
      <P>
        最終的に保存される場所がたとえSetデータ構造の存在しないRDBだとしても、フロントエンドにバックエンドの「都合」が反映されてはならない。よって、Setデータ構造が自然な選択であればSetを選択すべきである。
      </P>
      <P>JavaScriptのSetデータ構造の要素の順序は「追加された順序」である。</P>
      <CodeBlock>{`[...new Set([1, 3, 2])].join(", ")`}</CodeBlock>
      <P>
        上記のコードの評価値は<code>{[...new Set([1, 3, 2])].join(", ")}</code>になる。
      </P>
      <MyDivider />
      <P>
        僕はReact+TypeScriptが好きなので、これから開発するアプリも極力React+TypeScriptであれば良いと考えている。そして、ReactとTypeScriptの知見をもっと蓄えたいと思っている。この目的とReactで日記を書く手段の相性がとても良い。なぜかというと、日記を書いていて疑問に思ったことは、新たな環境を用意せずともすぐに試せるからだ。たとえば、Setデータ構造を配列に変換する方法を知ったときに、すぐに結果をここで試すことができる。
      </P>
      <P>
        プログラミングが可能な日記（のようなもの）として他に思いつくのは、Jupyter
        Notebookである。Pythonが流行っている理由には、Jupyter Notebookが多少なりとも関わっているのかもしれない。
      </P>
      <P>そういえば、Local Storageをまともに触ったことがない。ということで、これから試してみる。</P>
      <P>
        実際に調べる前に少し考える。Local
        Storageは文字列としてしか情報を保存できない。具体的には、オブジェクトを保存しようとすると、
        <code>[Object object]</code>
        のような文字列が保存されてしまう。よって、保存する値がオブジェクトの場合は、JSONエンコードを行ってから保存しなければならない。数値型や真偽値型も同様である。
      </P>
      <P>
        Local
        Storageを扱うフックを設計することを考える。フックはget系の関数とset系の関数を返すべきである。それ以外の値は、今は返さなくても良い。get系の関数は型引数を使って取得値の型を取得できるようにすると楽だろう。生データはJSON文字列として扱い、get時のデコードとset時のエンコードは徹底する。次のような実装になるだろう。
      </P>
      <MyDivider />
      <P>
        自分で開発せずとも、既に
        <GLink href="https://github.com/juliencrn/usehooks-ts">usehooks-ts</GLink>
        というライブラリに<code>useLocalStorage</code>
        というフックがあった。このフックは想像以上の出来で、別の場所で書き換えられた値の変更も検知できるようだ。
      </P>
      <Box>
        <SampleLocalStorage />
      </Box>
      <P>
        <code>useLocalStorage</code>を使って簡単なコンポーネントを作成した。ボタンを押すと、Local
        Storageに保存されているオブジェクトの値を書き換える。その証拠として、ボタン押下後にページをリロードしても状態は保持されていることがわかる。
      </P>
      <MyDivider />
      <Box sx={{ my: 2 }}>
        <SampleOthelloByLocalStorage />
      </Box>
      <P>状態をLocal Storageに保存するオセロゲームを作った。リロードしてもゲームの状態は保持される。</P>
    </ArticleContent>
  );
});

export default Article20211222;
