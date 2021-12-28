import dayjs, { Dayjs } from "dayjs";
import Article20110620 from "../components/organisms/articles/2011/2011-06-20";
import Article20110703 from "../components/organisms/articles/2011/2011-07-03";
import Article20110704 from "../components/organisms/articles/2011/2011-07-04";
import Article20110716 from "../components/organisms/articles/2011/2011-07-16";
import Article20110801 from "../components/organisms/articles/2011/2011-08-01";
import Article20110831 from "../components/organisms/articles/2011/2011-08-31";
import Article20110919 from "../components/organisms/articles/2011/2011-09-19";
import Article20191224 from "../components/organisms/articles/2019/2019-12-24";
import Article20191225 from "../components/organisms/articles/2019/2019-12-25";
import Article20191227 from "../components/organisms/articles/2019/2019-12-27";
import Article20210216 from "../components/organisms/articles/2021/2021-02-16";
import Article20210416 from "../components/organisms/articles/2021/2021-04-16";
import Article20210521 from "../components/organisms/articles/2021/2021-05-21";
import Article20210807 from "../components/organisms/articles/2021/2021-08-07";
import Article20211220 from "../components/organisms/articles/2021/2021-12-20";
import Article20211221 from "../components/organisms/articles/2021/2021-12-21";
import Article20211222 from "../components/organisms/articles/2021/2021-12-22";
import Article20211223 from "../components/organisms/articles/2021/2021-12-23";
import Article20211224 from "../components/organisms/articles/2021/2021-12-24";
import Article20211225 from "../components/organisms/articles/2021/2021-12-25";
import Article20211226 from "../components/organisms/articles/2021/2021-12-26";
import Article20211227 from "../components/organisms/articles/2021/2021-12-27";
import Article20211228 from "../components/organisms/articles/2021/2021-12-28";

export interface ArticleType {
  id: string;
  Content: React.VFC;
  date: Dayjs;
  title?: string;
  tags: Set<string>;
}

export const articles: ArticleType[] = [
  {
    id: "393e2ed4-2abc-7520-23b5-fb90b1154b11",
    Content: Article20110620,
    date: dayjs("2011-06-20"),
    title: "傾斜影響の求め方",
    tags: new Set(["パンヤ"]),
  },
  {
    id: "56d5cf7e-7e7e-60a1-e37d-bfb1f9ef9d01",
    Content: Article20110703,
    date: dayjs("2011-07-03"),
    title: "正確にずらす方法①",
    tags: new Set(["パンヤ"]),
  },
  {
    id: "321f4b15-d9df-6562-dcd1-4e937173219c",
    Content: Article20110704,
    date: dayjs("2011-07-04"),
    title: "正確にずらす方法②",
    tags: new Set(["パンヤ"]),
  },
  {
    id: "593177b5-24dd-2301-1d28-520da24014cd",
    Content: Article20110716,
    date: dayjs("2011-07-16"),
    title: "動画上げたでござる",
    tags: new Set(["パンヤ"]),
  },
  {
    id: "b0374d59-5953-a5bf-d9d5-2dfddf00373a",
    Content: Article20110801,
    date: dayjs("2011-08-01"),
    title: "シーズンカップの結果",
    tags: new Set(["パンヤ"]),
  },
  {
    id: "0f38385a-b0b6-e1b3-8154-34af70f2f781",
    Content: Article20110831,
    date: dayjs("2011-08-31"),
    title: "BlueWater楽しいです",
    tags: new Set(["パンヤ"]),
  },
  {
    id: "0b1da542-86a0-b496-1202-61d06bf5a26c",
    Content: Article20110919,
    date: dayjs("2011-09-19"),
    title: "SW2万pp",
    tags: new Set(["パンヤ"]),
  },
  {
    id: "462b8eb4-8fb2-8d1e-9729-66b014df0559",
    Content: Article20191224,
    date: dayjs("2019-12-24"),
    tags: new Set(["プログラミング"]),
  },
  {
    id: "e777ddad-11d5-afbc-a26f-c9c9bdf0dc1a",
    Content: Article20191225,
    date: dayjs("2019-12-25"),
    tags: new Set(["プログラミング"]),
  },
  {
    id: "a0dad16c-3225-93ac-36be-f5c376fee2bc",
    Content: Article20191227,
    date: dayjs("2019-12-27"),
    tags: new Set(["プログラミング"]),
  },
  {
    id: "a2ea22a6-ebf1-42d2-8baf-69c40ebd4e15",
    Content: Article20210216,
    date: dayjs("2021-02-16"),
    tags: new Set(["プログラミング"]),
  },
  {
    id: "174a6cd6-b2b1-4fd3-87d4-f9b7c0e0799f",
    Content: Article20210416,
    date: dayjs("2021-04-16"),
    tags: new Set(["プログラミング"]),
  },
  {
    id: "016a60c2-8344-49b5-802b-681086a1f081",
    Content: Article20210521,
    date: dayjs("2021-05-21"),
    title: "ここ数年の振り返りと雑談 その1",
    tags: new Set(["プログラミング"]),
  },
  {
    id: "971c05cd-a1d4-4b5a-8e9a-94afee0759dd",
    Content: Article20210807,
    date: dayjs("2021-08-07"),
    tags: new Set(["プログラミング"]),
  },
  {
    id: "19d5dc6e-b1c4-aa99-1784-ecd7bc7f2ef6",
    Content: Article20211220,
    date: dayjs("2021-12-20"),
    tags: new Set([]),
  },
  {
    id: "b29f829e-1856-077d-60c6-a601fee9b234",
    Content: Article20211221,
    date: dayjs("2021-12-21"),
    tags: new Set(["プログラミング"]),
  },
  {
    id: "3be4f786-56ba-79df-8554-75eb38660329",
    Content: Article20211222,
    date: dayjs("2021-12-22"),
    tags: new Set(["プログラミング"]),
  },
  {
    id: "982c9eaf-3b32-8f7b-3962-5283437e4048",
    Content: Article20211223,
    date: dayjs("2021-12-23"),
    tags: new Set(["プログラミング"]),
  },
  {
    id: "dd548262-5b19-467e-841d-2f79f96e66df",
    Content: Article20211224,
    date: dayjs("2021-12-24"),
    tags: new Set(["プログラミング"]),
  },
  {
    id: "4f133adf-2f7b-4742-b7a8-a7dc26a312bb",
    Content: Article20211225,
    date: dayjs("2021-12-25"),
    tags: new Set(["プログラミング"]),
  },
  {
    id: "18f3f7e1-ff26-4c07-8622-32500c4f06f7",
    Content: Article20211226,
    date: dayjs("2021-12-26"),
    tags: new Set(["プログラミング"]),
  },
  {
    id: "4f5cea90-4401-4180-af8e-4c81d8fbc535",
    Content: Article20211227,
    date: dayjs("2021-12-27"),
    tags: new Set([]),
  },
  {
    id: "c61c40d2-7ca2-43d6-b047-6764a17aff39",
    Content: Article20211228,
    date: dayjs("2021-12-28"),
    tags: new Set([]),
  },
];
