import _ from "lodash";
import { useCallback, useMemo, useRef } from "react";
import { useLocalStorage } from "react-use";

const KEY_BOARD = "b5438e65-cda0-5703-a956-7ce284c69326";

const dx = [1, 0, -1, 0, 1, 1, -1, -1];
const dy = [0, 1, 0, -1, 1, -1, 1, -1];

type Cell = "white" | "black" | "none";

function initBoard(): Cell[][] {
  const board: Cell[][] = _.range(8).map(() => _.range(8).map(() => "none"));
  board[3]![3] = board[4]![4] = "white";
  board[3]![4] = board[4]![3] = "black";
  return board;
}

export function useOthelloBoard() {
  const [_board, setBoard] = useLocalStorage(KEY_BOARD, initBoard());
  const board = useMemo(() => _board ?? initBoard(), [_board]);
  const rawBoard = useRef<Cell[][]>(board ?? initBoard());

  const can = useCallback((x: number, y: number, color: Omit<Cell, "none">) => {
    const board = rawBoard.current;
    const enemy = color === "black" ? "white" : "black";
    if (board[x]![y] !== "none") return false;
    let count = 0;
    for (let k = 0; k < 8; k++) {
      let nx = x + dx[k]!,
        ny = y + dy[k]!;
      if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8) continue;
      if (board[nx]![ny] !== enemy) continue;
      let c = 1;
      let ok = false;
      while (true) {
        nx += dx[k]!;
        ny += dy[k]!;
        if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8) break;
        if (board[nx]![ny] === "none") {
          break;
        } else if (board[nx]![ny] === color) {
          ok = true;
          break;
        } else {
          c += 1;
        }
      }
      if (ok) {
        count += c;
      }
    }
    return count > 0;
  }, []);

  const canAny = useCallback(
    (color: Omit<Cell, "none">) => {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (can(i, j, color)) return true;
        }
      }
      return false;
    },
    [can]
  );

  const put = useCallback(
    (x: number, y: number, color: Cell) => {
      const board = _.cloneDeep(rawBoard.current);
      const enemy = color === "black" ? "white" : "black";
      if (!can(x, y, color)) return false;
      board[x]![y] = color;
      for (let k = 0; k < 8; k++) {
        let nx = x + dx[k]!,
          ny = y + dy[k]!;
        if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8) continue;
        if (board[nx]![ny] !== enemy) continue;
        let ok = false;
        while (true) {
          nx += dx[k]!;
          ny += dy[k]!;
          if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8) break;
          if (board[nx]![ny] === "none") {
            break;
          } else if (board[nx]![ny] === color) {
            ok = true;
            break;
          }
        }
        if (!ok) continue;
        nx = x;
        ny = y;
        while (true) {
          nx += dx[k]!;
          ny += dy[k]!;
          if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8) break;
          if (board[nx]![ny] === enemy) {
            board[nx]![ny] = color;
          } else {
            break;
          }
        }
      }
      rawBoard.current = board;
      setBoard(board);
    },
    [can, setBoard]
  );

  const reset = useCallback(() => {
    rawBoard.current = initBoard();
    setBoard(rawBoard.current);
  }, [setBoard]);

  return { board, can, canAny, put, reset };
}

const KEY_TURN = "366ce105-4581-8d4b-a317-e6181f32ecdf";
const KEY_IS_FINISH = "a8a57336-f5a0-328c-face-4d4c92230b9f";

export function useOthello() {
  const { board, can, canAny, put, reset: _reset } = useOthelloBoard();
  const [_turn, setTurn] = useLocalStorage<"black" | "white">(KEY_TURN, "black");
  const [_isFinish, setIsFinish] = useLocalStorage(KEY_IS_FINISH, false);
  const turn = useMemo(() => _turn ?? "black", [_turn]);
  const isFinish = useMemo(() => _isFinish ?? false, [_isFinish]);

  const next = useCallback(
    (x: number, y: number) => {
      if (isFinish) return;
      if (!can(x, y, turn)) return;
      put(x, y, turn);
      let t: "black" | "white" = turn === "black" ? "white" : "black";
      setTurn(t);
      if (canAny(t)) return;
      t = t === "black" ? "white" : "black";
      setTurn(t);
      if (canAny(t)) return;
      setIsFinish(true);
    },
    [can, canAny, isFinish, put, setIsFinish, setTurn, turn]
  );

  const takeRandom = useCallback(() => {
    const ps: { x: number; y: number }[] = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (can(i, j, turn)) ps.push({ x: i, y: j });
      }
    }
    return ps.length === 0 ? null : ps[~~(Math.random() * ps.length)]!;
  }, [can, turn]);

  const reset = useCallback(() => {
    setTurn("black");
    _reset();
    setIsFinish(false);
  }, [_reset, setIsFinish, setTurn]);

  return {
    board,
    isFinish,
    next,
    reset,
    takeRandom,
    turn,
  };
}
