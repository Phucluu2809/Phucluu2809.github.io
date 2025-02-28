<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

function getIDPokemon(url) {
  const parts = url.split('/');
  return parseInt(parts[parts.length - 2], 10);
}

async function fetchPromise(URL) {
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
    return null;
  }
}

const valueSearch = ref('');
const filteredPokemons = ref([]);
const click_inf = ref(false);
const selectedPokemon = ref(null);
const pokemonTypes = ref({});
const evolutionChain = ref([]);
const pokemonStats = ref({});
const pokemonAbilities = ref({});
const name_stats = ["HP", "ATK", "DEF", "SPA", "SPD", "SPE"];
const pokemons = ref(JSON.parse(localStorage.getItem("pokemonsData")) || []);
filteredPokemons.value = pokemons.value;
const pokemonFlavorText = ref('');
const offset = ref(0);
const limit = 12;
const renderPokemon = computed(() => {
  return filteredPokemons.value.slice(0, offset.value + limit);
});

async function getPokemon() {
  if (pokemons.value.length === 0) {
    const response = await fetchPromise("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898");
    if (response && response.results) {
      pokemons.value = response.results;
      filteredPokemons.value = pokemons.value;
      localStorage.setItem("pokemonsData", JSON.stringify(pokemons.value));
    }
  }
  const promises = pokemons.value.slice(0, 898).map(async (pokemon) => {
    const id = getIDPokemon(pokemon.url);
    const details = await fetchPromise(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (details) {
      pokemonTypes.value[id] = details.types.map(t => t.type.name);
      pokemonAbilities.value[id] = details.abilities.map(a => a.ability.name);
      pokemonStats.value[id] = {
        height: details.height,
        weight: details.weight,
        stats: details.stats.map((stat, index) => ({
          name: name_stats[index],
          value: stat.base_stat
        }))
      };
    }
  });
  await Promise.all(promises);
}

onMounted(() => {
  getPokemon();
  loadPokemonFromRoute();
});

function loadPokemonFromRoute() {
  if (route.params.name) {
    const pokemon = pokemons.value.find(p => p.name.toLowerCase() === route.params.name.toLowerCase());
    if (pokemon) {
      click_information_pokemon(pokemon);
    }
  }
}

watch(() => route.params.name, loadPokemonFromRoute);

function handleSearch() {
  const query = valueSearch.value.toLowerCase();
  filteredPokemons.value = pokemons.value.filter(pokemon => 
    pokemon.name.toLowerCase().includes(query)
  );
  offset.value = 0;
}

function click_back() {
  selectedPokemon.value = null;
  click_inf.value = false;
  evolutionChain.value = [];
  router.push('/');
}

function handleLoadMore() {
  offset.value += limit;
}

async function click_information_pokemon(pokemon) {
  click_inf.value = true;
  const pokemonID = getIDPokemon(pokemon.url);
  const details = await fetchPromise(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`);
  if (details) {
    selectedPokemon.value = details;
    router.push(`/pokemon/${details.name}`);
    const species = await fetchPromise(details.species.url);
    if (species && species.evolution_chain) {
      const evolutionData = await fetchPromise(species.evolution_chain.url);
      if (evolutionData) {
        extractEvolutionChain(evolutionData.chain);
      }
    }
    if (species) {
      const flavor = species.flavor_text_entries.find(entry => entry.language.name === "en");
      pokemonFlavorText.value = flavor ? flavor.flavor_text.replace(/\n/g, ' ') : "";
    }
  }
}

function extractEvolutionChain(chain) {
  const evolutions = [];
  let current = chain;
  while (current) {
    const pokeName = current.species.name;
    const pokeID = getIDPokemon(current.species.url);
    evolutions.push({
      name: pokeName,
      id: pokeID,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeID}.png`
    });
    current = current.evolves_to.length ? current.evolves_to[0] : null;
  }
  evolutionChain.value = evolutions;
}

</script>


