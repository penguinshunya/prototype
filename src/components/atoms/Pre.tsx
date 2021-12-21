import { useMemo } from "react";
import SyntaxHighlighter, { SyntaxHighlighterProps } from "react-syntax-highlighter";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/github";

type Props = SyntaxHighlighterProps & {};

export const Pre: React.VFC<Props> = ({ children, ...props }) => {
  const p = useMemo(
    () => ({
      language: "typescript",
      showLineNumbers: true,
      style,
      ...props,
    }),
    [props]
  );

  return <SyntaxHighlighter {...p}>{children}</SyntaxHighlighter>;
};

export default Pre;
