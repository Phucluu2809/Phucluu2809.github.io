<template>
  <div class="container">
    <header>
      <h1>Pokémon API</h1>
    </header>

    <input 
      type="text" 
      placeholder="Search some Pokémon" 
      class="poke-search" 
      v-model="valueSearch" 
      @input="handleSearch" 
    />

    <router-view />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import PokemonDetails from './PokemonDetails.vue';
import HomeView from './HomeView.vue';
import { fetchPromise } from './fetchData';
import { getIDPokemon } from './getID';

const routes = [
  { path: '/', component: HomeView },
  { path: '/:name', component: PokemonDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default {
  setup() {
    const valueSearch = ref('');
    const pokemons = ref([]);
    const filteredPokemons = ref([]);
    const isLoadingPokemon = ref(false);
    const offset = ref(0);
    const limit = 36;

    onMounted(async () => {
      let cachedPokemons = sessionStorage.getItem('pokemonsData');
      if (cachedPokemons) {
        pokemons.value = JSON.parse(cachedPokemons);
        filteredPokemons.value = pokemons.value;
      } else {
        const { results } = await fetchPromise('https://pokeapi.co/api/v2/pokemon/?limit=898');
        const pokemonData = await Promise.all(results.map(async (pokemon) => {
          const data = await fetchPromise(pokemon.url);
          return {
            id: data.id,
            name: data.name,
            types: data.types.map(t => t.type.name),
            height: data.height,
            weight: data.weight,
            abilities: data.abilities,
            stats: data.stats,
          };
        }));
        pokemons.value = pokemonData;
        filteredPokemons.value = pokemons.value;
        sessionStorage.setItem('pokemonsData', JSON.stringify(pokemons.value));
      }
      isLoadingPokemon.value = true;
    });

    const renderPokemon = computed(() => {
      return filteredPokemons.value.slice(offset.value, offset.value + limit);
    });

    function handleSearch() {
      const query = valueSearch.value.toLowerCase();
      filteredPokemons.value = pokemons.value.filter(pokemon => 
        pokemon.name.toLowerCase().includes(query)
      );
      offset.value = 0;
    }

    function handleLoadMore() {
      offset.value += limit;
    }

    return { 
      valueSearch, 
      renderPokemon, 
      handleSearch, 
      handleLoadMore, 
      isLoadingPokemon 
    };
  },
  router,
};
</script>

<style>
.container {
  max-width: 1200px;
  margin-inline: auto;
  text-align: center;
}

.poke-search {
  max-width: 500px;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 30px;
  font-size: 16px;
  padding: 20px;
  border: none;
  outline: 1px solid #00000036;
  box-shadow: #0000001a 0 4px 12px;
}

.poke-search:focus {
  outline: 1px solid #000000;
}
</style>
