import { CharacterEntity } from "../..";
import { Info, PaginatedApiSuccess } from "@/features/api";
import _characters from "./characters.json";
import _info from "./info.json";

const characters = _characters as CharacterEntity[];
const info = _info as Info;

const paginatedResult: PaginatedApiSuccess<CharacterEntity> = {
  info,
  results: characters,
};

export { characters, info, paginatedResult };
