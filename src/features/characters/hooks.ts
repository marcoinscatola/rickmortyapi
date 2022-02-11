import { useAppSelector } from "@/store";
import { CharacterEntity, selectCharacterById } from ".";
import { ID } from "@/features/api";

/**
 * Returns either a character data or a loading status if the character is
 * not found in the store.
 * @param id The character ID.
 * @returns
 */
export const useCharacter: (id: ID) => {
  loading: boolean;
  data?: CharacterEntity;
} = (id) => {
  const entity = useAppSelector((state) => selectCharacterById(state, id));

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
