import type { Film } from "~/types/common";

export function averageRating(ratings: Film[]) {
    return (ratings.reduce((sum, current) => sum + current.vote_average, 0) / ratings.length).toFixed(1)
}