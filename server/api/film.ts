export interface Film {
    id: string;
    url: string;
    primaryTitle: string;
    originalTitle: string;
    type: string;
    description: string;
    primaryImage: string;
    contentRating?: string;
    startYear: number;
    endYear?: number | null;
    releaseDate?: string;
    language: string;
    interests?: string[];
    countriesOfOrigin?: string[];
    externalLinks?: string[];
    spokenLanguages?: string[];
    filmingLocations?: string[];
    budget?: number;
    grossWorldwide?: number;
    genres: string[];
    isAdult: boolean;
    runtimeMinutes: number;
    averageRating: number;
    numVotes: number;
  }