import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAlphabetObjects } from "../../utils/helpers";

export type singleLetterType = {
  isVisable: boolean;
  item: string;
  isLetter: boolean;
  index: number;
};

export type AlphabetObjType = { letter: string; hasBeenClicked: boolean };

type playDataState = {
  alphabetOBJs: AlphabetObjType[];
  lettersToDisplay: singleLetterType[];
  userChances: number | null;
  gameState: "playing" | "gameOver" | "gameWon" | "paused";
};

const initialState: playDataState = {
  alphabetOBJs: createAlphabetObjects(),
  lettersToDisplay: [],
  userChances: null,
  gameState: "playing",
};

export const playDataSlice = createSlice({
  name: "playData",
  initialState,
  reducers: {
    getLettersToDisplay(state, action: PayloadAction<singleLetterType[]>) {
      state.lettersToDisplay = [...action.payload];
    },
    updateGameState(
      state,
      action: PayloadAction<"playing" | "gameOver" | "gameWon" | "paused">
    ) {
      state.gameState = action.payload;
    },
    setUserChances(state, action: PayloadAction<number | null>) {
      state.userChances = action.payload;
    },
    resetPlayData(state) {
      Object.assign(state, initialState);
    },
    updateAlphabetOBJs(state, action: PayloadAction<AlphabetObjType[]>) {
      state.alphabetOBJs = action.payload;
    },
  },
});

export const {
  getLettersToDisplay,
  updateGameState,
  setUserChances,
  resetPlayData,
  updateAlphabetOBJs,
} = playDataSlice.actions;
