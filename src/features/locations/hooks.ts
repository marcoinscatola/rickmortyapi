import { useAppSelector } from "@/store";
import { LocationEntity, selectLocationById } from ".";
import { ID } from "@/features/api";

/**
 * Returns either a location data or a loading status if the location is
 * not found in the store.
 * @param id The location ID.
 * @returns
 */
export const useLocation: (id: ID) => {
  loading: boolean;
  data?: LocationEntity;
} = (id) => {
  const entity = useAppSelector((state) => selectLocationById(state, id));

  if (!entity) {
    return {
      loading: true,
    };
  }
  return {
    loading: false,
    data: entity,
  };
};
