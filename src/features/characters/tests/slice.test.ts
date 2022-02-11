import { createAction } from "@reduxjs/toolkit";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import { requestCharactersPage } from "../asyncActions";
import { charactersSlice, selectCharacterById } from "../slice";
import * as FIXTURES from "./fixtures";

const nullAction = createAction("null");
const requestCharactersPageFulfilledAction = requestCharactersPage.fulfilled(
  FIXTURES.characters,
  "",
  1
);

describe("charactersSlice", () => {
  describe("reducer", () => {
    it("returns the initial state", () => {
      const state = charactersSlice.reducer(undefined, nullAction);
      expect(state).toEqual(charactersSlice.getInitialState());
      expect(state).toEqual({
        ids: [],
        entities: {},
      });
    });

    it("handles the `requestCharactersPage.fulfilled` action", async () => {
      const state = charactersSlice.reducer(
        undefined,
        requestCharactersPageFulfilledAction
      );
      expect(state).toMatchObject({
        ids: expect.arrayContaining(FIXTURES.characters.map((ch) => ch.id)),
      });
      expect(Object.values(state.entities)).toEqual(FIXTURES.characters);
    });

    it("ignores other actions", () => {
      const expectedState = charactersSlice.getInitialState();
      let nextState = charactersSlice.reducer(undefined, nullAction);
      expect(nextState).toEqual(expectedState);
      nextState = charactersSlice.reducer(undefined, { type: "test-action" });
      expect(nextState).toEqual(expectedState);
      // Rejected action from the thunk is ignored, the store only reacts to `fulfilled`
      nextState = charactersSlice.reducer(undefined, {
        type: requestCharactersPage.rejected.name,
        payload: { test: "value" },
      });
      expect(nextState).toEqual(expectedState);
    });
  });
});

describe("selectCharacterById", () => {
  it("select a character if present in the state", () => {
    const state = STORE_FIXTURES.state;
    const id = state.characters.ids[0];
    const character = selectCharacterById(state, id);

    expect(character).toEqual(state.characters.entities[id]);
  });

  it("returns undefined if the character is not found", () => {
    const state = STORE_FIXTURES.state;
    const id = 9999;
    const character = selectCharacterById(state, id);

    expect(character).toBeUndefined();
  });
});
