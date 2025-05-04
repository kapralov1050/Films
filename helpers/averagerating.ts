import type { Movie } from "~/types/common";

export function averageRating(ratings: Movie[]) {
    return (ratings.reduce((sum, current) => sum + current.vote_average, 0) / ratings.length).toFixed(1)
}