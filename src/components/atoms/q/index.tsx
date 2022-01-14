import { Box, BoxProps, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";

type Props = BoxProps & {
  solved?: boolean;
};

export const Q: React.VFC<Props> = memo(({ sx, solved, ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      {...props}
      sx={{
        bgcolor: solved ? "hsl(120, 64%, 96%)" : "hsl(350, 80%, 96%)",
        borderBottom: solved ? "1px solid hsl(120, 64%, 87%)" : "1px solid hsl(350, 80%, 90%)",
        borderTop: solved ? "1px solid hsl(120, 64%, 87%)" : "1px solid hsl(350, 80%, 90%)",
        mx: isMobile ? -2 : -3,
        my: 2.5,
        p: 2,
        px: isMobile ? 2 : 3,
        ...sx,
      }}
    />
  );
});

export default Q;
