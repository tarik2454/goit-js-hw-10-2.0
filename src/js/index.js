import { CatApiService } from './cat-api';
import { renderBreed, renderCat } from './tamplate-cats';
import SlimSelect from 'slim-select';

const containerList = document.querySelector('div.cat-info');
const breedSelect = document.querySelector('select.breed-select');
const errorEl = document.querySelector('p.error');
export const loaderEl = document.querySelector('p.loader');

const catApiService = new CatApiService();

const slimSelect = () =>
  new SlimSelect({
    select: '#single',
    settings: {
      placeholderText: 'Choose a cat breed...',
    },
  });

const loadedBreedInSelect = function () {
  catApiService
    .fetchCats('breeds')
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

  catApiService
    .fetchCats('images/search', { breed_ids: breedId })
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
