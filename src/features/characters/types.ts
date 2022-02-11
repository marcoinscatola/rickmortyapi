import { BaseEntity, ID } from "@/features/api";

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
