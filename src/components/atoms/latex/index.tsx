import React, { memo, useMemo } from "react";
import katex, { KatexOptions } from "katex";

interface Props {
  content: string;
  options?: KatexOptions;
}

export const Latex: React.FC<Props> = ({ content, options }) => {
  const __html = useMemo(() => {
    try {
      return katex.renderToString(content, {
        ...options,
        output: "html",
      });
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        return e.message;
      } else {
        return "";
      }
    }
  }, [content, options]);

  return <span dangerouslySetInnerHTML={{ __html }} />;
};

export default memo(Latex);
