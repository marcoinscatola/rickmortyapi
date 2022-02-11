import { useAppSelector } from "@/store";
import { EpisodeEntity, selectEpisodeById } from ".";
import { ID } from "@/features/api";

/**
 * Returns either an episode data or a loading status if the episode is
 * not found in the store.
 * @param id The episode ID.
 * @returns
 */
export const useEpisode: (id: ID) => {
  loading: boolean;
  data?: EpisodeEntity;
} = (id) => {
  const entity = useAppSelector((state) => selectEpisodeById(state, id));

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
