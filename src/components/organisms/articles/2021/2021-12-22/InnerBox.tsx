import { Box, BoxProps, useMediaQuery, useTheme } from "@mui/material";

export const InnerBox: React.FC<BoxProps> = ({ children, ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      {...props}
      sx={{
        bgcolor: "hsl(200, 100%, 96%)",
        borderBottom: "1px solid hsl(200, 100%, 88%)",
        borderTop: "1px solid hsl(200, 100%, 88%)",
        mx: isMobile ? -2 : -3,
        my: 2,
        p: 2,
        px: isMobile ? 2 : 3,
        "> .MuiTypography-root:first-of-type": {
          mt: 0,
        },
        "> .MuiTypography-root:last-of-type": {
          mb: 0,
        },
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
};
