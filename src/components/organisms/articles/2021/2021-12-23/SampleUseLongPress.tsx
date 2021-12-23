import { Box, Button, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useLongPress } from "react-use";

interface Props {}

export const SampleUseLongPress: React.VFC<Props> = memo(() => {
  const [isLongPress, setIsLongPress] = useState(false);

  const onLongPress = useCallback(() => {
    setIsLongPress(true);
  }, []);

  useEffect(() => {
    if (!isLongPress) return;
    function tick() {
      setIsLongPress(false);
    }
    const id = window.setTimeout(tick, 1000);
    return () => {
      window.clearTimeout(id);
    };
  }, [isLongPress]);

  const options = useMemo(
    () => ({
      delay: 1000,
    }),
    []
  );

  const longPressEvent = useLongPress(onLongPress, options);

  return (
    <Box sx={{ alignItems: "center", display: "flex", gap: 1 }}>
      <Button size="small" variant="contained" {...longPressEvent}>
        useLongPress 1秒間長押し
      </Button>
      {isLongPress && <Typography sx={{ fontSize: 11 }}>長押しされました</Typography>}
    </Box>
  );
});

export default SampleUseLongPress;
