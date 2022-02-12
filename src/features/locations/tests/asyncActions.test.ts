import { createStore } from "@/store";
import { requestLocations } from "../asyncActions";
import * as API_FIXTURES from "@/features/api/tests/fixtures";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import { fetch } from "@/test/test-utils";
import { normalizeLocation } from "../utils";

let store: ReturnType<typeof createStore>;

beforeEach(() => {
  store = createStore();
});
afterEach(() => {
  fetch.reset();
});

describe("requestLocations", () => {
  it("calls the locations API", async () => {
    const mock = fetch.mock("*", API_FIXTURES.locations);
    await store.dispatch(requestLocations(["1", "2", "3"]));
    expect(mock.lastCall()).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/api\/location/),
        { method: "GET" },
      ])
    );
  });

  it("stores the normalized results in the state", async () => {
    fetch.mock("*", API_FIXTURES.locations);
    await store.dispatch(requestLocations(["1", "2", "3"]));
    const state = store.getState();
    expect(state.locations.ids).toHaveLength(API_FIXTURES.locations.length);
    expect(Object.values(state.locations.entities)).toEqual(
      API_FIXTURES.locations.map(normalizeLocation)
    );
  });

  it("doesn't request locations that are already available in the store", async () => {
    const mock = fetch.mock("*", API_FIXTURES.episodes);
    const storeWithState = createStore(STORE_FIXTURES.state);
    // These locations are already loaded in the state fixture
    await storeWithState.dispatch(requestLocations([1, 2, 3]));
    expect(mock.called()).toBe(false);
  });
});
