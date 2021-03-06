import { Box, BoxProps, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";

type Props = Omit<BoxProps, "component">;

export const Blockquote: React.VFC<Props> = memo(({ ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="blockquote"
      {...props}
      sx={{
        bgcolor: "hsl(40, 100%, 96%)",
        borderTop: "1px solid hsl(40, 100%, 80%)",
        borderBottom: "1px solid hsl(40, 100%, 80%)",
        mx: isMobile ? -2 : -3,
        p: 2,
        px: isMobile ? 2 : 3,
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
});

export default Blockquote;
