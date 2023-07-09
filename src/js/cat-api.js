import { loaderEl } from '../index';
export { CatApiService, BreedApiService };

const API_KEY =
  'live_k7FRqOIR1HmsAosTrf291Jo6eJSQrXVGjReRBj6muk49klCQRWDCAnXNdxwojspx';

class CatApiService {
  constructor() {}

  fetchBreeds() {
    return fetch(`https://api.thecatapi.com/v1/breeds?&api_key=${API_KEY}`)
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

class BreedApiService {
  constructor() {}

  fetchCatByBreed(breedId) {
    return fetch(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`
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
