import { normalizeLocation } from "../utils";
import { LocationEntity, LocationFromApi } from "..";

const locationFromApi: LocationFromApi = {
  id: 1,
  name: "test-name",
  type: "test-type",
  dimension: "test-dimension",
  residents: [
    "https://example.com/character/1",
    "https://example.com/character/2",
  ],
  url: "https://example.com/location/1",
  created: new Date(2020, 10, 20).toISOString(),
};

const expected: LocationEntity = {
  id: locationFromApi.id,
  name: locationFromApi.name,
  type: locationFromApi.type,
  dimension: locationFromApi.dimension,
  residents: [1, 2],
  url: locationFromApi.url,
  created: locationFromApi.created,
};

describe("normalizeLocation", () => {
  it("changes the URL references to IDs", () => {
    expect(normalizeLocation(locationFromApi)).toEqual(expected);
  });
});
