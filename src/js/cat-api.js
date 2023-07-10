import { loaderEl } from './index';
export { CatApiService, BreedApiService };

const API_KEY =
  'live_k7FRqOIR1HmsAosTrf291Jo6eJSQrXVGjReRBj6muk49klCQRWDCAnXNdxwojspx';
const BASE_URL = 'https://api.thecatapi.com/v1';

class CatApiService {
  constructor() {}

  fetchCats(endPoint, params = {}) {
    return fetch(
      `${BASE_URL}/${endPoint}?api_key=${API_KEY}&${new URLSearchParams(
        params
      )}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        loaderEl.classList.add('show');
        return response.json();
      })
      .then(data => {
        loaderEl.classList.remove('show');
        return data;
      });
  }
}
