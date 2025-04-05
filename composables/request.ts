import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie/',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDVjODliYzBhMTU2Zjc5YmI5ZTU2YWU3NzVjNmRiYSIsIm5iZiI6MTc0Mzc5MzkwMC42MjYsInN1YiI6IjY3ZjAyZWVjOGIxZjMyZWI3OWQ5MzRmMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.syMpcUf-4jaRyHOhGUXRKwdYxbJ4Hg98fyVaEL8r07c'
    }
});

