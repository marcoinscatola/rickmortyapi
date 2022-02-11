import type { Store } from "./createStore";

// We infer the `RootState` type from the store `getState` method so that the
// state shape is always up to date with the reducers used in `configureStore`
export type RootState = ReturnType<Store["getState"]>;

export type AppDispatch = Store["dispatch"];
