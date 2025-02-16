<template>
    <div class="container">
      <div class="header">
        <h2>Pokemon API</h2>
      </div>
      <input 
        type="text" 
        placeholder="Search some Pokemon" 
        class="poke-search" 
        v-model="valueSearch" 
        @input="handleSearch">
  
      <div class="pokemon-list">
        <div 
          v-for="pokemon in renderPokemon" 
          :key="pokemon.name" 
          class="pokemon-item">
          <div class="pokemon-id">{{ getIDPokemon(pokemon.url) }}</div>
          <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(pokemon.url)}.png`" />
          <p>{{ pokemon.name }}</p>
        </div>
      </div>
  
      <button 
        v-show="filteredPokemons.length > limit"
        class="load-page-btn" 
        @click="handleLoadMore">Load More</button>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
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
  
  let pokemons = JSON.parse(localStorage.getItem("pokemonsData")) || [];
  filteredPokemons.value = pokemons;
  
  const offset = ref(0);
  let limit = 36;
  
  const renderPokemon = computed(() => {
    return filteredPokemons.value.slice(offset.value, offset.value + limit);
  });
  
  async function getPokemon() {
    const response = await fetchPromise("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898");
    if (response && response.results) {
      pokemons = response.results;
      filteredPokemons.value = pokemons;
      localStorage.setItem("pokemonsData", JSON.stringify(pokemons));
    }
  };
  getPokemon();
  
  function handleSearch() {
    const query = valueSearch.value.toLowerCase(); 
    filteredPokemons.value = pokemons.filter(pokemon => 
      pokemon.name.toLowerCase().includes(query)
    );
    offset.value = 0;  
  }
  
  function handleLoadMore() {
    offset.value += limit;
  }
  </script>
  
  <style>
  .header {
    font-size: 25px;
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
    margin-top: 50px;
  }
  .poke-search {
    max-width: 500px;
    width: 100%;
    margin-top: 50px;
    margin-bottom: 20px;
    border-radius: 30px;
    font-size: 16px;
    padding: 20px;
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
    margin: 10px 5px;
    text-transform: capitalize;
  }
  </style>
  