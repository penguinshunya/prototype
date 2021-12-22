import { memo } from "react";

type Props = JSX.IntrinsicElements["img"] & {};

export const Image: React.VFC<Props> = ({ ...props }) => {
  return (
    <img
      alt=""
      {...props}
      style={{
        verticalAlign: "middle",
        maxWidth: "100%",
        ...props.style,
      }}
    />
  );
};

export default memo(Image);
