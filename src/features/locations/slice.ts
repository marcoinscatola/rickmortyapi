import { RootState } from "@/store";
import {
  createEntityAdapter,
  createSlice,
  EntityState,
} from "@reduxjs/toolkit";
import { requestLocations } from "./asyncActions";
import { LocationEntity } from "./types";

interface LocationsState extends EntityState<LocationEntity> {}

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
  (state) => state[locationsSlice.name]
);

export const selectLocationById = selectors.selectById;
