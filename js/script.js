const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form_search');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1; // Variable to keep track of the current Pokémon number

const fetchPokemon = async (pokemon) =>{
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

    
}

const rederPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonImage.alt = data.name;
        searchPokemon = data.id; // Update the current Pokémon number
    }   else {
        pokemonName.innerHTML = 'Not found :(';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = '';
        pokemonImage.alt = '';
    }
    input.value = '';

}

form.addEventListener('submit', (event) => {
    event.preventDefault();   
    rederPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', (event) => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        rederPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', (event) => {
    searchPokemon += 1;
    rederPokemon(searchPokemon);
});



rederPokemon(searchPokemon); // Load the first Pokémon by default