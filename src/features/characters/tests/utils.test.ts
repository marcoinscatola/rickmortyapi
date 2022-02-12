import { normalizeCharacter } from "../utils";
import * as API_FIXTURES from "@/features/api/tests/fixtures";
import { CharacterEntity, CharacterFromApi } from "..";

const characterFromApi: CharacterFromApi = {
  id: 1,
  name: "test-name",
  status: "unknown",
  species: "test-species",
  type: "test-type",
  gender: "unknown",
  origin: {
    name: "test-origin",
    url: "https://example.com/location/7",
  },
  location: {
    name: "test-location",
    url: "https://example.com/location/9",
  },
  image: "https://example.com/test.png",
  episode: ["https://example.com/episode/1", "https://example.com/episode/2"],
  url: "https://example.com/character/1",
  created: new Date(2020, 10, 20).toISOString(),
};

const expected: CharacterEntity = {
  id: characterFromApi.id,
  name: characterFromApi.name,
  status: characterFromApi.status,
  species: characterFromApi.species,
  type: characterFromApi.type,
  gender: characterFromApi.gender,
  origin: 7,
  location: 9,
  image: "https://example.com/test.png",
  episode: [1, 2],
  url: "https://example.com/character/1",
  created: characterFromApi.created,
};

describe("normalizeCharacter", () => {
  it("changes the URL references to IDs", () => {
    expect(normalizeCharacter(characterFromApi)).toEqual(expected);
  });
});
