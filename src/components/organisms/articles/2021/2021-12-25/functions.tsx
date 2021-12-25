import _ from "lodash";

type Board = boolean[][];

const dx = [1, 0, -1, 0, 1, 1, -1, -1];
const dy = [0, 1, 0, -1, 1, -1, 1, -1];

const SHIP = [
  [0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0],
  [0, 1, 0, 1, 0],
  [0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0],
];

export function include(board: Board, sb: number[][]) {
  const h = board.length;
  const w = board[0]?.length ?? 0;
  const b = _.cloneDeep(board);
  const sh = SHIP.length;
  const sw = SHIP[0]!.length;

  if (h >= sh && w >= sw) {
    const x = ~~(Math.random() * (h - sh));
    const y = ~~(Math.random() * (w - sw));
    for (let i = 0; i < sh; i++) {
      for (let j = 0; j < sw; j++) {
        const nx = x + i;
        const ny = y + j;
        b[nx]![ny] = sb[i]![j] !== 0;
      }
    }
  }
  return b;
}

export function make(h: number, w: number, density: number): Board {
  let b = _.range(h).map(() => _.range(w).map(() => Math.random() < density));
  // b = include(b, SHIP);
  return b;
}

export function clear(h: number, w: number): Board {
  return _.range(h).map(() => _.range(w).map(() => false));
}

export function resize(board: Board, H: number, W: number) {
  const b = _.range(H).map(() => _.range(W).map(() => false));
  const h = board.length;
  const w = board[0]?.length ?? 0;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (i >= H || j >= W) break;
      b[i]![j] = board[i]![j] ?? false;
    }
  }
  return b;
}

export function next(board: Board) {
  const b = _.cloneDeep(board);
  const h = board.length;
  const w = board[0]?.length ?? 0;
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      let count = 0;
      for (let k = 0; k < 8; k++) {
        const x = i + dx[k]!;
        const y = j + dy[k]!;
        if (x < 0 || x >= h || y < 0 || y >= w) continue;
        if (board[x]![y]) {
          count += 1;
        }
      }
      if (!board[i]![j] && count === 3) {
        b[i]![j] = true;
      }
      if (board[i]![j]) {
        if (!(count === 2 || count === 3)) {
          b[i]![j] = false;
        }
      }
    }
  }
  return b;
}
