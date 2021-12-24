export type Cell = "white" | "black" | "none";
export type Board = Cell[][];

export interface OthelloType {
  board: Board;
  isFinish: boolean;
  turn: "black" | "white";
}
