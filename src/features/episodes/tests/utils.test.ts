import { normalizeEpisode } from "../utils";
import { EpisodeEntity, EpisodeFromApi } from "..";

const episodeFromApi: EpisodeFromApi = {
  id: 1,
  name: "test-name",
  episode: "test-episode",
  air_date: "test-air_date",
  characters: [
    "https://example.com/character/1",
    "https://example.com/character/2",
  ],
  url: "https://example.com/episode/1",
  created: new Date(2020, 10, 20).toISOString(),
};

const expected: EpisodeEntity = {
  id: episodeFromApi.id,
  name: episodeFromApi.name,
  episode: episodeFromApi.episode,
  air_date: episodeFromApi.air_date,
  characters: ["1", "2"],
  url: "https://example.com/episode/1",
  created: episodeFromApi.created,
};

describe("normalizeEpisode", () => {
  it("changes the URL references to IDs", () => {
    expect(normalizeEpisode(episodeFromApi)).toEqual(expected);
  });
});
