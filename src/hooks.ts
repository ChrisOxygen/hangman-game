import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { AppDispatch, RootState } from "./store.ts";

type DispatchFunction = () => AppDispatch;

export const useGameDataDispatch: DispatchFunction = useDispatch;
export const useGameDataSelector: TypedUseSelectorHook<RootState> = useSelector;
