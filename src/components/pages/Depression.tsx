import { Box, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import Article20110620 from "./articles/2011-06-20";
import Article20110703 from "./articles/2011-07-03";
import Article20110704 from "./articles/2011-07-04";
import Article20110716 from "./articles/2011-07-16";
import Article20110801 from "./articles/2011-08-01";
import Article20110831 from "./articles/2011-08-31";
import Article20110919 from "./articles/2011-09-19";
import Article20191224 from "./articles/2019-12-24";
import Article20191225 from "./articles/2019-12-25";
import Article20191227 from "./articles/2019-12-27";
import Article20211220 from "./articles/2021-12-20";
import Article20211221 from "./articles/2021-12-21";
import Article20211222 from "./articles/2021-12-22";

type ArticleType = {
  Content: React.VFC;
  date: Dayjs;
  title?: string;
  tags: ("パンヤ" | "プログラミング")[];
};

// prettier-ignore
const articles: ArticleType[] = [
  { Content: Article20110620, date: dayjs("2011-06-20"), title: "傾斜影響の求め方", tags: ["パンヤ"] },
  { Content: Article20110703, date: dayjs("2011-07-03"), title: "正確にずらす方法①", tags: ["パンヤ"] },
  { Content: Article20110704, date: dayjs("2011-07-04"), title: "正確にずらす方法②", tags: ["パンヤ"] },
  { Content: Article20110716, date: dayjs("2011-07-16"), title: "動画上げたでござる", tags: ["パンヤ"] },
  { Content: Article20110801, date: dayjs("2011-08-01"), title: "シーズンカップの結果", tags: ["パンヤ"] },
  { Content: Article20110831, date: dayjs("2011-08-31"), title: "BlueWater楽しいです", tags: ["パンヤ"] },
  { Content: Article20110919, date: dayjs("2011-09-19"), title: "SW2万pp", tags: ["パンヤ"] },
  { Content: Article20191224, date: dayjs("2019-12-24"), tags: ["プログラミング"] },
  { Content: Article20191225, date: dayjs("2019-12-25"), tags: ["プログラミング"] },
  { Content: Article20191227, date: dayjs("2019-12-27"), tags: ["プログラミング"] },
  { Content: Article20211220, date: dayjs("2021-12-20"), tags: [] },
  { Content: Article20211221, date: dayjs("2021-12-21"), tags: ["プログラミング"] },
  { Content: Article20211222, date: dayjs("2021-12-22"), tags: ["プログラミング"] },
];

interface Props {}

export const Depression: React.VFC<Props> = () => {
  return (
    <div>
      {articles.map((a) => (
        <Box component="article" key={a.date.unix()} sx={{ mb: 10 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: 24,
              mb: 2,
            }}
          >
            {a.date.locale("ja").format("YYYY年MM月DD日（dd）")}
          </Typography>
          <a.Content />
        </Box>
      ))}
    </div>
  );
};

export default Depression;
