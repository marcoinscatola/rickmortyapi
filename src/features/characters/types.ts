import { BaseEntity, ID } from "@/features/api";
import { EntityState } from "@reduxjs/toolkit";

export interface PageState {
  status: "loading" | "loaded" | "error";
  ids?: ID[];
  error: string | null;
}
export interface CharactersState extends EntityState<CharacterEntity> {
  pages: {
    [key: string]: PageState;
  };
  pagination: {
    current: number;
    pages?: number;
  };
}

export interface CharacterEntity extends BaseEntity {
  id: ID;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: ID | null;
  location: ID | null;
  image: string;
  episode: ID[];
  url: string;
  created: string;
}

export interface CharacterFromApi extends BaseEntity {
  id: ID;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}
