import { extractIdFromUrl } from "@/utils";
import { CharacterEntity, CharacterFromApi } from "./types";

/**
 * Transforms data as received from the API replacing the resources URLs with
 * a simple ID, which is easier to use to reference to other entities in a
 * normalized state.
 * @param characterFromApi Character data as returned by the API.
 * @returns A normalized entity for the redux store.
 */
export const normalizeCharacter = (
  characterFromApi: CharacterFromApi
): CharacterEntity => {
  const {
    id,
    name,
    status,
    species,
    type,
    gender,
    origin,
    location,
    image,
    episode,
    url,
    created,
  } = characterFromApi;
  return {
    id,
    name,
    status,
    species,
    type,
    gender,
    origin: origin.url ? extractIdFromUrl(origin.url) : null,
    location: location.url ? extractIdFromUrl(location.url) : null,
    image,
    episode: episode.map(extractIdFromUrl),
    url,
    created,
  };
};
