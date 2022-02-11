import { extractIdFromUrl } from "@/utils";
import { LocationEntity, LocationFromApi } from "./types";

/**
 * Transforms data as received from the API replacing the resources URLs with
 * a simple ID, which is easier to use to reference to other entities in a
 * normalized state.
 * @param locationFromApi Location data as returned by the API.
 * @returns A normalized entity for the redux store.
 */
export const normalizeLocation = (
  locationFromApi: LocationFromApi
): LocationEntity => {
  const { id, name, type, dimension, residents, url, created } =
    locationFromApi;
  return {
    id,
    name,
    type,
    dimension,
    residents: residents.map(extractIdFromUrl),
    url,
    created,
  };
};
