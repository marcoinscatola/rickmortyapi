import { createStore } from "@/store";
import { requestCharactersPage } from "../asyncActions";
import * as API_FIXTURES from "@/features/api/tests/fixtures";
import { fetch } from "@/test/test-utils";
import { normalizeCharacter } from "../utils";
import { normalizeLocation } from "@/features/locations/utils";
import { normalizeEpisode } from "@/features/episodes/utils";

let store: ReturnType<typeof createStore>;

beforeEach(() => {
  store = createStore();
});
afterEach(() => {
  fetch.reset();
});

describe("requestCharactersPage", () => {
  it("calls the character API", async () => {
    const mock = fetch
      .mock(/api\/character/, API_FIXTURES.paginatedCharacters)
      .mock(/api\/episode/, API_FIXTURES.episodes)
      .mock(/api\/location/, API_FIXTURES.locations);
    await store.dispatch(requestCharactersPage("1"));
    expect(mock.called(/api\/character/)).toBe(true);
  });

  it("also calls the episodes and location API with the ids collected from the original response", async () => {
    const mock = fetch
      .mock(/api\/character/, API_FIXTURES.paginatedCharacters)
      .mock(/api\/episode/, API_FIXTURES.episodes)
      .mock(/api\/location/, API_FIXTURES.locations);
    await store.dispatch(requestCharactersPage("1"));
    expect(mock.called(/api\/episode/)).toBe(true);
    expect(mock.called(/api\/location/)).toBe(true);
  });

  it("stores the normalized results in the state", async () => {
    const mock = fetch
      .mock(/api\/character/, API_FIXTURES.paginatedCharacters)
      .mock(/api\/episode/, API_FIXTURES.episodes)
      .mock(/api\/location/, API_FIXTURES.locations);
    await store.dispatch(requestCharactersPage("1"));
    const state = store.getState();
    expect(state.characters.ids).toHaveLength(
      API_FIXTURES.paginatedCharacters.results.length
    );
    expect(Object.values(state.characters.entities)).toEqual(
      API_FIXTURES.paginatedCharacters.results.map(normalizeCharacter)
    );
  });

  it("also stores the normalized results for the episodes and locations found in the character response", async () => {
    const mock = fetch
      .mock(/api\/character/, API_FIXTURES.paginatedCharacters)
      .mock(/api\/episode/, API_FIXTURES.episodes)
      .mock(/api\/location/, API_FIXTURES.locations);
    await store.dispatch(requestCharactersPage("1"));
    const state = store.getState();
    expect(state.locations.ids).toHaveLength(API_FIXTURES.locations.length);
    expect(Object.values(state.locations.entities)).toEqual(
      API_FIXTURES.locations.map(normalizeLocation)
    );
    expect(state.episodes.ids).toHaveLength(API_FIXTURES.episodes.length);
    expect(Object.values(state.episodes.entities)).toEqual(
      API_FIXTURES.episodes.map(normalizeEpisode)
    );
  });
});
