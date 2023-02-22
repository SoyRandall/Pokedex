const pokemonContainer = document.querySelector(".pokemon-container");
const buscar = document.getElementById("buscar");
const limpiar = document.getElementById("limpiar");
const spinner = document.getElementById("spinner");

buscar.addEventListener("click", () => {
    var inicio = document.getElementById("desde").value;
    var final = document.getElementById("hasta").value;

    spinner.style.display = "block";

    removeChildNodes(pokemonContainer);
    buscarPokemones(inicio, final);

    spinner.style.display = "none";
});

limpiar.addEventListener("click", () => {
    document.getElementById("desde").value = 1;
    document.getElementById("hasta").value = 1;
    removeChildNodes(pokemonContainer);
});

async function buscarInfo(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const info = await res.json();

    return info;
}

async function buscarDatos(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const info = await res.json();

    const filtrarEsp = info.flavor_text_entries.filter(
        (element) => element.language.name === "es"
    );

    const entradaPokedex = filtrarEsp[Math.floor(Math.random() * filtrarEsp.length)];

    return entradaPokedex;
}

async function buscarPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();

    return data;
}

async function buscarPokemones(inicio, final) {
    const listaPokemon = [];
    const listaDatos = [];
    const listaInfo = [];
    let contadorImagen = inicio;

    for (let i = inicio; i <= final; i++) {
        var pokemon = await buscarPokemon(i);
        var datos = await buscarDatos(i);
        var info = await buscarInfo(i);

        listaPokemon.push(pokemon);
        listaDatos.push(datos);
        listaInfo.push(info);

    }

    for (let i = 0; i <= listaPokemon.length - 1; i++) {
        crearPokemon(listaPokemon[i], listaDatos[i], contadorImagen, listaInfo[i]);
        contadorImagen++;
    }
}

function crearPokemon(pokemon, entradaPokedex, id, info) {

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
    sprite.classList.add("img-pokemon");
    // sprite.src = pokemon.sprites.other.official_artwork.front_default;
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
    pokedexEntry.textContent = entradaPokedex.flavor_text;

    const altura = document.createElement("p");
    altura.classList.add("datos");
    altura.textContent = "📌 Altura: " + pokemon.height / 10 + " metros";

    const peso = document.createElement("p");
    peso.classList.add("datos");
    peso.textContent = "📌 Peso: " + pokemon.weight / 10 + " kilos";

    const especie = document.createElement("p");
    especie.classList.add("datos");
    especie.textContent = "📌 Especie: " + info.genera[5].genus;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    cardBack.appendChild(cbTitle);
    cardBack.appendChild(pokedexEntry);
    cardBack.appendChild(altura);
    cardBack.appendChild(peso);
    cardBack.appendChild(especie);

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}