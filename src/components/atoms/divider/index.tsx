import { Divider, DividerProps, useMediaQuery, useTheme } from "@mui/material";
import { memo } from "react";

type Props = DividerProps;

export const MyDivider: React.VFC<Props> = memo(({ ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Divider
      {...props}
      sx={{
        mx: isMobile ? -2 : -3,
        my: 2.5,
        px: isMobile ? 2 : 3,
        ...props.sx,
      }}
    />
  );
});

export default MyDivider;
