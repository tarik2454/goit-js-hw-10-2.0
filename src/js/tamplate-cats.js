export { renderBreed, renderCat };

function renderBreed(cats) {
  const breedOptions = cats
    .map(
      ({ id, name }) => `
      <option value="${id}">${name}</option>`
    )
    .join('');

  return `<option data-placeholder="true"></option>${breedOptions}`;
}

function renderCat(catInfo) {
  return catInfo
    .map(info => {
      const { name, description, temperament } = info.breeds[0];
      return `
        <div class="cat-info-left">
          <img class="cat-info-img" src="${info.url}" />
        </div>
        <div class="cat-info-rigth">
          <h3 class="cat-info-name">${name}</h3>
          <p class="cat-info-description">${description}</p>
          <p class="cat-info-temperament"><b>Temperament:</b> ${temperament}</p>
        </div>`;
    })
    .join('');
}
