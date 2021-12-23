import _ from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";
import {
  doc,
  DocumentData,
  getFirestore,
  onSnapshot,
  QueryDocumentSnapshot,
  setDoc,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

const dx = [1, 0, -1, 0, 1, 1, -1, -1];
const dy = [0, 1, 0, -1, 1, -1, 1, -1];

type Cell = "white" | "black" | "none";
type Board = Cell[][];

function initBoard(): Board {
  const board: Board = _.range(8).map(() => _.range(8).map(() => "none"));
  board[3]![3] = board[4]![4] = "white";
  board[3]![4] = board[4]![3] = "black";
  return board;
}

interface OthelloType {
  board: Board;
  isFinish: boolean;
  turn: "black" | "white";
}

export function initOthelloType(): OthelloType {
  return {
    board: initBoard(),
    isFinish: false,
    turn: "black",
  };
}

const KEY_BOARD = "b5438e65-cda0-5703-a956-7ce284c69326";
const KEY_TURN = "366ce105-4581-8d4b-a317-e6181f32ecdf";
const KEY_IS_FINISH = "a8a57336-f5a0-328c-face-4d4c92230b9f";

export function useOthelloByLocalStorage() {
  const [ajax, setAjax] = useState(false);
  const [board, setBoard] = useLocalStorage(KEY_BOARD, initBoard());
  const [turn, setTurn] = useLocalStorage<"black" | "white">(KEY_TURN, "black");
  const [isFinish, setIsFinish] = useLocalStorage(KEY_IS_FINISH, false);

  const data: OthelloType | null = useMemo(() => {
    if (board === undefined || turn === undefined || isFinish === undefined) {
      return null;
    }
    return { board, isFinish, turn };
  }, [board, isFinish, turn]);

  const update = useCallback(
    async (othello: Partial<OthelloType>) => {
      setAjax(true);
      if (othello.board !== undefined) {
        setBoard(othello.board);
      }
      if (othello.isFinish !== undefined) {
        setIsFinish(othello.isFinish);
      }
      if (othello.turn !== undefined) {
        setTurn(othello.turn);
      }
      setAjax(false);
    },
    [setBoard, setIsFinish, setTurn]
  );

  return {
    ajax,
    data,
    update,
  };
}

const OthelloConverter = {
  toFirestore(data: WithFieldValue<OthelloType>): DocumentData {
    return { ...data, board: JSON.stringify(data.board) };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): OthelloType {
    const data = snapshot.data(options)!;
    return { ...data, board: JSON.parse(data.board) } as OthelloType;
  },
};

const FIRESTORE_COLID = "312f65ea-6943-4284-b0d8-e3f90aebaf8b";
const FIRESTORE_DOCID = "c4edd59a-6f00-4d1d-acb8-b5a8789a77f8";

export function useOthelloByFirestore() {
  const [ajax, setAjax] = useState(false);
  const [data, setData] = useState<OthelloType | null>(initOthelloType());

  useEffect(() => {
    const db = getFirestore();
    onSnapshot(doc(db, FIRESTORE_COLID, FIRESTORE_DOCID).withConverter(OthelloConverter), (doc) => {
      const data = doc.data();
      if (data === undefined) return;
      setAjax(false);
      setData(data);
    });
  }, []);

  const update = useCallback(
    async (d: Partial<OthelloType>) => {
      if (ajax) return;
      const db = getFirestore();
      setAjax(true);
      await setDoc(doc(db, FIRESTORE_COLID, FIRESTORE_DOCID).withConverter(OthelloConverter), { ...data, ...d });
    },
    [ajax, data]
  );

  return {
    ajax,
    data,
    update,
  };
}

function canPut(board: Board, x: number, y: number, color: "black" | "white") {
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

function canPutAny(board: Board, color: "black" | "white") {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (canPut(board, i, j, color)) return true;
    }
  }
  return false;
}

function put(_board: Board, x: number, y: number, color: "black" | "white"): Board | null {
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

export function useOthello(data: OthelloType | null, update: (data: Partial<OthelloType>) => Promise<unknown>) {
  const next = useCallback(
    (x: number, y: number) => {
      const d = _.cloneDeep(data);
      if (d === null) return;
      if (d.isFinish) return;
      const newBoard = put(d.board, x, y, d.turn);
      if (newBoard === null) {
        return;
      }
      d.board = newBoard;
      d.turn = d.turn === "black" ? "white" : "black";
      if (canPutAny(d.board, d.turn)) {
        return update(d);
      }
      d.turn = d.turn === "black" ? "white" : "black";
      if (canPutAny(d.board, d.turn)) {
        return update(d);
      }
      d.isFinish = true;
      return update(d);
    },
    [data, update]
  );

  const takeRandom = useCallback(() => {
    if (data?.board === undefined) {
      return null;
    }
    const ps: { x: number; y: number }[] = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (canPut(data.board, i, j, data.turn)) {
          ps.push({ x: i, y: j });
        }
      }
    }
    return ps.length === 0 ? null : ps[~~(Math.random() * ps.length)]!;
  }, [data]);

  const reset = useCallback(() => {
    update(initOthelloType());
  }, [update]);

  return {
    next,
    reset,
    takeRandom,
  };
}
