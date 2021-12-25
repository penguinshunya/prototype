import { Box, Button, IconButton } from "@mui/material";
import _ from "lodash";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useMeasure } from "react-use";
import NumberTextField from "../../../../atoms/number-text-field";
import { clear, make, next, resize } from "./functions";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const GAP = 1;

interface Input {
  h: number;
  w: number;
  density: number; // 0.0 - 1.0
}

interface Setting {
  h: number;
  w: number;
  density: number;
}

function initInput(): Input {
  return {
    h: 12,
    w: 36,
    density: 0.1,
  };
}

function initSetting(): Setting {
  return {
    h: 12,
    w: 36,
    density: 0.1,
  };
}

interface Props {}

export const ConwaysGameOfLife: React.VFC<Props> = memo(() => {
  const [ref, { width }] = useMeasure();
  const [status, setStatus] = useState<"play" | "pause">("pause");
  const [input, setInput] = useState<Input>(initInput());
  const [setting, setSetting] = useState<Setting>(initSetting());
  const [board, setBoard] = useState<boolean[][]>(make(input.h, input.w, 0));

  const cellWidth = useMemo(() => {
    return (width - (setting.w - 1) * GAP) / setting.w;
  }, [setting, width]);

  useEffect(() => {
    if (status !== "play") {
      return;
    }
    function tick() {
      const b = next(board);
      setBoard(b);
    }
    const id = window.setTimeout(tick, 100);
    return () => {
      window.clearTimeout(id);
    };
  }, [board, status]);

  const handleClick = useCallback(() => {
    setSetting(input);
    setBoard(resize(board, input.h, input.w));
  }, [board, input]);

  const handleClickCell = useCallback(
    (x: number, y: number) => {
      const b = _.cloneDeep(board);
      b[x]![y] = !b[x]![y];
      setBoard(b);
    },
    [board]
  );

  const handleNext = useCallback(() => {
    setBoard(next(board));
  }, [board]);

  return (
    <Box ref={ref}>
      <Box sx={{ alignItems: "flex-start", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <NumberTextField label="横幅" value={input.w} onChange={(w) => setInput({ ...input, w: w ?? 0 })} />
            <NumberTextField label="縦幅" value={input.h} onChange={(h) => setInput({ ...input, h: h ?? 0 })} />
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <div>
            {status === "play" ? (
              <IconButton size="small" onClick={() => setStatus("pause")}>
                <PauseIcon />
              </IconButton>
            ) : (
              <IconButton size="small" onClick={() => setStatus("play")}>
                <PlayArrowIcon />
              </IconButton>
            )}
          </div>
          <div>
            <IconButton disabled={status !== "pause"} size="small" onClick={handleNext}>
              <SkipNextIcon />
            </IconButton>
          </div>
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <Button size="small" variant="contained" onClick={handleClick}>
          リサイズ
        </Button>
        <Button size="small" variant="outlined" onClick={() => setBoard(clear(setting.h, setting.w))}>
          クリア
        </Button>
      </Box>
      <Box sx={{ display: "grid", gridTemplateRows: `repeat(${setting.h}, ${cellWidth}px)`, gap: `${GAP}px` }}>
        {board.map((row, i) => {
          return (
            <Box
              key={i}
              sx={{ display: "grid", gridTemplateColumns: `repeat(${setting.w}, ${cellWidth}px)`, gap: `${GAP}px` }}
            >
              {row.map((cell, j) => (
                <Box
                  key={j}
                  sx={{
                    bgcolor: cell ? "black" : "white",
                    border: "1px solid rgb(123, 123, 123)",
                    ":hover": {
                      bgcolor: "rgb(200, 200, 200)",
                    },
                  }}
                  onClick={() => handleClickCell(i, j)}
                />
              ))}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
});

export default ConwaysGameOfLife;
