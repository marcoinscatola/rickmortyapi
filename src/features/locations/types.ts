import { BaseEntity, ID } from "@/features/api";
import { EntityState } from "@reduxjs/toolkit";

export interface LocationsState extends EntityState<LocationEntity> {}
export interface LocationEntity extends BaseEntity {
  id: ID;
  name: string;
  type: string;
  dimension: string;
  residents: ID[];
  url: string;
  created: string;
}

export interface LocationFromApi extends BaseEntity {
  id: ID;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
