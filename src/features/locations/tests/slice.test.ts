import { createAction } from "@reduxjs/toolkit";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import { requestLocations } from "../asyncActions";
import { locationsSlice, selectLocationById } from "../slice";
import * as FIXTURES from "./fixtures";

const nullAction = createAction("null");
const requestLocationsFulfilledAction = requestLocations.fulfilled(
  FIXTURES.locations,
  "",
  ["1", "2", "3"]
);

describe("locationsSlice", () => {
  describe("reducer", () => {
    it("returns the initial state", () => {
      const state = locationsSlice.reducer(undefined, nullAction);
      expect(state).toEqual(locationsSlice.getInitialState());
      expect(state).toEqual({
        ids: [],
        entities: {},
      });
    });

    it("handles the `requestLocations.fulfilled` action", async () => {
      const state = locationsSlice.reducer(
        undefined,
        requestLocationsFulfilledAction
      );
      expect(state).toMatchObject({
        ids: expect.arrayContaining(FIXTURES.locations.map((loc) => loc.id)),
      });
      expect(Object.values(state.entities)).toEqual(FIXTURES.locations);
    });

    it("ignores other actions", () => {
      const expectedState = locationsSlice.getInitialState();
      let nextState = locationsSlice.reducer(undefined, nullAction);
      expect(nextState).toEqual(expectedState);
      nextState = locationsSlice.reducer(undefined, { type: "test-action" });
      expect(nextState).toEqual(expectedState);
      // Rejected action from the thunk is ignored, the store only reacts to `fulfilled`
      nextState = locationsSlice.reducer(undefined, {
        type: requestLocations.rejected.name,
        payload: { test: "value" },
      });
      expect(nextState).toEqual(expectedState);
    });
  });
});

describe("selectLocationById", () => {
  it("select a location if present in the state", () => {
    const state = STORE_FIXTURES.state;
    const id = state.locations.ids[0];
    const location = selectLocationById(state, id);

    expect(location).toEqual(state.locations.entities[id]);
  });

  it("returns undefined if the location is not found", () => {
    const state = STORE_FIXTURES.state;
    const id = 9999;
    const location = selectLocationById(state, id);

    expect(location).toBeUndefined();
  });
});
