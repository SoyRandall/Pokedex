//#region Declaracion de Variables

const pokemonContainer = document.querySelector(".pokemon-container");
const buscar = document.getElementById("buscar");
const limpiar = document.getElementById("limpiar");
const bucarPor = document.getElementById("buscarPor");
const bucarPorTipo = document.getElementById("buscarPorTipo");
const mybutton = document.getElementById("topButton");

let progressContainer = document.querySelector(".progress-container");
let waitContainer = document.querySelector(".wait-container");

let inicio = 0;
let final = 0;
let inicioEspecial = 0;
let finalEspecial = 0;
let progressValue = 0;
let progressEndValue = 0;
let tipo = "todos";
let habitat = "";

//#endregion

//#region Eventos

buscarPorTipo.addEventListener("change", () => {
    tipo = document.getElementById("buscarPorTipo").value;
});

buscarPor.addEventListener("change", () => {

    var opcion = document.getElementById("buscarPor").value;
    inicioEspecial = 0;
    finalEspecial = 0;

    switch (opcion) {
        case "0":
            inicio = 1;
            final = 1008;
            inicioEspecial = 10001;
            finalEspecial = 10252;
            break;
        case "1":
            inicio = 1;
            final = 151;
            break;
        case "2":
            inicio = 152;
            final = 251;
            break;
        case "3":
            inicio = 252;
            final = 386;
            inicioEspecial = 10001;
            finalEspecial = 10003;
            break;
        case "4":
            inicio = 387;
            final = 494;
            inicioEspecial = 10004;
            finalEspecial = 10012;
            break;
        case "5":
            inicio = 495;
            final = 649;
            inicioEspecial = 10005;
            finalEspecial = 10024;
            break;
        case "6":
            inicio = 650;
            final = 721;
            inicioEspecial = 10025;
            finalEspecial = 10090;
            break;
        case "7":
            inicio = 722;
            final = 809;
            inicioEspecial = 10091;
            finalEspecial = 10157;
            break;
        case "8":
            inicio = 810;
            final = 905;
            inicioEspecial = 10160;
            finalEspecial = 10249;
            break;
        case "9":
            inicio = 906;
            final = 1008;
            inicioEspecial = 10250;
            finalEspecial = 10252;
            break;
        case "10":
            inicio = 1;
            final = 1;
            inicioEspecial = 10253;
            finalEspecial = 10271;
            break;
    }
});

buscar.addEventListener("click", () => {

    var opcion = document.getElementById("buscarPor").value;

    if (opcion === "-1") {
        progressContainer.textContent = "Por favor selecciona una lista de Pokémon.";
        waitContainer.style.display = `grid`;
    }
    else {
        eliminarCartas(pokemonContainer);
        waitContainer.style.display = `grid`;
        buscarPokemones(inicio, final);
    }
});

limpiar.addEventListener("click", () => {
    waitContainer.style.display = `none`;
    document.getElementById("buscarPor").value = "-1";
    document.getElementById("buscarPorTipo").value = "-1";
    eliminarCartas(pokemonContainer);
    inicio = 0;
    final = 0;
    inicioEspecial = 0;
    finalEspecial = 0;
    progressValue = 0;
    progressEndValue = 0;
    tipo = "todos";
});

window.onscroll = function () { scrollFunction() };

//#endregion

//#region Funciones de apoyo

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

function crearCard(pokemon) {
    const card = document.createElement("div");
    card.classList.add("pokemon-block");

    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");

    const sprite = document.createElement("img");
    sprite.classList.add("img-pokemon");
    // sprite.src = pokemon.sprites.other.official-artwork.front_default;
    sprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

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

    const cbTitle = document.createElement("h5");
    cbTitle.classList.add("cbTitle");
    cbTitle.textContent = "Información del Pokémon";

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

    cardBack.appendChild(cbTitle);
    cardBack.appendChild(pokedexEntry);
    cardBack.appendChild(altura);
    cardBack.appendChild(peso);
    cardBack.appendChild(especie);
    cardBack.appendChild(habitad);

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

async function buscarPokemones(inicio, final) {
    const listaPokemon = [];
    const listaInfo = [];
    progressValue = 0;
    progressEndValue = final - inicio + 1;

    for (let i = inicio; i <= final; i++) {
        var pokemon = await buscarPokemon(i);
        var info = await buscarInfo(pokemon.species.name);

        if (tipo === "todos") {
            listaPokemon.push(pokemon);
            listaInfo.push(info);
        }
        else {
            pokemon.types.forEach(function (type) {
                if (type.type.name === tipo) {
                    listaPokemon.push(pokemon);
                    listaInfo.push(info);
                }
            });
        }

        console.log(pokemon);

        progressValue++;
        progressContainer.textContent = `Pokémon analizados: ${progressValue} de ${progressEndValue}`;
    }

    if (inicioEspecial > 0) {
        progressValue = 0;

        for (let i = inicioEspecial; i <= finalEspecial; i++) {
            var pokemon = await buscarPokemon(i);
            var info = await buscarInfo(pokemon.species.name);

            if (tipo === "todos") {
                listaPokemon.push(pokemon);
                listaInfo.push(info);
            }
            else {
                pokemon.types.forEach(function (type) {
                    if (type.type.name === tipo) {
                        listaPokemon.push(pokemon);
                        listaInfo.push(info);
                    }
                });
            }

            progressValue++;
            progressContainer.textContent = `Pokémon especiales analizados: ${progressValue} de ${progressEndValue}`;
        }
    }

    console.log(listaInfo);

    waitContainer.style.display = `none`;

    for (let i = 0; i <= listaPokemon.length - 1; i++) {
        crearPokemon(listaPokemon[i], listaInfo[i]);
    }
}

//#endregion