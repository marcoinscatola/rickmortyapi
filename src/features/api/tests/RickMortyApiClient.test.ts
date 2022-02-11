import { Response } from "node-fetch";
import { RickMortyApiClient } from "@/features/api/RickMortyApiClient";
import * as FIXTURES from "./fixtures";

const createFetchImplementation: (
  mockedResponse: Partial<Response>
) => () => Promise<Partial<Response>> = (mockedResponse) => async () =>
  mockedResponse;

const createSuccessFetchImplementation: (
  data: object
) => () => Promise<Partial<Response>> = (data) =>
  createFetchImplementation({
    ok: true,
    json: async () => data,
  });

const createFailureFetchImplementation: (
  status: number,
  data?: object
) => () => Promise<Partial<Response>> = (status, data) =>
  createFetchImplementation({
    ok: false,
    status,
    json: async () => data,
  });

const fetchMock = jest.fn(
  createFetchImplementation({ ok: true, json: async () => ({}) })
);

describe("RickMortyApiClient", () => {
  let rickMortyApiClient: RickMortyApiClient;

  beforeEach(() => {
    fetchMock.mockClear();
    rickMortyApiClient = new RickMortyApiClient(
      "https://example.com",
      fetchMock as unknown as typeof fetch
    );
  });

  it("should instantiate a client with a suite of methods to query the API", () => {
    expect(rickMortyApiClient.getCharactersByPage).toBeInstanceOf(Function);
    expect(rickMortyApiClient.getEpisodesByIds).toBeInstanceOf(Function);
    expect(rickMortyApiClient.getLocationsByIds).toBeInstanceOf(Function);
  });

  it("should call the provided fetch implementation", async () => {
    fetchMock.mockImplementationOnce(
      createSuccessFetchImplementation({ data: "test" })
    );
    await rickMortyApiClient.getEpisodesByIds(["1"]);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  describe("getEpisodesByIds", () => {
    it("should return an array of episodes", async () => {
      fetchMock.mockImplementationOnce(
        createSuccessFetchImplementation(FIXTURES.episodes)
      );
      const res = await rickMortyApiClient.getEpisodesByIds(["1,2,3"]);
      expect(res).toEqual(expect.arrayContaining(FIXTURES.episodes));
    });

    it("should return an array of episodes even in the event of a single result", async () => {
      fetchMock.mockImplementationOnce(
        createSuccessFetchImplementation(FIXTURES.episode)
      );
      const res = await rickMortyApiClient.getEpisodesByIds(["1"]);
      expect(res).toEqual(expect.arrayContaining([FIXTURES.episode]));
    });

    it("should throw if the API call returns an error", () => {
      fetchMock.mockImplementationOnce(createFailureFetchImplementation(500));
      rickMortyApiClient
        .getEpisodesByIds(["1"])
        .catch((e) => expect(e).toEqual(expect.any(Error)));
      expect.assertions(1);
    });

    it("should throw if the API doesn't find any results", () => {
      fetchMock.mockImplementationOnce(
        createFailureFetchImplementation(404, FIXTURES.episodeNotFound)
      );
      rickMortyApiClient
        .getEpisodesByIds(["999"])
        .catch((e) => expect(e).toEqual(expect.any(Error)));
      expect.assertions(1);
    });
  });

  describe("getLocationsByIds", () => {
    it("should return an array of locations", async () => {
      fetchMock.mockImplementationOnce(
        createSuccessFetchImplementation(FIXTURES.locations)
      );
      const res = await rickMortyApiClient.getLocationsByIds(["1,2,3"]);
      expect(res).toEqual(expect.arrayContaining(FIXTURES.locations));
    });

    it("should return an array of locations even in the event of a single result", async () => {
      fetchMock.mockImplementationOnce(
        createSuccessFetchImplementation(FIXTURES.locations)
      );
      const res = await rickMortyApiClient.getLocationsByIds(["1"]);
      expect(res).toEqual(expect.arrayContaining([FIXTURES.location]));
    });

    it("should throw if the API call returns an error", () => {
      fetchMock.mockImplementationOnce(createFailureFetchImplementation(500));
      rickMortyApiClient
        .getLocationsByIds(["1"])
        .catch((e) => expect(e).toEqual(expect.any(Error)));
      expect.assertions(1);
    });

    it("should throw if the API doesn't find any results", () => {
      fetchMock.mockImplementationOnce(
        createFailureFetchImplementation(404, FIXTURES.locationNotFound)
      );
      rickMortyApiClient
        .getLocationsByIds(["999"])
        .catch((e) => expect(e).toEqual(expect.any(Error)));
      expect.assertions(1);
    });
  });

  describe("getCharactersByPage", () => {
    it("should return a paginated result containing characters", async () => {
      fetchMock.mockImplementationOnce(
        createSuccessFetchImplementation(FIXTURES.paginatedCharacters)
      );
      const res = await rickMortyApiClient.getCharactersByPage("2");
      expect(res).toEqual({
        info: expect.objectContaining({
          next: expect.any(String),
          prev: expect.any(String),
          count: expect.any(Number),
          pages: expect.any(Number),
        }),
        results: expect.arrayContaining(FIXTURES.paginatedCharacters.results),
      });
    });

    it("should throw if the API call returns an error", () => {
      fetchMock.mockImplementationOnce(createFailureFetchImplementation(500));
      rickMortyApiClient
        .getCharactersByPage("1")
        .catch((e) => expect(e).toEqual(expect.any(Error)));
      expect.assertions(1);
    });

    it("should throw if the API doesn't find any results", () => {
      fetchMock.mockImplementationOnce(
        createFailureFetchImplementation(404, FIXTURES.pageNotFound)
      );
      rickMortyApiClient
        .getCharactersByPage("999")
        .catch((e) => expect(e).toEqual(expect.any(Error)));
      expect.assertions(1);
    });
  });
});
