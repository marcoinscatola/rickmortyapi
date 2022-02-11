import { charactersSlice } from "@/features/characters";
import { episodesSlice } from "@/features/episodes";
import { locationsSlice } from "@/features/locations";
import { configureStore, ConfigureStoreOptions } from "@reduxjs/toolkit";
import { RootState } from ".";

// This is a workaround to avoid a circular type dependency.
// Here the `preloadedState` param is typed as `any`, because using `RootState`
// would create a circular dependency since `RootState` is inferred from `Store`
// which is in turn inferred from the return type of this method.
// It's safe to leave `preloadedState` as `any` since this method is not exported,
// instead we export a fully-typed `createStore` method.
const baseCreateStore = (preloadedState?: any) =>
  configureStore({
    preloadedState,
    reducer: {
      [charactersSlice.name]: charactersSlice.reducer,
      [episodesSlice.name]: episodesSlice.reducer,
      [locationsSlice.name]: locationsSlice.reducer,
    },
  });

export type Store = ReturnType<typeof baseCreateStore>;

export const createStore = (preloadedState?: RootState) => {
  const store = baseCreateStore(preloadedState);

  return store;
};
