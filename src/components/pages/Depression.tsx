import Article20211220 from "./articles/2021-12-20";
import Article20211221 from "./articles/2021-12-21";

interface Props {}

export const Depression: React.VFC<Props> = () => {
  return (
    <div>
      <Article20211220 />
      <Article20211221 />
    </div>
  );
};

export default Depression;
