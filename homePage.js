document.addEventListener("DOMContentLoaded", function () {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=25&offset=0")
    .then((response) => response.json())
    .then((data) => {
      createCardPokemon(data);
    });
});

function informationIndividualPokemon(url) {
  return fetch(url).then((response) => response.json());
}

const containerCardsPokemons = document.getElementById(
  "container-cards-pokemons"
);

function createCardPokemon(information) {
  for (let index = 0; index < information.results.length; index++) {
    let cardPokemon = document.createElement("div");
    let namePokemon = document.createElement("p");
    let idPokemon = document.createElement("span");

    containerCardsPokemons.append(cardPokemon);
    cardPokemon.append(namePokemon);
    cardPokemon.append(idPokemon);

    informationIndividualPokemon(information.results[index].url).then(
      (individualPokemon) => {
        namePokemon.textContent = individualPokemon.name;
        idPokemon.textContent = individualPokemon.id;
        createTypes(individualPokemon, cardPokemon);
      }
    );
  }
}

function getTypes(data) {
  let arrayTypes = data.types.map(function (value) {
    return value.type.name;
  });
  return arrayTypes;
}

function createTypes(individualPokemon, cardPokemon) {
  let arrayTypes = getTypes(individualPokemon);

  for (let index = 0; index < arrayTypes.length; index++) {
    let typePokemon = document.createElement("p");
    typePokemon.textContent = arrayTypes[index];
    cardPokemon.append(typePokemon);
  }
}
