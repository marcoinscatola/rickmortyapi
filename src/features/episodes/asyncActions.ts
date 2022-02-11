import { createAsyncThunk } from "@reduxjs/toolkit";
import { EpisodeEntity, EpisodeFromApi } from ".";
import { ID, rickMortyApiClient } from "@/features/api";
import { normalizeEpisode } from "./utils";

/**
 * Async thunk action that fetches a set of episodes given
 * the IDs.
 * @param ids The IDs of the episodes to fetch.
 */
export const requestEpisodes = createAsyncThunk<
  EpisodeEntity[],
  ID[],
  { rejectValue: string | Error }
>("api/requestEpisodes", async (ids, thunkApi) => {
  try {
    const apiResult = await rickMortyApiClient.getEpisodesByIds(ids);
    const episodes = apiResult instanceof Array ? apiResult : [apiResult];
    const normalizedEpisodes = episodes.map(normalizeEpisode);
    return normalizedEpisodes;
  } catch (e) {
    return thunkApi.rejectWithValue(e as Error);
  }
});
