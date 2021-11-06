import { RootState } from "../store";

export const getInputState = (state: RootState) => state.inputState.value;
