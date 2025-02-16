<template>
  <div>
    <div class="pokemon-list">
      <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-item">
        <div class="pokemon-id">{{ getIDPokemon(pokemon.url) }}</div>
        <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(pokemon.url)}.png`" />
        <p>{{ pokemon.name }}</p>
      </div>  
    </div>
  </div>
</template>

<script setup>
import { getIDPokemon } from "../utils/getID.js";
const props = defineProps({
  pokemons: Array
});
</script>

<style>
.pokemon-list
{
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
    /* justify-content: space-between; */
    margin-top: 50px;
}

.pokemon-item
{
    height: auto;
    border-radius: 15px;
    box-shadow: #0000001a 0 4px 12px;
    padding: 20px 0;
    margin: 10px 5px;
    text-transform: capitalize;
}
</style>
