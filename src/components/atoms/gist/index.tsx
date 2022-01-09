import styled from "@emotion/styled";
import { memo, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const IFrame = styled.iframe`
  body: {
    margin: 0;
  }
`;

type Props = Omit<JSX.IntrinsicElements["iframe"], "id"> & {
  id: string;
};

export const Gist: React.VFC<Props> = memo(({ id, ...props }) => {
  const title = useMemo(() => uuidv4(), []);

  const ref = useCallback(
    (iframe: HTMLIFrameElement) => {
      if (iframe == null) return;
      const doc = iframe.contentDocument;
      if (doc == null) return;

      const link = `https://gist.github.com/${id}.js`;
      const onResize = `onload="parent.document.getElementById('${id}').style.height=document.body.scrollHeight + 'px'"`;
      const html = `
      <body ${onResize} style="margin-left: 0; margin-right: 0;">
        <script src="${link}"></script>
      </body>
    `;
      doc.open();
      doc.write(html);
      doc.close();
    },
    [id]
  );

  return (
    <IFrame
      title={title}
      ref={ref}
      frameBorder={0}
      width="100%"
      {...props}
      id={id}
      style={{
        ...props.style,
      }}
    />
  );
});

export default Gist;
