import { RootState } from "@/store";
import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { requestLocations } from "./asyncActions";
import { LocationEntity, LocationsState } from "./types";

const initialState: LocationsState = {
  ids: [],
  entities: {},
};

const locationsAdapter = createEntityAdapter<LocationEntity>();

export const locationsSlice = createSlice<LocationsState, {}, "locations">({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addMatcher(
      // When the `requestLocations` thunk fulfills, use the `entityAdapter`
      // methods to update the state.
      requestLocations.fulfilled.match,
      (state, action) => {
        const { payload: locations } = action;
        locationsAdapter.setMany(state, locations);
      }
    ),
});

const selectors = locationsAdapter.getSelectors<RootState>(
  (state) => state["locations"]
);

export const selectLocationById = selectors.selectById;

export const selectLocationsIds = selectors.selectIds;
