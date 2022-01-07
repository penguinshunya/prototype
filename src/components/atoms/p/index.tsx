import { Typography, TypographyProps } from "@mui/material";
import { memo } from "react";

type Props = TypographyProps;

export const P: React.VFC<Props> = memo(({ sx, ...props }) => {
  return (
    <Typography
      {...props}
      sx={{
        lineHeight: 1.72,
        my: 3,
        ...sx,
      }}
    />
  );
});

export default P;
