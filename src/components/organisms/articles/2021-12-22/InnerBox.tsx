import { Box, BoxProps } from "@mui/material";

export const InnerBox: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        bgcolor: "hsl(160, 36%, 96%)",
        my: 2,
        p: 1,
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
