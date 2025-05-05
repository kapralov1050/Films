export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  production_countries?: Country[];
  spoken_languages?: Language[];
  genres?: Genre[];
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieFilterParams {
  "air_date.gte"?: string;
  "air_date.lte"?: string;
  certification?: string;
  certification_country?: string;
  debug?: boolean | string;
  "first_air_date.gte"?: string;
  "first_air_date.lte"?: string;
  page?: number;
  "primary_release_date.gte"?: string;
  "primary_release_date.lte"?: string;
  region?: string;
  "release_date.gte"?: string;
  "release_date.lte"?: string;
  show_me?: string;
  sort_by?: string;
  "vote_average.gte"?: number;
  "vote_average.lte"?: number;
  "vote_count.gte"?: number;
  watch_region?: string;
  with_genres?: string | string[]; 
  with_keywords?: string;
  with_networks?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_watch_monetization_types?: string;
  with_watch_providers?: string;
  with_release_type?: string;
  "with_runtime.gte"?: number;
  "with_runtime.lte"?: number;
}

export interface Language {
  name: string;
  id: number;
}

export interface Country {
  name: string;
  id: number;
}

export interface movieRating {
  id: number;
  rating: number;
}

export interface RatingResponse {
  status_code: number;
  status_message: string;
}

export interface movieWatchList {
  id: number;
}

export interface paginationParams {
  page: number;
  totalResults: number ;
}

export interface userData {
  avatar: {}
  id: number
  iso_639_1: string
  iso_3166_1: string
  name: string
  include_adult: boolean
  username: string
}

export interface WatchListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface UserLists {
  page: number;
  results: List[];
  total_pages: number;
  total_results: number
}

export interface Genre {
  id: number;
  name: string
}

export interface language {
  iso_639_1: string;
  english_name: string;
  name: string
}

export interface ListDetailsResponse {
  created_by: string;
  description: string;
  favorite_count: number;
  id: string;
  items: Movie[];
  item_count: number;
  iso_639_1: string;
  name: string;
  poster_path: string
}

export interface List {
  description: string;
  favorite_count: number;
  id: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
  name: string;
  poster_path: string | null;
}

export interface movieCredits {
  id: number;
  cast: PersonInCast[];
  crew: [];
}

export interface PersonInCast {
  adult: number;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface PersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number | 0;
  homepage: string | null;
  images: {
    profiles: PersonImage[]
  };
  id: number;
  imdb_id: string | null;
  known_for_department: string;
  movie_credits: MovieCredits;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
}

export interface MovieCredits {
  cast: MovieCredit[];
  crew: []
}

export interface MovieCredit {
  adult: boolean;
  backdrop_path: string | null;
  character: string;
  credit_id: string;
  genre_ids: number[];
  id: number;
  order: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PersonImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export enum Gender {
  Unknown = 0,
  Female = 1,
  Male = 2
}