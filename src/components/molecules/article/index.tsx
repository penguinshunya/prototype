import { Box, BoxProps, Typography } from "@mui/material";

type Props = BoxProps & {
  title: string;
};

export const Article: React.FC<Props> = ({ children, title, ...props }) => {
  return (
    <Box component="article" {...props} sx={{ mb: 10, typography: "string", ...props.sx }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: 24,
          mb: 2,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default Article;
