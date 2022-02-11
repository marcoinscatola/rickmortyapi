import { createAction } from "@reduxjs/toolkit";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import { requestEpisodes } from "../asyncActions";
import { episodesSlice, selectEpisodeById } from "../slice";
import * as FIXTURES from "./fixtures";

const nullAction = createAction("null");
const requestEpisodesFulfilledAction = requestEpisodes.fulfilled(
  FIXTURES.episodes,
  "",
  ["1", "2", "3"]
);

describe("episodesSlice", () => {
  describe("reducer", () => {
    it("returns the initial state", () => {
      const state = episodesSlice.reducer(undefined, nullAction);
      expect(state).toEqual(episodesSlice.getInitialState());
      expect(state).toEqual({
        ids: [],
        entities: {},
      });
    });

    it("handles the `requestEpisodes.fulfilled` action", async () => {
      const state = episodesSlice.reducer(
        undefined,
        requestEpisodesFulfilledAction
      );
      expect(state).toMatchObject({
        ids: expect.arrayContaining(FIXTURES.episodes.map((ep) => ep.id)),
      });
      expect(Object.values(state.entities)).toEqual(FIXTURES.episodes);
    });

    it("ignores other actions", () => {
      const expectedState = episodesSlice.getInitialState();
      let nextState = episodesSlice.reducer(undefined, nullAction);
      expect(nextState).toEqual(expectedState);
      nextState = episodesSlice.reducer(undefined, { type: "test-action" });
      expect(nextState).toEqual(expectedState);
      // Rejected action from the thunk is ignored, the store only reacts to `fulfilled`
      nextState = episodesSlice.reducer(undefined, {
        type: requestEpisodes.rejected.name,
        payload: { test: "value" },
      });
      expect(nextState).toEqual(expectedState);
    });
  });
});

describe("selectEpisodeById", () => {
  it("select an episode if present in the state", () => {
    const state = STORE_FIXTURES.state;
    const id = state.episodes.ids[0];
    const episode = selectEpisodeById(state, id);

    expect(episode).toEqual(state.episodes.entities[id]);
  });

  it("returns undefined if the episode is not found", () => {
    const state = STORE_FIXTURES.state;
    const id = 9999;
    const episode = selectEpisodeById(state, id);

    expect(episode).toBeUndefined();
  });
});
