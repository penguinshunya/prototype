import { Box, Divider } from "@mui/material";
import { memo } from "react";
import Image from "../../../../atoms/image";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";
import star from "./images/star.png";

interface Props {}

export const Article20211228: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>今日も仕事のやる気が出ない。</P>
      <P>
        ラプ様が、今年は600冊の本を読んだと言っていた。がむしゃらに本を読んでいても、読んでいる本の数は言えない。よって、ラプ様は意識して本を読み続けていることになる。本を読み終わったらどこかに記録でもつけているのだろうか。
      </P>
      <P>
        何かを成し遂げるためには何かを積み重ねる必要がある。僕は毎日文章を書いているが、それ以上のことはしていない。本を読んだり他の人の文章を読んだりしていない。そのため、文章はいつまで経っても成長していないように思う。これは良くない。やはり、自分の考えを正確に表現するためには、ただアウトプットしているだけでは駄目で、何らかのインプットを行う必要がある。
      </P>
      <P>
        最近読んだ本といえば『そして誰もいなくなった』である。ニコ動にある『超幻想郷級のダンガンロンパ』シリーズ内で「面白い」と紹介されていたため読んだ。この本は他の場所でも紹介されており、全員死ぬという結末を知っていたため、次に殺される参加者は誰だろう、どんな殺され方をするのだろうとドキドキしながら読んだ。ここは誰も見ないと思うので遠慮なくネタバレするけれど、まさか犯人が判事だとは思わなかった。途中までは医者が怪しいと思っていて、最後の2人になったときは外部犯かと疑った。本の中でいくら「この参加者の中に犯人がいる」と書かれていても、そう思わずにはいられなかった。しかし、推理もので外部犯であることなんて絶対にないので、結局最後の最後まで犯人を予想できなかった。
      </P>
      <P>
        法で裁かれなかった人のうち、罪の軽いものから先に殺していくと犯人は言っていたが、子供2人を轢いた若者が最初に殺された。僕的には、体育教師よりも罪は重たく感じる。…体育教師が子供を殺した動機は何だっただろう？思い出せない。お金のためだっただろうか。それとも子供またはその親に何らかの憎しみを抱いていたからだろうか。
      </P>
      <P>
        本とネットで調べていると、限嗣（げんし）相続という言葉が出てきた。これは相続の順序を規定する制度のことである。
      </P>
      <P>
        『そして誰もいなくなった』では、ヴェラの愛していたフィーゴよりも、まだ幼いシリルのほうが相続の優先度が高かった。よって、シリルがいなくなることでフィーゴに財産が与えられるようになる。シリルは泳ぐのが得意ではなく、それを知っていたヴェラは、遠くにある岩までシリルを泳がせた。そしてシリルは死んだ。
      </P>
      <P>
        ヴェラがシリルに行ったことは、「岩まで泳いでいいわよ」という発言だけである。しかし、そこには明確な殺意があった。2人の子供を殺した若者には殺意はなかっただろう。その点で、ウォーグレイヴ判事はヴェラを重罪としたのだと思う。
      </P>
      <P>
        「言葉とは凶器」と聞いたことがあるけれど、その意味が少しわかった気がする。ヴェラは、ただただ「岩まで泳いでいいわよ」と発言しただけである。その言葉にはマイナスの言葉が一切含まれていない。しかし、その言葉が最も重罪だとウォーグレイヴ判事は判断した。それが面白い。
      </P>
      <P>
        凶悪な殺人と聞くと無差別な連続殺人犯を思い浮かべるけれど、言葉だけで人を殺して法で裁かれていない殺人が、最も凶悪な殺人かもしれない。そう考えると、僕も何らかの殺人を行ったことがあるかもしれない。
      </P>
      <P>言葉は慎重に使おう、と思った。</P>
      <Divider />
      <P>
        話を元に戻すと、ラプ様は毎日何らかの積み重ねをしている。僕も何らかの積み重ねをしたい。それは、自分のためになるようなものであって欲しい。
      </P>
      <P>
        Reactで毎日ひとつのコンポーネントを作るのは良さそうだ。これを100日続けると100個のコンポーネントが作られる。この100個のコンポーネントは、それ以降仕事をしていく上で、ライセンスの問題を一切気にすることなく使うことができる。
      </P>
      <P>
        そう考えると、毎日小さなイラストを作ることも悪くないかもしれない。最初は本当に単純なもので良い。パズルのピースのアイコンでも十分に役に立つ。
      </P>
      <P>
        正直言うと、今はプログラミングよりもイラスト作成のほうに興味がある。ということで、毎日イラストを作成することに決めた。イラストの形はどんなものでも良い。単純な三角形でも良いし、四角形でも良い。とりあえず何かを完成させる。そしてここに公開する。単純な形であっても、キャラと組み合わせることで見栄えのするものになるかもしれない。
      </P>
      <Box sx={{ my: 2 }}>
        <Image src={star} />
      </Box>
      <P>星のアイコンを作った。たったこれだけの画像を作るだけでも様々が知識が必要なことがわかった。</P>
      <P>
        まずは一筆で星を描いたのだが、当然一発では綺麗な星は描けない。よって、一度星を描き、その星を修正するという手順で作業を行った。しかし、いくら修正しても綺麗にならない。一部の線がぼやけていたり、線が微妙にガタガタしていたりする。それらを上塗りや消しゴムで修正しようとしても、なかなか直らない。直ったと思って全体を見ても、一部が小さかったり、回転させるとバランスが崩れていたりする。
      </P>
      <P>
        手だけで綺麗な星は描けないとわかったので、Clip Studioの機能を使うことにした。Clip
        Studioの「対称定規」を使うことで、ある点を中心とするN角形の図形を簡単に描くことができる。その他にも「直線定規」と「曲線定規」を使うことで、上記のアイコンのような綺麗な星を描くことができた。
      </P>
      <P>
        描き終わった後も作業が残っている。Clip
        StudioでPNGとして出力し、それをSurfaceからMacに移す必要がある。出力する際は、Clip
        Studioの「用紙」レイヤーを非表示にしないと背景が透明にならない。SurfaceからMacに移す際にはGoogleドライブを利用した。このあたりはまだまだ改善できそうだ。毎日イラストを描き続けながら改善していく。
      </P>
      <P>次は何を描こうか。</P>
    </ArticleContent>
  );
});

export default Article20211228;