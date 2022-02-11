import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { RootState } from "@/store";
import { requestCharactersPage } from "./asyncActions";
import { CharacterEntity } from "./types";

interface CharactersState extends EntityState<CharacterEntity> {}

const initialState: CharactersState = {
  ids: [],
  entities: {},
};

const charactersAdapter = createEntityAdapter<CharacterEntity>();

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      // When the `requestCharactersPage` thunk fulfills, use the `entityAdapter`
      // methods to update the state.
      requestCharactersPage.fulfilled.match,
      (state, action) => {
        const { payload: characters } = action;
        charactersAdapter.setMany(state, characters);
      }
    );
  },
});

const selectors = charactersAdapter.getSelectors<RootState>(
  (state) => state[charactersSlice.name]
);

export const selectCharacterById = selectors.selectById;

export * from "./types";
