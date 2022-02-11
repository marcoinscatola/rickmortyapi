import { createAsyncThunk } from "@reduxjs/toolkit";
import { LocationEntity, LocationFromApi } from ".";
import { ID, rickMortyApiClient } from "@/features/api";
import { normalizeLocation } from "./utils";

/**
 * Async thunk action that fetches a set of locations given
 * the IDs.
 * @param ids The IDs of the locations to fetch.
 */
export const requestLocations = createAsyncThunk<
  LocationEntity[],
  ID[],
  { rejectValue: string | Error }
>("api/requestLocations", async (ids, thunkApi) => {
  try {
    const apiResult = await rickMortyApiClient.getLocationsByIds(ids);
    const locations = apiResult instanceof Array ? apiResult : [apiResult];
    const normalizedLocations = locations.map(normalizeLocation);
    return normalizedLocations;
  } catch (e) {
    return thunkApi.rejectWithValue(e as Error);
  }
});
