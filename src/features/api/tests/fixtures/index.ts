import _episodes from "./episodes.json";
import _episodesNotFound from "./episodesNotFound.json";
import _locations from "./locations.json";
import _locationsNotFound from "./locationsNotFound.json";
import _paginatedCharacters from "./paginatedCharacters.json";
import _pageNotFound from "./pageNotFound.json";
import _episode from "./episode.json";
import _episodeNotFound from "./episodeNotFound.json";
import _location from "./location.json";
import _locationNotFound from "./locationNotFound.json";
import { ApiError, PaginatedApiSuccess } from "../../types";
import { EpisodeFromApi } from "@/features/episodes";
import { LocationFromApi } from "@/features/locations";
import { CharacterFromApi } from "@/features/characters";

const episodes = _episodes as EpisodeFromApi[];
const episodesNotFound = _episodesNotFound;
const locations = _locations as LocationFromApi[];
const locationsNotFound = _locationsNotFound;
const paginatedCharacters =
  _paginatedCharacters as PaginatedApiSuccess<CharacterFromApi>;
const pageNotFound = _pageNotFound as ApiError;
const episode = _episode as EpisodeFromApi;
const episodeNotFound = _episodeNotFound as ApiError;
const location = _location as LocationFromApi;
const locationNotFound = _locationNotFound as ApiError;

export {
  episodes,
  episodesNotFound,
  locations,
  locationsNotFound,
  paginatedCharacters,
  pageNotFound,
  episode,
  episodeNotFound,
  location,
  locationNotFound,
};
