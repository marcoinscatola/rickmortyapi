import { CharacterFromApi } from "@/features/characters";
import { EpisodeFromApi } from "@/features/episodes";
import { LocationFromApi } from "@/features/locations";
import {
  EntityType,
  ID,
  ApiError,
  ApiResult,
  ApiSuccess,
  BaseEntity,
  PaginatedApiResult,
  PaginatedApiSuccess,
} from "./types";

const BASE_URL = "https://rickandmortyapi.com";
const entityTypeEndpoint: { [key in EntityType]: string } = {
  characters: "api/character/",
  episodes: "api/episode/",
  locations: "api/location/",
};

/**
 * A simple implementation of an API client to query `https://rickandmortyapi.com/`.
 */
export class RickMortyApiClient {
  baseUrl: string;
  fetch: (
    input: RequestInfo,
    init?: RequestInit | undefined
  ) => Promise<Response>;

  /**
   * @param baseUrl The base URL to build the request URLs.
   * @param fetchMethod An optional custom fetch implementation, by default it will
   * use the `fetch` accessible in the global scope (available both on the browser and server
   * since it's polyfilled by `next`)
   */
  constructor(baseUrl: string, fetchMethod = fetch) {
    this.baseUrl = baseUrl;
    this.fetch = fetchMethod.bind(globalThis);
  }

  /**
   * Abstraction over fetch to make a GET request and unwrap the json result.
   * @param url The request url.
   * @returns A promise with the unwrapped response.
   */
  private async execGet<T extends any>(url: string): Promise<T> {
    const response = await this.fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(
        `RickMortyApiClient#getResource: fetch failed with status ${response.status}`
      );
    }
    return response.json();
  }

  /**
   * Request a number of resources by providing the endpoint and the resources IDs.
   * @param endpoint The endpoint for the requested resource.
   * @param ids The IDs of the requested resource.
   * @returns
   */
  private async getResourceByIds<R extends BaseEntity>(
    endpoint: string,
    ids: ID[]
  ): Promise<R[]> {
    const resourceUrl = new URL(`${endpoint}${ids.join(",")}`, this.baseUrl);
    const response = await this.execGet<ApiResult<R>>(resourceUrl.toString());
    if ((response as ApiError).error) {
      const apiError = response as ApiError;
      throw new Error(apiError.error);
    }

    const data = response as ApiSuccess<R>;
    return data instanceof Array ? data : [data];
  }

  /**
   * Request a paginated resource by providing the endpoint and the page.
   * See https://rickandmortyapi.com/documentation/#info-and-pagination
   * @param endpoint The endpoint for the requested resource.
   * @param page The page for the requested resource.
   * @returns
   */
  private async getPaginatedResource<R extends BaseEntity>(
    endpoint: string,
    page: number | string
  ): Promise<PaginatedApiSuccess<R>> {
    const resourceUrl = new URL(endpoint, this.baseUrl);
    const pageAsString = typeof page === "number" ? page.toFixed() : page;
    resourceUrl.searchParams.set("page", pageAsString);
    const response = await this.execGet<PaginatedApiResult<R>>(
      resourceUrl.toString()
    );
    if ((response as ApiError).error) {
      const apiError = response as ApiError;
      throw new Error(apiError.error);
    }

    const data = response as PaginatedApiSuccess<R>;
    return data;
  }

  /**
   * Request a paginated list of characters.
   * See https://rickandmortyapi.com/documentation/#get-all-characters
   * @param page The page to request.
   * @returns
   */
  async getCharactersByPage(page: string | number) {
    return this.getPaginatedResource<CharacterFromApi>(
      entityTypeEndpoint.characters,
      page
    );
  }

  /**
   * Request a specific set of episodes.
   * See https://rickandmortyapi.com/documentation/#get-multiple-episodes
   * @param ids The IDs to request.
   * @returns
   */
  async getEpisodesByIds(ids: ID[]) {
    return this.getResourceByIds<EpisodeFromApi>(
      entityTypeEndpoint.episodes,
      ids
    );
  }

  /**
   * Request a specific set of locations.
   * See https://rickandmortyapi.com/documentation/#get-multiple-locations
   * @param ids The IDs to request.
   * @returns
   */
  async getLocationsByIds(ids: ID[]) {
    return this.getResourceByIds<LocationFromApi>(
      entityTypeEndpoint.locations,
      ids
    );
  }
}

export const rickMortyApiClient = new RickMortyApiClient(BASE_URL);
