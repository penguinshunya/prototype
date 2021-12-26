import _ from "lodash";

export interface GameBoard {
  h: number;
  w: number;
  s: boolean[][];
}

export type ExGameBoard = GameBoard & {
  id: string;
  created: number;
};

const dx = [1, 0, -1, 0, 1, 1, -1, -1];
const dy = [0, 1, 0, -1, 1, -1, 1, -1];

export function make(h: number, w: number, density: number): GameBoard {
  const s = _.range(h).map(() => _.range(w).map(() => Math.random() < density));
  return { h, w, s };
}

export function clear(h: number, w: number): GameBoard {
  const s = _.range(h).map(() => _.range(w).map(() => false));
  return { h, w, s };
}

export function resize(board: GameBoard, H: number, W: number): GameBoard {
  const s = _.range(H).map(() => _.range(W).map(() => false));
  for (let i = 0; i < board.h; i++) {
    for (let j = 0; j < board.w; j++) {
      if (i >= H || j >= W) break;
      s[i]![j] = board.s[i]![j]!;
    }
  }
  return { h: H, w: W, s };
}

export function next(board: GameBoard) {
  const b = _.cloneDeep(board);
  const h = board.h;
  const w = board.w;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      let count = 0;
      for (let k = 0; k < 8; k++) {
        const x = i + dx[k]!;
        const y = j + dy[k]!;
        if (x < 0 || x >= h || y < 0 || y >= w) continue;
        if (board.s[x]![y]) {
          count += 1;
        }
      }
      if (!board.s[i]![j] && count === 3) {
        b.s[i]![j] = true;
      }
      if (board.s[i]![j]) {
        if (!(count === 2 || count === 3)) {
          b.s[i]![j] = false;
        }
      }
    }
  }
  return b;
}
