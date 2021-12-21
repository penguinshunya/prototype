import Article20191224 from "./articles/2019-12-24";
import Article20191225 from "./articles/2019-12-25";
import Article20191227 from "./articles/2019-12-27";
import Article20211220 from "./articles/2021-12-20";
import Article20211221 from "./articles/2021-12-21";

interface Props {}

export const Depression: React.VFC<Props> = () => {
  return (
    <div>
      <Article20191224 />
      <Article20191225 />
      <Article20191227 />
      <Article20211220 />
      <Article20211221 />
    </div>
  );
};

export default Depression;
