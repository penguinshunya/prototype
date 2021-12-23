import dayjs, { Dayjs } from "dayjs";
import Article20110620 from "../components/organisms/articles/2011-06-20";
import Article20110703 from "../components/organisms/articles/2011-07-03";
import Article20110704 from "../components/organisms/articles/2011-07-04";
import Article20110716 from "../components/organisms/articles/2011-07-16";
import Article20110801 from "../components/organisms/articles/2011-08-01";
import Article20110831 from "../components/organisms/articles/2011-08-31";
import Article20110919 from "../components/organisms/articles/2011-09-19";
import Article20191224 from "../components/organisms/articles/2019-12-24";
import Article20191225 from "../components/organisms/articles/2019-12-25";
import Article20191227 from "../components/organisms/articles/2019-12-27";
import Article20211220 from "../components/organisms/articles/2021-12-20";
import Article20211221 from "../components/organisms/articles/2021-12-21";
import Article20211222 from "../components/organisms/articles/2021-12-22";
import { Article20211223 } from "../components/organisms/articles/2021-12-23";

export interface ArticleType {
  id: string;
  Content: React.VFC;
  date: Dayjs;
  title?: string;
  tags: Set<string>;
}

// prettier-ignore
export const articles: ArticleType[] = [
  { id: "393e2ed4-2abc-7520-23b5-fb90b1154b11", Content: Article20110620, date: dayjs("2011-06-20"), title: "傾斜影響の求め方", tags: new Set(["パンヤ"]) },
  { id: "56d5cf7e-7e7e-60a1-e37d-bfb1f9ef9d01", Content: Article20110703, date: dayjs("2011-07-03"), title: "正確にずらす方法①", tags: new Set(["パンヤ"]) },
  { id: "321f4b15-d9df-6562-dcd1-4e937173219c", Content: Article20110704, date: dayjs("2011-07-04"), title: "正確にずらす方法②", tags: new Set(["パンヤ"]) },
  { id: "593177b5-24dd-2301-1d28-520da24014cd", Content: Article20110716, date: dayjs("2011-07-16"), title: "動画上げたでござる", tags: new Set(["パンヤ"]) },
  { id: "b0374d59-5953-a5bf-d9d5-2dfddf00373a", Content: Article20110801, date: dayjs("2011-08-01"), title: "シーズンカップの結果", tags: new Set(["パンヤ"]) },
  { id: "0f38385a-b0b6-e1b3-8154-34af70f2f781", Content: Article20110831, date: dayjs("2011-08-31"), title: "BlueWater楽しいです", tags: new Set(["パンヤ"]) },
  { id: "0b1da542-86a0-b496-1202-61d06bf5a26c", Content: Article20110919, date: dayjs("2011-09-19"), title: "SW2万pp", tags: new Set(["パンヤ"]) },
  { id: "462b8eb4-8fb2-8d1e-9729-66b014df0559", Content: Article20191224, date: dayjs("2019-12-24"), tags: new Set(["プログラミング"]) },
  { id: "e777ddad-11d5-afbc-a26f-c9c9bdf0dc1a", Content: Article20191225, date: dayjs("2019-12-25"), tags: new Set(["プログラミング"]) },
  { id: "a0dad16c-3225-93ac-36be-f5c376fee2bc", Content: Article20191227, date: dayjs("2019-12-27"), tags: new Set(["プログラミング"]) },
  { id: "19d5dc6e-b1c4-aa99-1784-ecd7bc7f2ef6", Content: Article20211220, date: dayjs("2021-12-20"), tags: new Set([]) },
  { id: "b29f829e-1856-077d-60c6-a601fee9b234", Content: Article20211221, date: dayjs("2021-12-21"), tags: new Set(["プログラミング"]) },
  { id: "3be4f786-56ba-79df-8554-75eb38660329", Content: Article20211222, date: dayjs("2021-12-22"), tags: new Set(["プログラミング"]) },
  { id: "982c9eaf-3b32-8f7b-3962-5283437e4048", Content: Article20211223, date: dayjs("2021-12-23"), tags: new Set(["プログラミング"]) },
];