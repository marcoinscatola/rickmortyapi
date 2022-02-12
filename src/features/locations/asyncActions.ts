import { createAsyncThunk } from "@reduxjs/toolkit";
import { selectLocationsIds } from "./slice";
import { LocationEntity } from "./types";
import { ID, rickMortyApiClient } from "@/features/api";
import { normalizeLocation } from "./utils";
import { RootState } from "@/store";

/**
 * Async thunk action that fetches a set of locations given
 * the IDs.
 * @param ids The IDs of the locations to fetch.
 */
export const requestLocations = createAsyncThunk<
  LocationEntity[],
  ID[],
  { rejectValue: string | Error; state: RootState }
>("api/requestLocations", async (ids, thunkApi) => {
  try {
    const availableLocationsIds = selectLocationsIds(thunkApi.getState());
    const missingLocationsIds = ids.filter(
      (id) => !availableLocationsIds.includes(id)
    );
    if (!missingLocationsIds.length) {
      return [];
    }
    const apiResult = await rickMortyApiClient.getLocationsByIds(
      missingLocationsIds
    );
    const locations = apiResult instanceof Array ? apiResult : [apiResult];
    const normalizedLocations = locations.map(normalizeLocation);
    return normalizedLocations;
  } catch (e) {
    return thunkApi.rejectWithValue(e as Error);
  }
});
