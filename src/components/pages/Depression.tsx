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

interface Props {}

export const Depression: React.VFC<Props> = () => {
  return (
    <div>
      <Article20110703 />
      <Article20110704 />
      <Article20110716 />
      <Article20110801 />
      <Article20110831 />
      <Article20110919 />
      <Article20191224 />
      <Article20191225 />
      <Article20191227 />
      <Article20211220 />
      <Article20211221 />
      <Article20211222 />
    </div>
  );
};

export default Depression;
