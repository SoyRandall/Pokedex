let ini = 10033;
let fin = 10090;

// async function buscarInfo(id) {
//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
//     const info = await res.json();

//     return info;
// }

// async function buscarDatos(id) {
//     const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
//     const info = await res.json();
//     var entradaPokedex = [];

//     const filtrarEsp = info.flavor_text_entries.filter(
//         (element) => element.language.name === "es"
//     );

//     if (filtrarEsp.length === 0) {
//         const filtrarEng = info.flavor_text_entries.filter(
//             (element) => element.language.name === "en"
//         );
//         entradaPokedex = filtrarEng[Math.floor(Math.random() * filtrarEng.length)];
//     }
//     else {
//         entradaPokedex = filtrarEsp[Math.floor(Math.random() * filtrarEsp.length)];
//     }

//     return entradaPokedex;
// }

async function buscarPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const data = await res.json();

    return data;
}

async function llamar(ini, fin) {
    const listaPokemon = [];

    for (let i = ini; i <= fin; i++) {
        var pokemon = await buscarPokemon(i);
        // var datos = await buscarDatos(i);
        // var info = await buscarInfo(i);

        listaPokemon.push(pokemon);
        // listaDatos.push(datos);
        // listaInfo.push(info);

        console.log(pokemon);
        // console.log(info);
    }
}

llamar(ini, fin);