import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://imdb236.p.rapidapi.com/imdb/',
headers: {
  Accept: 'application/json',
  'x-rapidapi-key': '74d40b3adfmsh70f53d2afa0e34fp1cff44jsnb80c07e824d8',
}
});

