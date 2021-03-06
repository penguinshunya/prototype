import _ from "lodash";
import { Board, OthelloType } from "./types";

const dx = [1, 0, -1, 0, 1, 1, -1, -1];
const dy = [0, 1, 0, -1, 1, -1, 1, -1];

export function initBoard(): Board {
  const board: Board = _.range(8).map(() => _.range(8).map(() => "none"));
  board[3]![3] = board[4]![4] = "white";
  board[3]![4] = board[4]![3] = "black";
  return board;
}

export function initOthelloType(): OthelloType {
  return {
    board: initBoard(),
    isFinish: false,
    turn: "black",
  };
}

export function canPut(board: Board, x: number, y: number, color: "black" | "white") {
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
}

export function canPutAny(board: Board, color: "black" | "white") {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (canPut(board, i, j, color)) return true;
    }
  }
  return false;
}

export function put(_board: Board, x: number, y: number, color: "black" | "white"): Board | null {
  const board = _.cloneDeep(_board);
  const enemy = color === "black" ? "white" : "black";
  if (!canPut(board, x, y, color)) return null;
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
  return board;
}
