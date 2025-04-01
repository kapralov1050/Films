import axios from 'axios';

export const searchMovies = async (genre: string = 'Drama') => {
    const options = {
        method: 'GET',
        url: 'https://imdb236.p.rapidapi.com/imdb/search',
        params: {
          type: 'movie',
          genre: genre,
          rows: '25',
          sortOrder: 'ASC',
          sortField: 'id'
        },
        headers: {
          'x-rapidapi-key': 'd9b40c4f18msh3a5772053cf6973p175cf0jsnbf7c99f820fa',
          'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        return response.data;
      } catch (error) {
        console.log('Ошибка запроса:', error)
      }
}