import { useMemo } from "react";
import { useCallback, useReducer } from "react";
import { useLocalStorage } from "react-use";
import { ExGameBoard, GameBoard, make } from "./types-functions";

interface Input {
  h: number;
  w: number;
  density: number; // 0.0 - 1.0
}

function initInput(): Input {
  return {
    h: 12,
    w: 36,
    density: 0.1,
  };
}

export interface Setting {
  h: number;
  w: number;
  density: number;
}

function initSetting(): Setting {
  return {
    h: 12,
    w: 36,
    density: 0.1,
  };
}

type State = {
  board: GameBoard;
  boards: ExGameBoard[];
  input: Input;
  selectedID: string;
  setting: Setting;
};

type Action =
  | {
      type: "board";
      value: GameBoard;
    }
  | {
      type: "boards";
      value: ExGameBoard[];
    }
  | {
      type: "input";
      value: Input;
    }
  | {
      type: "selectedID";
      value: string;
    }
  | {
      type: "setting";
      value: Setting;
    };

function initState(): State {
  return {
    board: make(16, 32, 0),
    boards: [],
    input: initInput(),
    selectedID: "-",
    setting: initSetting(),
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "board":
      return { ...state, board: action.value };
    case "boards":
      return { ...state, boards: action.value };
    case "input":
      return { ...state, input: action.value };
    case "selectedID":
      return { ...state, selectedID: action.value };
    case "setting":
      return { ...state, setting: action.value };
  }
}

export function useLifeGameByState() {
  const [state, dispatch] = useReducer(reducer, initState());

  return {
    state,
    dispatch,
  };
}

const KEY_BOARD = "58f306a1-596e-4720-a753-49336f3a0664";
const KEY_BOARDS = "b934ce26-0113-4a55-881e-19731d94f69d";
const KEY_INPUT = "3e46f398-cc10-4263-ab01-88d519628923";
const KEY_SELECTED_ID = "82a5b37d-7c4d-4153-8378-e5558902d984";
const KEY_SETTING = "2dc8bae1-6950-4f28-8818-0485129ed962";

export function useLifeGameByLocalStorage() {
  const [board, setBoard] = useLocalStorage<GameBoard>(KEY_BOARD, make(16, 32, 0));
  const [boards, setBoards] = useLocalStorage<ExGameBoard[]>(KEY_BOARDS, []);
  const [input, setInput] = useLocalStorage<Input>(KEY_INPUT, initInput());
  const [selectedID, setSelectedID] = useLocalStorage<string>(KEY_SELECTED_ID, "-");
  const [setting, setSetting] = useLocalStorage<Setting>(KEY_SETTING, initSetting());

  const state = useMemo(() => {
    const init = initState();
    return {
      board: board ?? init.board,
      boards: boards ?? init.boards,
      input: input ?? init.input,
      selectedID: selectedID ?? init.selectedID,
      setting: setting ?? initSetting(),
    };
  }, [board, boards, input, selectedID, setting]);

  const dispatch = useCallback(
    (action: Action) => {
      switch (action.type) {
        case "board": {
          setBoard(action.value);
          break;
        }
        case "boards": {
          setBoards(action.value);
          break;
        }
        case "input": {
          setInput(action.value);
          break;
        }
        case "selectedID": {
          setSelectedID(action.value);
          break;
        }
        case "setting": {
          setSetting(action.value);
          break;
        }
      }
    },
    [setBoard, setBoards, setInput, setSelectedID, setSetting]
  );

  return {
    state,
    dispatch,
  };
}
