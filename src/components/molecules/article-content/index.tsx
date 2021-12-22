import { Box, BoxProps } from "@mui/material";

type Props = BoxProps;

export const ArticleContent: React.FC<Props> = ({ children, title, ...props }) => {
  return (
    <Box {...props} sx={{ typography: "string", ...props.sx }}>
      {children}
    </Box>
  );
};

export default ArticleContent;
