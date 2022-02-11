import { RootState } from "@/store";
import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { requestEpisodes } from "./asyncActions";
import { EpisodeEntity } from "./types";

interface EpisodesState extends EntityState<EpisodeEntity> {}

const initialState: EpisodesState = {
  ids: [],
  entities: {},
};

const episodesAdapter = createEntityAdapter<EpisodeEntity>();

export const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      // When the `requestEpisodes` thunk fulfills, use the `entityAdapter`
      // methods to update the state.
      requestEpisodes.fulfilled.match,
      (state, action) => {
        const { payload: episodes } = action;
        episodesAdapter.setMany(state, episodes);
      }
    );
  },
});

const selectors = episodesAdapter.getSelectors<RootState>(
  (state) => state[episodesSlice.name]
);

export const selectEpisodeById = selectors.selectById;
