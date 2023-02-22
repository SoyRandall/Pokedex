const pokemonContainer = document.querySelector(".pokemon-container");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let id = 1;

previous.addEventListener('click', () => {
    if (id != 1) {
        id = id - 1;
        removeChildNodes(pokemonContainer);
        buscarPokemon(id);
    }
});

next.addEventListener('click', () => {
    id = id + 1;
    removeChildNodes(pokemonContainer);
    buscarPokemon(id);
});

async function buscarPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();

    const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const info = await res2.json();

    const filtrarEsp = info.flavor_text_entries.filter(
        (element) => element.language.name === "es"
    );

    const entradaPokedex = filtrarEsp[Math.floor(Math.random() * filtrarEsp.length)];

    console.log(data);
    console.log(entradaPokedex);

    crearPokemon(data, entradaPokedex);
}

function crearPokemon(pokemon, info) {

    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);

    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.classList.add("number");
    number.textContent = `#${pokemon.id.toString().padStart(4, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");

    const cbTitle = document.createElement("h5");
    cbTitle.classList.add("cbTitle");
    cbTitle.textContent = "Información del Pokémon";

    const pokedexEntry = document.createElement("p");
    pokedexEntry.classList.add("pokedex-entry");
    pokedexEntry.textContent = info.flavor_text;

    const separador = document.createElement("hr");

    const cbTitle2 = document.createElement("h5");
    cbTitle2.classList.add("cbTitle");
    cbTitle2.textContent = "Atributos de Combate";

    const altura = document.createElement("p");
    altura.classList.add("datos");
    altura.textContent = "📌 Altura: " + pokemon.height / 10 + " metros";

    const peso = document.createElement("p");
    peso.classList.add("datos");
    peso.textContent = "📌 Peso: " + pokemon.weight / 10 + " kilos";

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    cardBack.appendChild(cbTitle);
    cardBack.appendChild(pokedexEntry);
    cardBack.appendChild(altura);
    cardBack.appendChild(peso);
    cardBack.appendChild(separador);
    cardBack.appendChild(cbTitle2);
    cardBack.appendChild(progressBars(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");
  
    for (let i = 0; i < 3; i++) {
      const stat = stats[i];
  
      const statPercent = stat.base_stat / 2 + "%";
      const statContainer = document.createElement("stat-container");
      statContainer.classList.add("stat-container");
  
      const statName = document.createElement("p");
      statName.textContent = stat.stat.name;
  
      const progress = document.createElement("div");
      progress.classList.add("progress");
  
      const progressBar = document.createElement("div");
      progressBar.classList.add("progress-bar");
      progressBar.setAttribute("aria-valuenow", stat.base_stat);
      progressBar.setAttribute("aria-valuemin", 0);
      progressBar.setAttribute("aria-valuemax", 200);
      progressBar.style.width = statPercent;
  
      progressBar.textContent = stat.base_stat;
  
      progress.appendChild(progressBar);
      statContainer.appendChild(statName);
      statContainer.appendChild(progress);
  
      statsContainer.appendChild(statContainer);
    }
  
    return statsContainer;
  }

buscarPokemon(id);