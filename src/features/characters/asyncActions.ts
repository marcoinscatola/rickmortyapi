import { createAsyncThunk } from "@reduxjs/toolkit";
import { ID, PaginatedApiSuccess, rickMortyApiClient } from "@/features/api";
import { requestEpisodes } from "@/features/episodes";
import { requestLocations } from "@/features/locations";
import { RootState } from "@/store";
import { normalizeCharacter } from "./utils";
import { CharacterEntity } from "./types";

/**
 * Async thunk action that fetches a page of characters, collects
 * the references to episodes and locations contained in the results
 * and dispatches the actions needed to fetch the missing resources.
 * @param page The page to fetch.
 */
export const requestCharactersPage = createAsyncThunk<
  PaginatedApiSuccess<CharacterEntity>,
  number,
  { rejectValue: string | Error; state: RootState }
>("api/requestCharacterPage", async (page, thunkApi) => {
  try {
    const apiResult = await rickMortyApiClient.getCharactersByPage(page);

    const locations = new Set<ID>();
    const episodes = new Set<ID>();
    const info = apiResult.info;
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

    return {
      info,
      results: characters,
    };
  } catch (e) {
    return thunkApi.rejectWithValue(e as Error);
  }
});
