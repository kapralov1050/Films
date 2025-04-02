import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://imdb236.p.rapidapi.com/imdb/',
    headers: {
      'x-rapidapi-key': '5d392d6cd6msh7db53af129ffc04p1eaa17jsne207d2630e3e',
      'x-rapidapi-host': 'imdb236.p.rapidapi.com'
    }
});

