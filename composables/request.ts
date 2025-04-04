import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://imdb236.p.rapidapi.com/imdb/',
    headers: {
      'x-rapidapi-key': '11557a4255mshf6794685dbb97c8p13fbbdjsn877a5d68d3f6',
      'x-rapidapi-host': 'imdb236.p.rapidapi.com'
    }
});

