import { Divider, DividerProps } from "@mui/material";
import { memo } from "react";

type Props = DividerProps;

export const MyDivider: React.VFC<Props> = memo(({ ...props }) => {
  return (
    <Divider
      {...props}
      sx={{
        my: 2.5,
        ...props.sx,
      }}
    />
  );
});

export default MyDivider;
