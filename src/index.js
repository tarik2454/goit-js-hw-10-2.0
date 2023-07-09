import { CatApiService, BreedApiService } from './js/cat-api';
import { renderBreed, renderCat } from './js/tamplate-cats';
import SlimSelect from 'slim-select';

const containerList = document.querySelector('div.cat-info');
const breedSelect = document.querySelector('select.breed-select');
const errorEl = document.querySelector('p.error');
export const loaderEl = document.querySelector('p.loader');

const catApiService = new CatApiService();
const breedApiService = new BreedApiService();

const slimSelect = () =>
  new SlimSelect({
    select: '#single',
    settings: {
      placeholderText: 'Choose a cat breed...',
    },
  });

const loadedBreedInSelect = function () {
  catApiService
    .fetchBreeds()
    .then(data => {
      const breedMarkup = renderBreed(data);
      breedSelect.innerHTML = breedMarkup;
      slimSelect();
    })
    .catch(error => {
      errorEl.classList.toggle('show');
      console.warn(error);
    });
};

loadedBreedInSelect();

const onBreedClick = function (event) {
  const breedId = event.target.value;

  breedApiService
    .fetchCatByBreed(breedId)
    .then(cat => {
      const catMarkup = renderCat(cat);
      containerList.innerHTML = catMarkup;
    })
    .catch(error => {
      errorEl.classList.toggle('show');
      console.warn(error);
    });
};

breedSelect.addEventListener('change', onBreedClick);
