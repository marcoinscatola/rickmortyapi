import { RootState } from "@/store";
import _state from "./state.json";
import _stateWithError from "./stateWithError.json";

const state = _state as RootState;
const stateWithError = _stateWithError as RootState;

export { state, stateWithError };
