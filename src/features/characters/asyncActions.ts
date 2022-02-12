import { createAsyncThunk } from "@reduxjs/toolkit";
import { ID, rickMortyApiClient } from "@/features/api";
import { requestEpisodes } from "@/features/episodes";
import { normalizeCharacter } from "./utils";
import { CharacterEntity } from "./types";
import { requestLocations } from "@/features/locations";

/**
 * Async thunk action that fetches a page of characters, collects
 * the references to episodes and locations contained in the results
 * and dispatches the actions needed to fetch the missing resources.
 * @param page The page to fetch.
 */
export const requestCharactersPage = createAsyncThunk<
  CharacterEntity[],
  string | number,
  { rejectValue: string | Error }
>("api/requestCharacterPage", async (page, thunkApi) => {
  try {
    const apiResult = await rickMortyApiClient.getCharactersByPage(page);

    const locations = new Set<ID>();
    const episodes = new Set<ID>();
    const characters = apiResult.results.map(normalizeCharacter);
    characters.forEach(({ origin, location, episode }) => {
      if (origin) {
        locations.add(origin);
      }
      if (location) {
        locations.add(location);
      }
      episode.forEach((ep) => episodes.add(ep));
    });

    await thunkApi.dispatch(requestEpisodes(Array.from(episodes)));
    await thunkApi.dispatch(requestLocations(Array.from(locations)));

    return characters;
  } catch (e) {
    return thunkApi.rejectWithValue(e as Error);
  }
});
