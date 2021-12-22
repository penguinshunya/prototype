import { Box, Button, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useOthello } from "./hooks";

interface Props {}

export const Othello: React.VFC<Props> = memo(() => {
  const { board, isFinish, next, reset, takeRandom, turn } = useOthello();
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto || isFinish) return;
    function tick() {
      const pos = takeRandom();
      if (pos === null) return;
      next(pos.x, pos.y);
    }
    let id = window.setTimeout(tick, 32);
    return () => {
      window.clearTimeout(id);
    };
  }, [auto, isFinish, next, takeRandom]);

  const handleClick = useCallback(
    (x: number, y: number) => {
      next(x, y);
    },
    [next]
  );

  const message = useMemo(() => {
    if (isFinish) {
      let white = 0,
        black = 0;
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (board[i]![j] === "black") {
            black += 1;
          } else if (board[i]![j] === "white") {
            white += 1;
          }
        }
      }
      return `黒 ${black} 白 ${white} で${black > white ? "黒の勝ち" : black < white ? "白の勝ち" : "引き分け"}`;
    }
    return turn === "black" ? "黒の番です" : "白の番です";
  }, [isFinish, board, turn]);

  const handleReset = useCallback(() => {
    setAuto(false);
    reset();
  }, [reset]);

  return (
    <Box sx={{ width: "max-content" }}>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
          justifyContent: "space-between",
          mb: "1px",
        }}
      >
        <Typography>{message}</Typography>
        {isFinish ? (
          <Button size="small" color="inherit" disableRipple onClick={handleReset}>
            Reset
          </Button>
        ) : !auto ? (
          <Button size="small" color="inherit" disableRipple onClick={() => setAuto(true)}>
            Auto
          </Button>
        ) : (
          <Button size="small" color="inherit" disableRipple onClick={() => setAuto(false)}>
            Stop
          </Button>
        )}
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: "1px",
          gridTemplateColumns: "repeat(8, 32px)",
          gridTemplateRows: "repeat(8, 32px)",
        }}
      >
        {board.map((b, i) =>
          b.map((c, j) => (
            <Box
              key={i * 8 + j}
              onClick={() => handleClick(i, j)}
              sx={{ alignItems: "center", bgcolor: "green", display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  bgcolor: c === "black" ? "black" : c === "white" ? "white" : "transparent",
                  borderRadius: 16,
                  height: 30,
                  width: 30,
                }}
              />
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
});

export default memo(Othello);
