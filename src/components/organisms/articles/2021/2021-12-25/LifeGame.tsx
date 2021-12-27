import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Box, Button, IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import dayjs from "dayjs";
import _ from "lodash";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useMeasure } from "react-use";
import { v4 as uuidv4 } from "uuid";
import NumberTextField from "../../../../atoms/number-text-field";
import { useLifeGameByLocalStorage } from "./hooks";
import { clear, ExGameBoard, next, resize } from "./types-functions";

const GAP = 1;

interface Props {}

export const ConwaysGameOfLife: React.VFC<Props> = memo(() => {
  const [ref, { width }] = useMeasure();
  const [status, setStatus] = useState<"play" | "pause">("pause");

  const { state, dispatch } = useLifeGameByLocalStorage();

  const cellWidth = useMemo(() => {
    return (width - (state.board.w - 1) * GAP) / state.board.w;
  }, [state.board, width]);

  useEffect(() => {
    if (status !== "play") {
      return;
    }
    function tick() {
      const b = next(state.board);
      dispatch({ type: "board", value: b });
    }
    const id = window.setTimeout(tick, 100);
    return () => {
      window.clearTimeout(id);
    };
  }, [dispatch, state.board, status]);

  const handleClick = useCallback(() => {
    dispatch({ type: "setting", value: state.input });
    dispatch({ type: "board", value: resize(state.board, state.input.h, state.input.w) });
  }, [dispatch, state.board, state.input]);

  const handleClickCell = useCallback(
    (x: number, y: number) => {
      const b = _.cloneDeep(state.board);
      b.s[x]![y] = !b.s[x]![y];
      dispatch({ type: "board", value: b });
    },
    [dispatch, state.board]
  );

  const handleNext = useCallback(() => {
    dispatch({ type: "board", value: next(state.board) });
  }, [dispatch, state.board]);

  const handleClickSave = useCallback(() => {
    const id = uuidv4();
    const nb: ExGameBoard = { ...state.board, id, created: dayjs().unix() };
    dispatch({ type: "boards", value: [...state.boards, nb] });
    dispatch({ type: "selectedID", value: id });
  }, [state.board, dispatch, state.boards]);

  const handleChangeBoard = useCallback(
    (e: SelectChangeEvent<string>) => {
      const v = e.target.value;
      dispatch({ type: "selectedID", value: v });
    },
    [dispatch]
  );

  const handleClickRestore = useCallback(() => {
    const b = state.boards.filter((b) => b.id === state.selectedID)[0];
    if (b === undefined) return;
    dispatch({ type: "board", value: b });
    dispatch({ type: "input", value: { ...b, density: 0 } });
  }, [dispatch, state]);

  const handleClickDelete = useCallback(() => {
    dispatch({ type: "selectedID", value: "-" });
    dispatch({ type: "boards", value: state.boards.filter((b) => b.id !== state.selectedID) });
  }, [dispatch, state]);

  return (
    <Box ref={ref}>
      <Box sx={{ alignItems: "flex-start", display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <NumberTextField
              label="横幅"
              value={state.input.w}
              onChange={(w) => dispatch({ type: "input", value: { ...state.input, w: w ?? 0 } })}
            />
            <NumberTextField
              label="縦幅"
              value={state.input.h}
              onChange={(h) => dispatch({ type: "input", value: { ...state.input, h: h ?? 0 } })}
            />
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
      <Box
        sx={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "space-between", mb: 1 }}
      >
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button size="small" variant="contained" onClick={handleClick}>
            リサイズ
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => dispatch({ type: "board", value: clear(state.setting.h, state.setting.w) })}
          >
            設定のクリア
          </Button>
          <Button size="small" variant="outlined" onClick={handleClickSave}>
            現在の状態の保存
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <div>
            <Select size="small" value={state.selectedID} onChange={handleChangeBoard}>
              <MenuItem value="-">（未選択）</MenuItem>
              {state.boards.map((b, i) => (
                <MenuItem key={b.id} value={b.id}>
                  {dayjs.unix(b.created).format("YYYY/MM/DD HH:mm:ss")}
                </MenuItem>
              ))}
            </Select>
          </div>
          <Button disabled={state.selectedID === "-"} variant="outlined" onClick={handleClickRestore}>
            復元
          </Button>
          <Button color="error" disabled={state.selectedID === "-"} variant="outlined" onClick={handleClickDelete}>
            削除
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: `repeat(${state.board.h}, ${cellWidth}px)`,
          gap: `${GAP}px`,
          "> div": {
            display: "grid",
            gridTemplateColumns: `repeat(${state.board.w}, ${cellWidth}px)`,
            gap: `${GAP}px`,
          },
          "> div > div": {
            border: "1px solid rgb(123, 123, 123)",
            cursor: "pointer",
            ":hover": {
              bgcolor: "rgb(200, 200, 200)",
            },
          },
        }}
      >
        {state.board.s.map((row, i) => {
          return (
            <div key={i}>
              {row.map((cell, j) => (
                <div
                  key={j}
                  style={{
                    backgroundColor: cell ? "black" : "white",
                  }}
                  onClick={() => handleClickCell(i, j)}
                />
              ))}
            </div>
          );
        })}
      </Box>
    </Box>
  );
});

export default ConwaysGameOfLife;
