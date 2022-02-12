import { createAsyncThunk } from "@reduxjs/toolkit";
import { ID, rickMortyApiClient } from "@/features/api";
import { selectEpisodesIds } from "./slice";
import { EpisodeEntity } from "./types";
import { normalizeEpisode } from "./utils";
import { RootState } from "@/store";

/**
 * Async thunk action that fetches a set of episodes given
 * the IDs.
 * @param ids The IDs of the episodes to fetch.
 */
export const requestEpisodes = createAsyncThunk<
  EpisodeEntity[],
  ID[],
  { rejectValue: string | Error; state: RootState }
>("api/requestEpisodes", async (ids, thunkApi) => {
  try {
    const availableEpisodesIds = selectEpisodesIds(thunkApi.getState());
    const missingEpisodesIds = ids.filter(
      (id) => !availableEpisodesIds.includes(id)
    );
    if (!missingEpisodesIds.length) {
      return [];
    }
    const apiResult = await rickMortyApiClient.getEpisodesByIds(
      missingEpisodesIds
    );
    const episodes = apiResult instanceof Array ? apiResult : [apiResult];
    const normalizedEpisodes = episodes.map(normalizeEpisode);
    return normalizedEpisodes;
  } catch (e) {
    return thunkApi.rejectWithValue(e as Error);
  }
});
