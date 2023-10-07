//#region Declaracion de Variables

const pokemonContainer = document.querySelector(".pokemon-container");
const buscar = document.getElementById("buscar");
const dato = document.getElementById("txtDato");
const mybutton = document.getElementById("topButton");
const progressContainer = document.querySelector(".progress-container");
const waitContainer = document.querySelector(".wait-container");
const anterior = document.getElementById("btnAnterior");
const siguiente = document.getElementById("btnSiguiente");

let habitat = "";

//#region Eventos

buscar.addEventListener("click", () => {

    if (dato.value === "") {
        progressContainer.textContent = "Por favor ingresa un id o nombre de Pokémon.";
        waitContainer.style.display = `grid`;
    }
    else {
        eliminarCartas(pokemonContainer);
        waitContainer.style.display = `grid`;
        buscarPokemones(dato.value);
    }
});

anterior.addEventListener("click", () => {

    if (idActual === 10001) {
        idActual = 1011;
    }

    idActual--;
    eliminarCartas(pokemonContainer);
    waitContainer.style.display = `grid`;
    buscarPokemones(idActual);

    dato.value = idActual;
});

siguiente.addEventListener("click", () => {

    if (idActual === 1010) {
        idActual = 10000;
    }

    idActual++;
    eliminarCartas(pokemonContainer);
    waitContainer.style.display = `grid`;
    buscarPokemones(idActual);

    dato.value = idActual;
});

window.onscroll = function () { scrollFunction() };

//#endregion

//#region Funciones de apoyo

//#region Funciones buscar API

async function buscarInfo(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const info = await res.json();

    return info;
}

async function buscarPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();

    return data;
}

async function buscarPokemones(dato) {

    try {
        var pokemon = await buscarPokemon(dato);
        var info = await buscarInfo(pokemon.species.name);
    
        progressContainer.textContent = "Buscando Pokémon por favor espera";
        
        waitContainer.style.display = `none`;
        idActual = pokemon.id;

        validarMinimo();
        crearPokemon(pokemon, info);
    }
    catch {
        progressContainer.textContent = "No existe ese Pokémon :(";
    }
}

//#endregion

