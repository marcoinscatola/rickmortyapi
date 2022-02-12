import { createAction } from "@reduxjs/toolkit";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import { requestCharactersPage } from "../asyncActions";
import { charactersSlice, selectCharacterById } from "../slice";
import * as FIXTURES from "./fixtures";

const nullAction = createAction("null");
const testPage = 1;
const requestCharactersPageFulfilledAction = requestCharactersPage.fulfilled(
  FIXTURES.paginatedResult,
  "",
  testPage
);

const requestCharactersPagePendingAction = requestCharactersPage.pending(
  "",
  testPage
);

const requestCharactersPageRejectedWithErrorAction =
  requestCharactersPage.rejected(new Error("Test error"), "", testPage);

const requestCharactersPageRejectedWithErrorMessageAction =
  requestCharactersPage.rejected(null, "", testPage, "Test error message");

describe("charactersSlice", () => {
  describe("reducer", () => {
    it("returns the initial state", () => {
      const state = charactersSlice.reducer(undefined, nullAction);
      expect(state).toEqual(charactersSlice.getInitialState());
      expect(state).toEqual({
        ids: [],
        entities: {},
        pages: {},
        pagination: {
          current: -1,
        },
      });
    });

    it("handles the `requestCharactersPage.fulfilled` action", async () => {
      const state = charactersSlice.reducer(
        undefined,
        requestCharactersPageFulfilledAction
      );

      const expectedIds = FIXTURES.paginatedResult.results.map((ch) => ch.id);

      expect(state).toMatchObject({
        ids: expect.arrayContaining(expectedIds),
        entities: expect.objectContaining(
          FIXTURES.paginatedResult.results.reduce((curr, next) => {
            return { ...curr, [next.id]: next };
          }, {})
        ),
        pages: {
          [testPage]: {
            status: "loaded",
            ids: expect.arrayContaining(expectedIds),
          },
        },
      });
    });

    it("handles the `requestCharactersPage.pending` action", async () => {
      const state = charactersSlice.reducer(
        undefined,
        requestCharactersPagePendingAction
      );
      expect(state).toMatchObject({
        ids: [],
        entities: {},
        pages: {
          [testPage]: {
            status: "loading",
          },
        },
      });
    });

    it("handles the `requestCharactersPage.rejected` action (rejected with Error)", async () => {
      const state = charactersSlice.reducer(
        undefined,
        requestCharactersPageRejectedWithErrorAction
      );
      expect(state).toMatchObject({
        ids: [],
        entities: {},
        pages: {
          [testPage]: {
            status: "error",
            error: "Test error",
          },
        },
      });
    });

    it("handles the `requestCharactersPage.rejected` action (rejected with error message)", async () => {
      const state = charactersSlice.reducer(
        undefined,
        requestCharactersPageRejectedWithErrorMessageAction
      );
      expect(state).toMatchObject({
        ids: [],
        entities: {},
        pages: {
          [testPage]: {
            status: "error",
            error: "Test error message",
          },
        },
      });
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
