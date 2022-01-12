import { Box, BoxProps } from "@mui/material";
import { memo } from "react";

type Props = BoxProps & {
  solved?: boolean;
};

export const Q: React.VFC<Props> = memo(({ sx, solved, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        bgcolor: solved ? "hsl(120, 100%, 97%)" : "hsl(350, 100%, 97%)",
        my: 2.5,
        p: 1,
        ...sx,
      }}
    />
  );
});

export default Q;
