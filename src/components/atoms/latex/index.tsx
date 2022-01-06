import React, { memo, useMemo } from "react";
import katex, { KatexOptions } from "katex";

interface Props {
  c: string;
  options?: KatexOptions;
}

export const L: React.FC<Props> = memo(({ c: content, options }) => {
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

  if (options?.displayMode) {
    return (
      <div
        style={{
          maxWidth: "100%",
          overflow: "auto",
        }}
      >
        <span dangerouslySetInnerHTML={{ __html }} />
      </div>
    );
  }

  return <span dangerouslySetInnerHTML={{ __html }} />;
});

export default L;
