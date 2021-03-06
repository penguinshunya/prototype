import { Box } from "@mui/material";
import { memo } from "react";
import MyDivider from "../../../../atoms/divider";
import GLink from "../../../../atoms/global-link";
import Img from "../../../../atoms/image";
import L from "../../../../atoms/latex";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import holotree from "./images/holotree2.jpg";
import wataten from "./images/wataten.jpg";

interface Props {}

export const Article20211224: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>
        やっぱり僕は文章が書けない。書いては消してを繰り返し、結局は何も書かずに終わる。今書いている文章も数分後には消してしまっているかもしれない。できれば今書いている文章は残したい。
      </P>
      <MyDivider />
      <P>
        僕はこれまで様々なブログを開設してきたが、どれも中途半端なところで途切れている。その原因は環境だと思う。あまりないことだけど、ブログサービスは突然終了することがある。長年書いてきた記事が突然削除されてしまうのは怖いというのが原因のひとつだと思う。
      </P>
      <P>
        自由度が低いことも原因として考えられる。ブログの記事には様々な種類がある。たとえば競プロの解説記事であったり、TypeScriptコードの説明であったり。時には小さなプログラムをそのまま掲載したいこともある。これらの要望を全て満たすようなブログサービスはおそらく存在しない。とはいうものの、WordPressのようなブログサービスにはプラグインという仕組みがあり、その仕組みを使うことで、これらの要望のほぼ全てを満たせるだろう。もし欲しいプラグインがなくても、自分でプラグインを開発することができる。
      </P>
      <P>
        しかし、こうしてできたブログは、様々なプラグインが組み込まれたものになってしまう。その中には、相互に影響し合うようなプラグインの組み合わせも存在するだろう。他のプラグインから独立するように設計されていればまだ良いが、導入するすべてのプラグインがそうとは限らない。そして、コードからそれを判定するのは難しい。よって、結局はレビューや星の数などから判断することになる。しかしこれらの情報も信頼できないかもしれない。もしかするとさくらが紛れているかもしれない。
      </P>
      <P>
        そうやって考えていくと、プラグインシステムの存在するブログサービスを利用する意欲がなくなる。最初は運良くプラグインなしで書きたい記事が書けていたとしても、いずれはプラグインが必要になる。プラグインを導入すると、先程述べた問題が発生するかもしれないのでプラグインを入れなくなる。そしてブログの投稿を途絶えさせる。
      </P>
      <P>
        以前の記事でも書いた気がするけれど、React+TypeScript(+VSCode)という環境は、ほぼ僕の理想のブログサービスの形だ。
      </P>
      <P>
        プラグインの代わりにNPMというパッケージ管理システムがある。このシステムが優れているため、パッケージ同士が影響し合うようなことは今のところ経験していない。そしてReactを使うことで、UIのデザインを記事毎に独立させることができる。生のCSSを使う場合はこうはいかないだろう。ある記事だけに適用したいCSSが、他の記事にも影響を与えることがある。
      </P>
      <P>
        TypeScriptとVSCodeの組み合わせも素晴らしい。記事を書いている途中に何らかのTypeScriptプログラムを書きたくなったとき、TypeScriptの型安全性とVSCodeのコード補完が開発を容易にしてくれる。
      </P>
      <P>今の環境はほぼ僕の理想なので、ブログの更新を続けられそうだ。</P>
      <MyDivider />
      <P>今日は秋葉原に行きたい。ホロライブのクリスマスツリーが飾ってあるので、一度見ておきたい。</P>
      <MyDivider />
      <P>
        <strong>依存するものによって将来は大きく変わる。依存するものを適切に選ぶ必要がある。</strong>
      </P>
      <P>
        身近な例としては住む場所などがある。先程のブログサービスも同じである。依存先をWordPressにすると、それに付随するプラグインシステムにも同時に依存することになる。
      </P>
      <P>
        依存するもの
        <L c="X" />が<L c="Y" />
        に依存するとき、
        <L c="Y" />
        が信用できないものであれば
        <L c="X" />
        に依存しないほうが良い。
      </P>
      <P>
        これに則れば、WordPressはプラグインシステムに依存し、プラグインシステムは信用できないため、WordPressは使わないほうが良いという結論になる。
      </P>
      <P>
        Create React AppはNPMとwebpackとTypeScriptとFacebookに依存する。これらはどれも信用できるため、Create React
        Appも信用できる可能性は高く、依存の障壁は低い。
      </P>
      <MyDivider />
      <P>
        iPhoneの写真の拡張子は.HEICなので、ブラウザで表示するためには.jpegなどの拡張子に変換しなければならない。そこで.HEICを.jpegに変換する方法をネットで調べたのだけど、検索結果として
        <GLink href="https://www.tku.ac.jp/iss/guide/classroom/soft/heicjpg.html">こちらのサイト</GLink>
        がヒットした。ドメインが.ac.jpであるため大学公式のサイトだが、まさか大学公式のサイトにこのような実用的な記事が投稿されているとは思わなかった。ただ、やはり大学公式サイトの記事というだけあって不必要なことは書かれておらず、問題の解決のみに集中できる。僕も記事を書くときは見習いたい。
      </P>
      <MyDivider />
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Img src={holotree} width={256} />
      </Box>
      <P sx={{ my: 0 }}>秋葉原のクリスマスツリーを見てきた。</P>
      <P>
        写真では見えないが、ツリーの右下のところに、上を見上げるようにカメラが設置されていた。このカメラで映された映像はYouTube
        Liveとして配信されているため、カメラに映らないよう気をつけながらツリーの周りを歩いていた。
      </P>
      <P>ツリーの裏側にはぺこらやルーナのイラストもあった。</P>
      <P>
        5分ほど眺めたあとは家に帰ろうと思ったが、ホロライブのグッズなどがあれば欲しいなと思いながらいくつかのショップに立ち寄った。しかし、ホロライブのグッズは見つけられなかった。もしかすると、ホロライブのグッズはネットでしか販売していないのかもしれない。
      </P>
      <P>
        いくつかのショップに立ち寄っていると、偶然にも
        <GLink href="http://watatentv.com/">わたてん</GLink>
        のイベントブースを見つけた。
      </P>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <Img src={wataten} width={256} />
      </Box>
      <P>どうやら2022年に劇場版映画が公開されるようだ。それに先駆けて1ヶ月間ほど専用のショップが開かれる。</P>
      <P>
        <GLink href="http://watatentv.com/news_movie/article009.html">
          ニュース | アニメ「私に天使が舞い降りた！プレシャス・フレンズ」公式サイト
        </GLink>
      </P>
      <P>
        リコーダーを持った乃愛のアクリルスタンドが置いてあり、それが可愛かったので購入しようと思ったのだけど、売り切れだった。そもそも僕の部屋にはアクリルスタンドを置くスペースがないので、もし売り切れでなくても買わなかっただろうけれど…。ただ、何でもかんでも「部屋が狭い」という理由で何も置かないのは寂しい。少しくらい部屋を自分好みにしたい。ということで、次に秋葉原に出向いたときはポスターでも買おうと思う。夜のホロライブツリーも見てみたいので、今日の夜にもおそらく秋葉原に出向く。そのときにポスターも購入しよう。
      </P>
      <MyDivider />
      <P>
        記事の数が18になり、すべての記事を一度に表示するときに重さを感じるようになった。そろそろページングを実装するタイミングかもしれない。ただ、ページングを実装するということは、なんとなくすべての記事に目を通したいときなどにスクロールだけでは済まなくなるということなので、できれば避けたいという気持ちがある。可能であれば最適化された無限スクロールを実装したいけれど、自分で開発すると様々なバグを埋め込んでしまいそうだ。今はページングにしておこう。
      </P>
      <P>
        ページングを実装するためには、クエリパラメータを取得する必要がある。クエリパラメータを取得するフックがreact-useにあった気がする。今調べると
        <code>useSearchParam</code>が使えそうだ。
      </P>
      <P>
        react-useの<code>useSearchParam</code>はReact
        Routerのページ遷移に対応しておらず、ページ遷移したにもかかわらずフックが再更新されないという問題がある。ということで、代わりにReact
        Routerの<code>useSearchParams</code>を使うことにした。
      </P>
    </ArticleContent>
  );
});

export default Article20211224;
