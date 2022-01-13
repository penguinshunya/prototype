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
        bgcolor: solved ? "hsl(130, 64%, 96%)" : "hsl(350, 64%, 96%)",
        my: 2.5,
        p: 1,
        ...sx,
      }}
    />
  );
});

export default Q;
