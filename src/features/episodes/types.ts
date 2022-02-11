import { BaseEntity, ID } from "@/features/api";

export interface EpisodeEntity extends BaseEntity {
  id: ID;
  name: string;
  air_date: string;
  episode: string;
  characters: ID[];
  url: string;
  created: string;
}

export interface EpisodeFromApi extends BaseEntity {
  id: ID;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
