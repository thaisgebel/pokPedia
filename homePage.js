document.addEventListener("DOMContentLoaded", function () {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=10277&offset=0")
    .then((response) => response.json())
    .then((data) => {
      informationGlobal = data;
      filterBarByName(data, "");
      createCardPokemon(pokemonsFiltradospaginacion);
    });
});

let informationGlobal = [];
const containerCardsPokemons = document.getElementById(
  "container-cards-pokemons"
);
function getInformationPokemon(url) {
  return fetch(url).then((response) => response.json());
}

const searchBarByName = document.getElementById("search-bar-by-name");
const buttonBarByName = document.getElementById("button-bar-by-name");

buttonBarByName.addEventListener("click", function () {
  let pokemonsFilterByName = filterBarByName(
    informationGlobal,
    searchBarByName.value
  );
  createCardPokemon(pokemonsFilterByName);
});

let pokemonsFiltradospaginacion = [];

function filterBarByName(information, filter) {
  currentPagination = 0;
  pokemonsFiltradospaginacion = [];
  let namesfiltered = information.results.filter(function (value) {
    return value.name.includes(filter);
  });

  let numPage = Math.ceil(namesfiltered.length / 25);

  for (let index = 0; index < numPage; index++) {
    pokemonsFiltradospaginacion.push([]);
    for (let p = 25 * index; p < 25 * index + 25; p++) {
      pokemonsFiltradospaginacion[index].push(namesfiltered[p]);
    }
  }
  return pokemonsFiltradospaginacion;
}

function getTypes(data) {
  let arrayTypes = data.types.map(function (value) {
    return value.type.name;
  });
  return arrayTypes;
}

function createTypes(individualPokemon, cardPokemon) {
  let arrayTypes = getTypes(individualPokemon);
  let containerTypes = document.createElement("div");
  cardPokemon.append(containerTypes);
  for (let index = 0; index < arrayTypes.length; index++) {
    let typePokemon = document.createElement("p");
    typePokemon.classList.add(arrayTypes[index]);
    typePokemon.classList.add("container-types");
    typePokemon.textContent = arrayTypes[index];
    containerTypes.append(typePokemon);
  }
}

let currentPagination = 0;

function createCardPokemon(information) {
  containerCardsPokemons.innerHTML = "";
  for (let index = 0; index < 25; index++) {
    if (information[currentPagination][index] === undefined) {
      break;
    }
    let cardPokemon = document.createElement("div");
    cardPokemon.classList.add("card-pokemon");
    let containerNamesAndIds = document.createElement("div");
    let namePokemon = document.createElement("p");
    let idPokemon = document.createElement("span");
    let imagePokemon = document.createElement("img");
    containerCardsPokemons.append(cardPokemon);
    cardPokemon.append(containerNamesAndIds);
    containerNamesAndIds.append(namePokemon);
    containerNamesAndIds.append(idPokemon);
    cardPokemon.append(imagePokemon);
    getInformationPokemon(information[currentPagination][index].url).then(
      (individualPokemon) => {
        namePokemon.textContent = individualPokemon.name;
        idPokemon.textContent = `ID: ${individualPokemon.id}`;
        createTypes(individualPokemon, cardPokemon);
        imagePokemon.src =
          individualPokemon.sprites.other["official-artwork"].front_default;
      }
    );
  }
}

const buttonPreviousPage = document.getElementById("button-previous-page");
const buttonNextPage = document.getElementById("button-next-page");

buttonPreviousPage.classList.add("hidden");

buttonPreviousPage.addEventListener("click", function () {
  prevAnswer();
  createCardPokemon(pokemonsFiltradospaginacion);
});

buttonNextPage.addEventListener("click", function () {
  nextAnswer();
  createCardPokemon(pokemonsFiltradospaginacion);
});

buttonPreviousPage.classList.add("hidden");

function prevAnswer() {
  if (currentPagination > 0) {
    currentPagination -= 1;
    buttonNextPage.classList.remove("hidden");
  }
  if (currentPagination === 0) {
    buttonPreviousPage.classList.add("hidden");
  }
}

function nextAnswer() {
  if (currentPagination < pokemonsFiltradospaginacion.length - 1) {
    currentPagination += 1;
    buttonPreviousPage.classList.remove("hidden");
  }
  if (currentPagination === pokemonsFiltradospaginacion.length - 1) {
    buttonNextPage.classList.add("hidden");
  }
}
