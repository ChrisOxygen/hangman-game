import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { categories } from "../../data.json";
import { getRandomItem } from "../utils/helpers";

export type WordOBJ = {
  name: string;
  selected: boolean;
};

type SelectedCategory = {
  categoryTitle: string;
  wordList: WordOBJ[];
};

const initialState = {
  categories: categories,
  selectedCategory: { categoryTitle: "", wordList: [] } as SelectedCategory,
  currentWord: {} as WordOBJ,
};

export const gameDataSlice = createSlice({
  name: "gameData",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<SelectedCategory>) {
      state.selectedCategory = { ...action.payload };
    },
    setCurrentWord(state) {
      if (state.selectedCategory.wordList.length !== 0) {
        const availableWordsList = state.selectedCategory.wordList.filter(
          (wordOBJ) => wordOBJ.selected === false
        );

        if (availableWordsList.length === 0) {
          prompt(
            "No more words in this category. Please select another category."
          );
          return;
        }

        const randomWordOBJ = getRandomItem(availableWordsList);
        randomWordOBJ.selected = true;
        state.selectedCategory = {
          ...state.selectedCategory,
          wordList: state.selectedCategory.wordList.map((wordOBJ) =>
            wordOBJ.name === randomWordOBJ.name ? randomWordOBJ : wordOBJ
          ),
        };
        state.currentWord = { ...randomWordOBJ };
      }
    },
    resetGameData(state) {
      state.selectedCategory = { categoryTitle: "", wordList: [] };
      state.currentWord = {} as WordOBJ;
    },
  },
});

export const { setCategory, setCurrentWord, resetGameData } =
  gameDataSlice.actions;
