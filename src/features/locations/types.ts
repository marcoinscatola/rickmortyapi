import { BaseEntity, ID } from "@/features/api";

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
