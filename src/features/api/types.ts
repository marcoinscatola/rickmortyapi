export type ID = string | number;

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface BaseEntity {
  id: ID;
}

export type EntityType = "characters" | "locations" | "episodes";

export type ApiSuccess<T> = T[] | T;

export type PaginatedApiSuccess<T> = {
  info: Info;
  results: T[];
};

export type ApiError = {
  error: string;
};

export type PaginatedApiResult<T> = PaginatedApiSuccess<T> | ApiError;

export type ApiResult<T> = ApiSuccess<T> | ApiError;
