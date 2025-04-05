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
          'x-rapidapi-key': '11557a4255mshf6794685dbb97c8p13fbbdjsn877a5d68d3f6',
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