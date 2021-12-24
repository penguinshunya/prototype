import axios from "axios";
import { Board } from "./types";

export async function ai(board: Board, color: "black" | "white") {
  const darkDiscs: number[] = [];
  const lightDiscs: number[] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const index = i * 8 + j;
      if (board[i]![j] === "black") darkDiscs.push(index);
      if (board[i]![j] === "white") lightDiscs.push(index);
    }
  }
  const selectPlayer = color === "black" ? "Dark" : "Light";

  interface Request {
    board: { darkDiscs: number[]; lightDiscs: number[] };
    selectPlayer: "Dark" | "Light";
  }
  interface Response {
    move: number;
  }

  const req: Request = { board: { darkDiscs, lightDiscs }, selectPlayer };
  try {
    const res = await axios.post<Response>("https://othello.jumpaku.net/v1/ai/move", req).then((r) => r.data);
    await new Promise((r) => window.setTimeout(r, 2000));
    const x = ~~(res.move / 8);
    const y = res.move % 8;
    return { x, y };
  } catch (e: unknown) {
    console.error(e);
    return null;
  }
}
