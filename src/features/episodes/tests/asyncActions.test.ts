import { createStore } from "@/store";
import * as API_FIXTURES from "@/features/api/tests/fixtures";
import * as STORE_FIXTURES from "@/store/tests/fixtures";
import { fetch } from "@/test/test-utils";
import { requestEpisodes } from "../asyncActions";
import { normalizeEpisode } from "../utils";

let store: ReturnType<typeof createStore>;

beforeEach(() => {
  store = createStore();
});
afterEach(() => {
  fetch.reset();
});

describe("requestEpisodes", () => {
  it("calls the episodes API", async () => {
    const mock = fetch.mock("*", API_FIXTURES.episodes);
    await store.dispatch(requestEpisodes([1, 2, 3]));
    expect(mock.lastCall()).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/api\/episode/),
        { method: "GET" },
      ])
    );
  });

  it("stores the normalized results in the state", async () => {
    fetch.mock("*", API_FIXTURES.episodes);
    await store.dispatch(requestEpisodes([1, 2, 3]));
    const state = store.getState();
    expect(state.episodes.ids).toHaveLength(API_FIXTURES.episodes.length);
    expect(Object.values(state.episodes.entities)).toEqual(
      API_FIXTURES.episodes.map(normalizeEpisode)
    );
  });

  it("doesn't request episodes that are already available in the store", async () => {
    const mock = fetch.mock("*", API_FIXTURES.episodes);
    const storeWithState = createStore(STORE_FIXTURES.state);
    // These episodes are already loaded in the state fixture
    await storeWithState.dispatch(requestEpisodes([1, 2, 3]));
    expect(mock.called()).toBe(false);
  });
});
