import { Typography, TypographyProps } from "@mui/material";
import { memo } from "react";

type Props = TypographyProps;

export const P: React.VFC<Props> = memo(({ sx, ...props }) => {
  return (
    <Typography
      {...props}
      sx={{
        my: 2.5,
        ...sx,
      }}
    />
  );
});

export default P;
