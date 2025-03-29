import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://imdb236.p.rapidapi.com/imdb/',
    headers: {
      'x-rapidapi-key': 'd9b40c4f18msh3a5772053cf6973p175cf0jsnbf7c99f820fa',
      'x-rapidapi-host': 'imdb236.p.rapidapi.com'
    }
});

