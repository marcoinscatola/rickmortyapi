import { BaseEntity, ID } from "@/features/api";
import { EntityState } from "@reduxjs/toolkit";

export interface EpisodesState extends EntityState<EpisodeEntity> {}
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