<template>
  <div class="container">
    <div v-if="selectedPokemon">
      <button class="back-button" @click="click_back">← Back</button>
      <img 
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon.id}.png`" 
        class="pokemon-image"
        alt="Pokemon Image"
      />
      <div class="element__pokemon">
        <span 
          v-for="(type, index) in pokemonTypes[selectedPokemon.id] || []" 
          :key="index" 
          :class="type" 
          class="type-item">
          {{ type }}
        </span>
      </div>
      <h2>{{ selectedPokemon.name }}</h2>
      <div class="pokemon-description">
        <p>{{ pokemonFlavorText }}</p>
      </div>
      <div class="pokemon-info">
        <div class="pokemon-info-box">
          <h4>Height</h4>
          <p>{{ pokemonStats[selectedPokemon.id]?.height }}</p>
        </div>
        <div class="pokemon-info-box">
          <h4>Weight</h4>
          <p>{{ pokemonStats[selectedPokemon.id]?.weight }}</p>
        </div>
      </div>

      <div class="pokemon-abilities">
        <h3>Abilities</h3>
        <div class="abilities-list">
          <span 
            v-for="(ability, index) in pokemonAbilities[selectedPokemon.id] || []"
            :key="index"
            class="ability-item">
            {{ ability }}
          </span>
        </div>
      </div>

      <div class="pokemon-stats">
        <h3>Stats</h3>
        <div class="stats-list">
          <div v-for="stat in pokemonStats[selectedPokemon.id]?.stats || []" :key="stat.name" class="stat-item">
            <span class="stat-name">{{ stat.name }}</span>
            <span class="stat-value">{{ stat.value }}</span>
          </div>
        </div>
      </div>


      <div v-if="evolutionChain.length" class="evolution-chain">
        <h3>Evolution</h3>
        <div class="evolution-list">
          <template v-for="(evo, index) in evolutionChain" :key="evo.id">
            <div class="evolution-item">
              <img :src="evo.image" alt="Evolution Image">
              <p>{{ evo.name }}</p>
            </div>
            <span v-if="index < evolutionChain.length - 1" class="evolution-arrow"> > </span>
          </template>
        </div>
      </div>
    </div>


    <div v-else>
      <div class="header">
        <h2>Pokemon API</h2>
      </div>
      
      <input 
        type="text" 
        placeholder="Search some Pokemon" 
        class="poke-search" 
        v-model="valueSearch" 
        @input="handleSearch" 
      />
  
      <div class="pokemon-list">
        <div 
          v-for="pokemon in renderPokemon" 
          :key="pokemon.name" 
          class="pokemon-item" 
          @click="click_information_pokemon(pokemon)"> 
          <div class="pokemon-id">#{{ getIDPokemon(pokemon.url) }}</div>
          <img 
            :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(pokemon.url)}.png`" 
            alt="Pokemon Image"
          />
          <p>{{ pokemon.name }}</p>
          <div class="element__pokemon">
            <span 
              v-for="(type, index) in pokemonTypes[getIDPokemon(pokemon.url)] || []" 
              :key="index" 
              :class="type">{{ type }}</span>
          </div>
        </div>
      </div>
  
      <button 
        v-show="filteredPokemons.length > limit"
        class="load-page-btn" 
        @click="handleLoadMore">Load More</button>
    </div>
  </div>
</template>






<style>
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  border: 2px solid #ddd;
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.header {
  font-size: 25px;
}
.pokemon-image {
  width: 200px;
  height: 200px;
  margin-top: 2px;
}

.container {
  overflow-y: auto;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.header h2 {
  font-weight: 400;
}
.container {
  max-width: 1200px;
  margin-inline: auto;
  text-align: center;
}
.pokemon-list {
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
  gap: 20px;
  margin-top: 50px;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
}
.poke-search {
  max-width: 500px;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 30px;
  font-size: 16px;
  padding: 15px;
  border: none;
  outline: 1px solid #00000036;
}
.poke-search:focus {
  outline: 1px solid #000000;
}
.load-page-btn {
  border-radius: 10px;
  padding: 20px 25px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  background-color: #ff4d4f;
  border: none;
  margin-top: 20px;
  margin-inline: auto;
}
.pokemon-item {
  height: auto;
  border-radius: 15px;
  box-shadow: #0000001a 0 4px 12px;
  padding: 20px 0;
  text-transform: capitalize;
  background: #f8f9fa;
  transition: transform 0.2s ease-in-out;
}

.element__pokemon {
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px;
}

.fire { background-color: #FF421C; }
.grass { background-color: #78CD54; }
.poison { background-color: #A33EA1; }
.flying { background-color: #A98FF3; }
.water { background-color: #6390F0; }
.bug { background-color: #A6B91A; }
.normal { background-color: #A8A77A; }
.electric { background-color: #F7D02C; }
.ground { background-color: #E2BF65; }
.fairy { background-color: #D685AD; }
.fighting { background-color: #C22E28; }
.psychic { background-color: #F95587; }
.rock { background-color: #B6A136; }
.ice { background-color: #96D9D6; }
.ghost { background-color: #735797; }
.evolution-container {
  text-align: center;
  margin-top: 20px;
}

.evolution-chain {
  text-align: center;
  display: flex;
  flex-direction: column;
}

.evolution-list {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.evolution-item {
  align-items: center;
  text-transform: capitalize;
  height: 100%;
}

.evolution-item img {
  width: 100px;
  height: 100px;
}
.pokemon-info {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}

.pokemon-info-box {
  background: #f4f4f4;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: center;
  width: 100px;
}

.pokemon-info-box h4 {
  margin: 0;
  font-size: 14px;
  font-weight: bold;
}

.pokemon-info-box p {
  margin: 5px 0 0;
  font-size: 16px;
}

.pokemon-stats {
  text-align: center;
  margin-top: 20px;
}

.stats-list {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 10px;
}

.stat-name {
  font-size: 14px;
  font-weight: bold;
  color: #555;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
}
.pokemon-abilities {
  margin-top: 20px;
  text-align: center;
}

.abilities-list {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.ability-item {
  background-color: #f4f4f4;
  padding: 8px 16px;
  border-radius: 15px;
} 
.pokemon-description {
  max-width: 400px;
  word-wrap: break-word;
  text-align: center; 
  margin: 10px auto; 
  line-height: 1.5;
}
</style>
