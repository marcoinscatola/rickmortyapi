import { extractIdFromUrl } from "@/utils";
import { EpisodeEntity, EpisodeFromApi } from "./types";

/**
 * Transforms data as received from the API replacing the resources URLs with
 * a simple ID, which is easier to use to reference to other entities in a
 * normalized state.
 * @param episodeFromApi Episode data as returned by the API.
 * @returns A normalized entity for the redux store.
 */
export const normalizeEpisode = (
  episodeFromApi: EpisodeFromApi
): EpisodeEntity => {
  const { id, name, characters, episode, air_date, url, created } =
    episodeFromApi;
  return {
    id,
    name,
    characters: characters.map(extractIdFromUrl),
    episode,
    air_date,
    url,
    created,
  };
};
