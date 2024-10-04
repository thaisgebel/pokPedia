document.addEventListener("DOMContentLoaded", function () {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=25&offset=0")
    .then((response) => response.json())
    .then((data) => {
      createCardPokemon(data.results);
      getInformationPokemon(
        "https://pokeapi.co/api/v2/pokemon?limit=10277&offset=0"
      ).then((infoGlobal) => {
        informationGlobal = infoGlobal;
      });
    });
});

let informationGlobal = [];

const containerCardsPokemons = document.getElementById(
  "container-cards-pokemons"
);

function getInformationPokemon(url) {
  return fetch(url).then((response) => response.json());
}

//

const searchBarByName = document.getElementById("search-bar-by-name");
const buttonBarByName = document.getElementById("button-bar-by-name");

buttonBarByName.addEventListener("click", function () {
  let pokemonsFilter = filterBarByName(
    informationGlobal,
    searchBarByName.value
  );
  createCardPokemon(pokemonsFilter);
});

function filterBarByName(information, filter) {
  let namesfiltered = information.results.filter(function (value) {
    return value.name.includes(filter);
  });
  return namesfiltered;
}

//
//

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

//

function createCardPokemon(information) {
  containerCardsPokemons.innerHTML = "";
  for (let index = 0; index < information.length; index++) {
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

    getInformationPokemon(information[index].url).then((individualPokemon) => {
      namePokemon.textContent = individualPokemon.name;
      idPokemon.textContent = `ID: ${individualPokemon.id}`;
      createTypes(individualPokemon, cardPokemon);
      imagePokemon.src =
        individualPokemon.sprites.other["official-artwork"].front_default;
    });
  }
}
