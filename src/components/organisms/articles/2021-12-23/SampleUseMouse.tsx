import { Box, Typography } from "@mui/material";
import { memo, useRef } from "react";
import { useMeasure, useMouseHovered } from "react-use";

interface Props {}

export const SampleUseMouse: React.VFC<Props> = memo(() => {
  const [wrapRef, { width }] = useMeasure();
  const ref = useRef<HTMLDivElement>(null!);
  const { elX, elY } = useMouseHovered(ref, { whenHovered: true });

  return (
    <Box ref={wrapRef}>
      <Box ref={ref} sx={{ bgcolor: "rgb(230, 230, 230)", px: 1, py: 0.5, width, height: 128 }}>
        <Typography>useMouseHovered</Typography>
        <Typography>
          ({Math.round(elX)}, {Math.round(elY)})
        </Typography>
      </Box>
    </Box>
  );
});

export default memo(SampleUseMouse);
