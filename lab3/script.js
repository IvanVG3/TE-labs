const Cargar = document.getElementById('cargar');
const galeria = document.getElementById('galeria');

function generarIdsAleatorios(cantidad, max) {
    const ids = [];
    while (ids.length < cantidad) {
        const idRamdom = Math.floor(Math.random() * max) + 1;
        if (!(ids.includes(idRamdom))) { //evita repeticiones en el equipo
            ids.push(idRamdom);
        }
    }
    return ids;
}

Cargar.addEventListener('click', () => {

    const ids = generarIdsAleatorios(6, 155);

    // Mapeamos cada ID directamente a su URL individual
    const peticiones = ids.map(id =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json())
    );

    galeria.innerHTML = '';

    Promise.all(peticiones)
        .then(pokemones => {
            pokemones.forEach(pokemon => {
                const nombre = pokemon.name;
                // Se agrega un fallback por si la imagen de alta resolución no está disponible
                const imagen = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
                const tipos = pokemon.types.map(t => t.type.name).join(', ');
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('card');
                tarjeta.innerHTML = `
          <img src="${imagen}" alt="${nombre}">
          <h3>${nombre}</h3>
          <p><strong>Tipo:</strong> ${tipos}</p>
        `;

                galeria.appendChild(tarjeta);
            });
        })
        .catch(error => console.error('Error al obtener los Pokémon:', error));
});