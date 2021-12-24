import { Link } from "@mui/material";
import { Link as RrdLink, LinkProps } from "react-router-dom";
import { memo } from "react";

type Props = LinkProps;

export const LocalLink: React.VFC<Props> = memo(({ ...props }) => {
  return <Link component={RrdLink} {...props} />;
});

export default LocalLink;
