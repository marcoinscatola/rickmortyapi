import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { requestCharactersPage } from "./asyncActions";
import { CharacterEntity } from "./types";
import { ID } from "../api";

interface PageState {
  status: "loading" | "loaded" | "error";
  ids?: ID[];
  error: string | null;
}
interface CharactersState extends EntityState<CharacterEntity> {
  pages: {
    [key: string]: PageState;
  };
  pagination: {
    current: number;
    pages?: number;
  };
}

const initialState: CharactersState = {
  ids: [],
  entities: {},
  pages: {},
  pagination: {
    current: -1,
  },
};

const charactersAdapter = createEntityAdapter<CharacterEntity>();

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        // When the `requestCharactersPage` thunk starts, use the `entityAdapter`
        // methods to update the `pages` state.
        requestCharactersPage.pending.match,
        (state, action) => {
          const {
            meta: { arg: page },
          } = action;

          state.pages[page] = {
            error: null,
            status: "loading",
          };
          state.pagination.current = page;
        }
      )
      .addMatcher(
        // When the `requestCharactersPage` thunk fulfills, use the `entityAdapter`
        // methods to update the state.
        requestCharactersPage.fulfilled.match,
        (state, action) => {
          const {
            payload: { info, results: characters },
            meta: { arg: page },
          } = action;

          charactersAdapter.setMany(state, characters);
          state.pages[page] = {
            ids: characters.map(({ id }) => id),
            error: null,
            status: "loaded",
          };
          state.pagination.pages = info.pages;
        }
      )
      .addMatcher(
        // When the `requestCharactersPage` thunk rejects, use the `entityAdapter`
        // methods to update the `pages` state with the error.
        requestCharactersPage.rejected.match,
        (state, action) => {
          const {
            payload: error,
            meta: { arg: page },
            error: { message },
          } = action;

          state.pages[page] = {
            error: error?.toString() || message || "Generic error",
            status: "error",
          };
        }
      );
  },
});

const selectCharactersSlice = (state: RootState) => state[charactersSlice.name];

const selectors = charactersAdapter.getSelectors<RootState>(
  selectCharactersSlice
);

export const selectCharacterById = selectors.selectById;
export const selectPageStatus = createSelector(
  selectCharactersSlice,
  (state: RootState, page: number) => page,
  (state, page) => state.pages[page] as PageState | undefined
);
export const selectPagination = createSelector(
  selectCharactersSlice,
  (state) => state.pagination
);

export * from "./types";
