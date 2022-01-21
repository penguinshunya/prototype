import { memo } from "react";
import MyDivider from "../../../../atoms/divider";
import P from "../../../../atoms/p";
import ArticleContent from "../../../../molecules/article-content";

interface Props {}

export const Article20220121: React.VFC<Props> = memo(() => {
  return (
    <ArticleContent>
      <P>昨日は結局夜にうまく寝られなかったので、早朝に秩父多摩甲斐国立公園に行くことができなかった。</P>
      <MyDivider />
      <P>
        丸刈りにした。理由は、最近抜け毛が酷く、部屋を掃除しても1週間後には床に沢山の髪の毛が落ちており、それがストレスになっていたからだ。6mmにしてもらったのだけど、思ったよりもハゲていない。スキンヘッドではなく坊主という感じ。
      </P>
      <P>
        散髪屋から帰ってくると床を掃除した。これまでは、いくら床掃除をしても1週間ほどで髪の毛だらけになるのでやる気が出なかった。丸刈りにすることで、少なくとも数週間は床の髪の毛について気にならなくなる。あと、シャンプーを使わずともお湯だけでさっぱりできるのも凄くいい。リンスを使う必要もないし、ドライヤーをする必要もないし、クシでとかす必要もない。そして、頭皮を洗いやすくなったので、もしかすると抜け毛が減るかもしれない。丸刈りは楽だ。
      </P>
    </ArticleContent>
  );
});

export default Article20220121;
