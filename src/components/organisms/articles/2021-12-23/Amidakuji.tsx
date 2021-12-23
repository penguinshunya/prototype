import { Box, Button } from "@mui/material";
import _ from "lodash";
import { useSnackbar } from "notistack";
import { memo, useCallback, useMemo } from "react";
import { useLocalStorage, useMeasure } from "react-use";
import { NumberTextField } from "../../../atoms/number-text-field";

const KEY_INPUT = "3b811adb-5d95-4982-9e0a-3bafb1b864cf";
const KEY_FREQUENCY = "bc2119d5-9de6-4bbb-a612-e74ca99026de";
const KEY_BOARD = "8193a46a-6ec2-466d-8598-1573aefc7e27";

interface Input {
  lineCount: number | null;
  height: number | null;
}

interface Board {
  height: number;
  width: number;
  board: boolean[][];
}

function initInput(): Input {
  return {
    lineCount: 16,
    height: 8,
  };
}

const BORDER_COLOR = "black";

interface Props {}

export const Amidakuji: React.VFC<Props> = memo(() => {
  const snack = useSnackbar();
  const [input, setInput] = useLocalStorage<Input>(KEY_INPUT, initInput());
  const [ref, { width }] = useMeasure();

  const [frequency, setFrequency] = useLocalStorage<number | null>(KEY_FREQUENCY, 0.4);
  const [boardInfo, setBoardInfo] = useLocalStorage<Board | null>(KEY_BOARD, null);

  const handleClick = useCallback(() => {
    if (input == null || input.lineCount === null || input.height === null) {
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
  }, [frequency, input, setBoardInfo, snack]);

  const nthChild = useMemo(() => {
    return `> *:nth-of-type(${boardInfo?.width ?? 0}n + 1)`;
  }, [boardInfo?.width]);

  const handleReset = useCallback(() => {
    setFrequency(0.4);
    setInput(initInput());
  }, [setFrequency, setInput]);

  return (
    <Box ref={ref}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <NumberTextField
          type="number"
          label="線の本数"
          value={input?.lineCount ?? 0}
          onChange={(v) => setInput(input === undefined ? undefined : { ...input, lineCount: v })}
        />
        <NumberTextField
          type="number"
          label="線の高さ"
          value={input?.height ?? 0}
          onChange={(v) => setInput(input === undefined ? undefined : { ...input, height: v })}
        />
        <NumberTextField
          label="出現頻度"
          isFloat
          value={frequency ?? 0}
          onChange={setFrequency}
          helperText="0.0〜1.0"
        />
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button size="small" variant="contained" sx={{ mb: 1 }} onClick={handleClick}>
          あみだくじを生成
        </Button>
        <Button size="small" variant="outlined" sx={{ mb: 1 }} onClick={handleReset}>
          初期値を設定
        </Button>
      </Box>
      {boardInfo != null && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${boardInfo.width}, ${Math.min(64, width / boardInfo.width)}px)`,
            gridTemplateRows: `repeat(${boardInfo.height + 1}, ${Math.min(24, width / boardInfo.width)}px)`,
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
