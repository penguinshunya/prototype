import { Box, Button, Typography } from "@mui/material";
import anime from "animejs";
import Color from "color";
import _ from "lodash";
import { memo, useCallback, useState } from "react";

interface Props {}

export const Anime1: React.VFC<Props> = memo(() => {
  const [object, setObject] = useState({
    backgroundColor: Color("hsl(0, 72%, 72%)").rgb().string(),
    translateX: 0,
    rotate: `0turn`,
  });

  const handleClick = useCallback(() => {
    const pos = Math.round(Math.random() * 256);
    const col = Color(`hsl(${(pos * 360) / 256}, 72%, 72%)`)
      .rgb()
      .string();
    const rotate = parseFloat(object.rotate);
    const rot =
      pos === object.translateX
        ? object.rotate
        : pos < object.translateX
        ? Math.round(rotate - 1)
        : Math.round(rotate + 1);

    const cloned = _.cloneDeep(object);
    anime({
      targets: ["#maiwef", cloned],
      duration: 300,
      translateX: pos,
      backgroundColor: col,
      rotate: `${rot}turn`,
      easing: "easeInOutQuad",
      update: () => {
        setObject(_.cloneDeep(cloned));
      },
    });
  }, [object]);

  return (
    <Box sx={{ alignItems: "center", display: "flex", gap: 1, flexWrap: "wrap" }}>
      <div
        style={{
          boxSizing: "content-box",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          width: 288,
          height: 32,
          position: "relative",
        }}
      >
        <div
          id="maiwef"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: object.backgroundColor,
            width: 32,
            height: 32,
          }}
        ></div>
        <Typography
          sx={{
            fontSize: 10,
            alignItems: "center",
            display: "flex",
            position: "absolute",
            fontFamily: "monospace",
            top: 0,
            left: 0,
            px: 1,
            height: "100%",
            width: "100%",
            gap: 1,
            opacity: 0.7,
            justifyContent: "space-between",
          }}
        >
          <span>col:{("0" + object.translateX.toFixed(2)).slice(-6)}</span>
          <span>rot:{parseFloat(object.rotate).toFixed(2) + "turn"}</span>
          <span>pos:{object.backgroundColor.replaceAll(/\s/g, "")}</span>
        </Typography>
      </div>
      <Button variant="outlined" onClick={handleClick}>
        移動
      </Button>
    </Box>
  );
});

export default Anime1;