function validarMinimo() {

    anterior.disabled = false;
    siguiente.disabled = false;

    if (idActual === 1) {
        anterior.disabled = true;
    }
    else {
        anterior.disabled = false;
    }

    if (idActual === 10252) {
        siguiente.disabled = true;
    }
    else {
        siguiente.disabled = false;
    }
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function desPokedex(info) {
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

function agregarTipos(pokemon) {
    const typeContainer = document.createElement("div");

    if (pokemon.types.length > 1) {
        typeContainer.classList.add("types-container2");
    }
    else {
        typeContainer.classList.add("types-container1");
    }

    pokemon.types.forEach(function (tipo) {
        const type = document.createElement("label");

        switch (tipo.type.name) {
            case "steel":
                type.classList.add("types", "typesSteel");
                type.textContent = "Acero";
                break;
            case "water":
                type.classList.add("types", "typesWater");
                type.textContent = "Agua";
                break;
            case "bug":
                type.classList.add("types", "typesBug");
                type.textContent = "Bicho";
                break;
            case "dragon":
                type.classList.add("types", "typesDragon");
                type.textContent = "Dragón";
                break;
            case "electric":
                type.classList.add("types", "typesElectric");
                type.textContent = "Eléctrico";
                break;
            case "ghost":
                type.classList.add("types", "typesGhost");
                type.textContent = "Fantasma";
                break;
            case "fire":
                type.classList.add("types", "typesFire");
                type.textContent = "Fuego";
                break;
            case "fairy":
                type.classList.add("types", "typesFairy");
                type.textContent = "Hada";
                break;
            case "ice":
                type.classList.add("types", "typesIce");
                type.textContent = "Hielo";
                break;
            case "fighting":
                type.classList.add("types", "typesFighting");
                type.textContent = "Lucha";
                break;
            case "normal":
                type.classList.add("types", "typesNormal");
                type.textContent = "Normal";
                break;
            case "grass":
                type.classList.add("types", "typesGrass");
                type.textContent = "Planta";
                break;
            case "psychic":
                type.classList.add("types", "typesPsychic");
                type.textContent = "Psíquico";
                break;
            case "rock":
                type.classList.add("types", "typesRock");
                type.textContent = "Roca";
                break;
            case "dark":
                type.classList.add("types", "typesDark");
                type.textContent = "Siniestro";
                break;
            case "ground":
                type.classList.add("types", "typesGround");
                type.textContent = "Tierra";
                break;
            case "poison":
                type.classList.add("types", "typesPoison");
                type.textContent = "Veneno";
                break;
            case "flying":
                type.classList.add("types", "typesFlying");
                type.textContent = "Volador";
                break;
        }

        typeContainer.appendChild(type);
    });

    return typeContainer;
}

function agregarHabitat(info) {
    switch (info.habitat.name) {
        case "grassland":
            habitat = "Pradera";
            break;
        case "forest":
            habitat = "Bosque";
            break;
        case "waters-edge":
            habitat = "Borde del agua";
            break;
        case "sea":
            habitat = "Mar";
            break;
        case "cave":
            habitat = "Cueva";
            break;
        case "mountain":
            habitat = "Montaña";
            break;
        case "rough-terrain":
            habitat = "Terreno difícil";
            break;
        case "urban":
            habitat = "Urbano";
            break;
        case "Rare":
            habitat = "Raro";
            break;
    }

    return habitat;
}

function agregarVarieties(info) {
    try {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel-pokemon");
        
        info.varieties.forEach(async function (vari) {
            const pixelImg = document.createElement("img");
            pixelImg.classList.add("pixel-img");

            var dato = await buscarPokemon(vari.pokemon.name);
            pixelImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dato.id}.png`;
            pixel.appendChild(pixelImg);
        });

        return pixel;
    }
    catch (error) {
        console.error('Se ha producido un error:', error.message);
    }
}

function crearCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.classList.add("img-pokemon");
    // sprite.src = pokemon.sprites.other.official-artwork.front_default;
    sprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    // sprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

    spriteContainer.appendChild(sprite);

    const number = document.createElement("p");
    number.classList.add("number");
    number.textContent = `#${pokemon.id.toString().padStart(4, 0)}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(agregarTipos(pokemon));

    return card;
}

function crearCardBack(pokemon, info) {
    const cardBack = document.createElement("div");
    cardBack.classList.add("pokemon-block-back");

    const cbTitle = document.createElement("p");
    cbTitle.classList.add("cbTitle");
    cbTitle.textContent = "Información de " + info.names[8].name;

    const pokedexEntry = document.createElement("p");
    pokedexEntry.classList.add("pokedex-entry");

    try {
        pokedexEntry.textContent = desPokedex(info).flavor_text;
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

    const habitad = document.createElement("p");
    habitad.classList.add("datos");

    try {
        habitad.textContent = "📌 Hábitat: " + agregarHabitat(info);
    }
    catch {
        habitad.textContent = "📌 Hábitat: Sin registro...";
    }

    const varieties = document.createElement("p");
    varieties.classList.add("varieties");
    varieties.textContent = "Variantes";

    cardBack.appendChild(cbTitle);
    cardBack.appendChild(pokedexEntry);
    cardBack.appendChild(altura);
    cardBack.appendChild(peso);
    cardBack.appendChild(especie);
    cardBack.appendChild(habitad);
    cardBack.appendChild(varieties);
    cardBack.appendChild(agregarVarieties(info));

    return cardBack;
}

function crearPokemon(pokemon, info) {

    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");

    cardContainer.appendChild(crearCard(pokemon));
    cardContainer.appendChild(crearCardBack(pokemon, info));

    flipCard.appendChild(cardContainer);

    pokemonContainer.appendChild(flipCard);
}

function eliminarCartas(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//#endregion
