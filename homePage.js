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
    let containerNamesAndIds = document.createElement("div");
    let namePokemon = document.createElement("p");
    let idPokemon = document.createElement("span");
    let imagePokemon = document.createElement("img");

    containerCardsPokemons.append(cardPokemon);
    containerNamesAndIds.append(namePokemon);
    containerNamesAndIds.append(idPokemon);
    cardPokemon.append(containerNamesAndIds);
    cardPokemon.append(imagePokemon);

    informationIndividualPokemon(information.results[index].url).then(
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
