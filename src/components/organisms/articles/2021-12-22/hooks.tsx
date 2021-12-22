import _ from "lodash";
import { useCallback, useRef, useState } from "react";

const dx = [1, 0, -1, 0, 1, 1, -1, -1];
const dy = [0, 1, 0, -1, 1, -1, 1, -1];

type Cell = "white" | "black" | "none";

function initBoard(): Cell[][] {
  const board: Cell[][] = _.range(8).map(() => _.range(8).map(() => "none"));
  board[3]![3] = board[4]![4] = "white";
  board[3]![4] = board[4]![3] = "black";
  return board;
}

export function useOthello() {
  const rawBoard = useRef<Cell[][]>(initBoard());
  const [board, setBoard] = useState<Cell[][]>(rawBoard.current);

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
    [can]
  );

  const reset = useCallback(() => {
    rawBoard.current = initBoard();
    setBoard(rawBoard.current);
  }, []);

  return { board, can, canAny, put, reset };
}
