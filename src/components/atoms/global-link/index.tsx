import { Link, LinkProps } from "@mui/material";
import { memo } from "react";

type Props = LinkProps;

export const GlobalLink: React.VFC<Props> = memo(({ ...props }) => {
  return <Link target="_blank" {...props} />;
});

export default GlobalLink;
