import { Box, Button } from "@mui/material";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { memo, useCallback, useMemo, useState } from "react";
import { NumberTextField } from "../../../atoms/number-text-field";

interface Input {
  lineCount: number | null;
  height: number | null;
}

interface Board {
  height: number;
  width: number;
  board: boolean[][];
}

const BORDER_COLOR = "black";

interface Props {}

export const Amidakuji: React.VFC<Props> = memo(() => {
  const snack = useSnackbar();
  const [input, setInput] = useState<Input>({ lineCount: 8, height: 8 });

  const [frequency, setFrequency] = useState<number | null>(0.3);
  const [boardInfo, setBoardInfo] = useState<Board | null>(null);

  const handleClick = useCallback(() => {
    if (input.lineCount === null || input.height === null) {
      snack.enqueueSnackbar("入力されていない項目があります", { variant: "error" });
      return;
    }
    const width = input.lineCount - 1;
    const height = input.height;
    const freq = frequency ?? 0;
    let board: boolean[][] | null = null;
    for (let i = 0; i < 10000; i++) {
      const t = _.range(height).map(() => _.range(width).map(() => Math.random() < freq));
      for (let i = 0; i < height; i++) {
        for (let j = 1; j < width; j++) {
          if (t[i]![j - 1]) t[i]![j] = false;
        }
      }
      let ok = true;
      for (let j = 0; j < width; j++) {
        let count = 0;
        for (let i = 0; i < height; i++) {
          if (t[i]![j]) count += 1;
        }
        if (count === 0) {
          ok = false;
          break;
        }
      }
      if (ok) {
        board = t;
        break;
      }
    }
    if (board === null) {
      snack.enqueueSnackbar("あみだくじの生成に失敗しました", { variant: "error" });
      return;
    }
    setBoardInfo({
      height,
      width,
      board,
    });
  }, [frequency, input, snack]);

  const nthChild = useMemo(() => {
    return `> *:nth-of-type(${boardInfo?.width ?? 0}n + 1)`;
  }, [boardInfo?.width]);

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
        <NumberTextField
          type="number"
          label="線の本数"
          value={input.lineCount}
          onChange={(v) => setInput({ ...input, lineCount: v })}
        />
        <NumberTextField
          type="number"
          label="線の高さ"
          value={input.height}
          onChange={(v) => setInput({ ...input, height: v })}
        />
        <NumberTextField label="線の出現頻度" isFloat value={frequency} onChange={setFrequency} helperText="0.0〜1.0" />
      </Box>
      <Box>
        <Button size="small" variant="contained" sx={{ mb: 1 }} onClick={handleClick}>
          あみだくじを生成
        </Button>
      </Box>
      {boardInfo !== null && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${boardInfo.width}, 64px)`,
            gridTemplateRows: `repeat(${boardInfo.height + 2}, 24px)`,
            [nthChild]: {
              borderLeft: `1px solid ${BORDER_COLOR}`,
            },
            my: 1,
            overflow: "auto",
          }}
        >
          {boardInfo.board.map((row, i) =>
            row.map((cell, j) => (
              <Box
                key={i * boardInfo.width + j}
                sx={{
                  borderBottom: cell ? `1px solid ${BORDER_COLOR}` : "none",
                  borderRight: `1px solid ${BORDER_COLOR}`,
                }}
              ></Box>
            ))
          )}
          {_.range(boardInfo.width).map((_, j) => (
            <Box
              key={j}
              sx={{
                borderRight: `1px solid ${BORDER_COLOR}`,
              }}
            ></Box>
          ))}
        </Box>
      )}
    </Box>
  );
});

export default memo(Amidakuji);
