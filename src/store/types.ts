import type { CharactersState } from "@/features/characters";
import type { EpisodesState } from "@/features/episodes";
import type { LocationsState } from "@/features/locations";
import type { Store } from "./createStore";

export type RootState = {
  characters: CharactersState;
  locations: LocationsState;
  episodes: EpisodesState;
};

export type AppDispatch = Store["dispatch"];
