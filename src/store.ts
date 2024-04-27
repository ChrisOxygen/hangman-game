import { configureStore } from "@reduxjs/toolkit";
import { gameDataSlice } from "./features/gameDataSlice";
import { playDataSlice } from "./features/playData/playDataSlice";

export const store = configureStore({
  reducer: {
    gameData: gameDataSlice.reducer,
    playData: playDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
