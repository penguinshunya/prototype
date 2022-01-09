import { Box } from "@mui/material";
import { memo } from "react";
import GLink from "../global-link";

type Props = Omit<JSX.IntrinsicElements["iframe"], "id"> & {
  id: string;
};

export const Gist: React.VFC<Props> = memo(({ id, ...props }) => {
  return (
    <Box sx={{ my: 2.5 }}>
      <GLink href={`https://gist.github.com/${id}`}>ソースコード</GLink>
    </Box>
  );
});

export default Gist;
