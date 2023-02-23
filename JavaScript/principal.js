const pokemonContainer = document.querySelector(".pokemon-container");
const buscar = document.getElementById("buscar");
const limpiar = document.getElementById("limpiar");
const bucarPor = document.getElementById("buscarPor");
let inicio = 0;
let final = 0;

buscarPor.addEventListener("change", () => {
    var opcion = document.getElementById("buscarPor").value;

    switch (opcion) {
        case "1":
            inicio= 1;
            final = 1008;
            break;
        case "2":
            inicio= 1;
            final = 151;
            break;
        case "3":
            inicio= 152;
            final = 251;
            break;
        case "4":
            inicio= 252;
            final = 386;
            break;
        case "5":
            inicio= 387;
            final = 494;
            break;
        case "6":
            inicio= 495;
            final = 649;
            break;
        case "7":
            inicio= 650;
            final = 721;
            break;
        case "8":
            inicio= 722;
            final = 809;
            break;
        case "9":
            inicio= 810;
            final = 905;
            break;
        case "10":
            inicio= 906;
            final = 1008;
            break;
    }
});

buscar.addEventListener("click", () => {
    removeChildNodes(pokemonContainer);
    buscarPokemones(inicio, final);
});

limpiar.addEventListener("click", () => {
    document.getElementById("buscarPor").value = "0";
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
    var entradaPokedex = [];

    const filtrarEsp = info.flavor_text_entries.filter(
        (element) => element.language.name === "es"
    );

    if (filtrarEsp.length === 0) {
        const filtrarEng = info.flavor_text_entries.filter(
            (element) => element.language.name === "en"
        );
        entradaPokedex = filtrarEng[Math.floor(Math.random() * filtrarEng.length)];
    }
    else {
        entradaPokedex = filtrarEsp[Math.floor(Math.random() * filtrarEsp.length)];
    }

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

        console.log(pokemon);
        console.log(datos);
        console.log(info);

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

    const typeContainer = document.createElement("div");
    typeContainer.classList.add("types-container");

    const type = document.createElement("label");
    type.classList.add("types");
    pokemon.types.forEach(function(tipo) {
        type.textContent = tipo.type.name;
        typeContainer.appendChild(type);
    });

    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");

    const cbTitle = document.createElement("h5");
    cbTitle.classList.add("cbTitle");
    cbTitle.textContent = "Información del Pokémon";

    const pokedexEntry = document.createElement("p");
    pokedexEntry.classList.add("pokedex-entry");

    try {
        pokedexEntry.textContent = entradaPokedex.flavor_text;
    }
    catch {
        pokedexEntry.textContent = "Sin registro...";
    }

    const altura = document.createElement("p");
    altura.classList.add("datos");
    altura.textContent = "📌 Altura: " + pokemon.height / 10 + " metros";

    const peso = document.createElement("p");
    peso.classList.add("datos");
    peso.textContent = "📌 Peso: " + pokemon.weight / 10 + " kilos";

    const especie = document.createElement("p");
    especie.classList.add("datos");

    try {
        especie.textContent = "📌 Especie: " + info.genera[5].genus;
    }
    catch {
        especie.textContent = "📌 Especie: Sin registro...";
    }

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(typeContainer);

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