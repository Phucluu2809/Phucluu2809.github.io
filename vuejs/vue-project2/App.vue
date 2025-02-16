<script setup>
import { ref, computed } from 'vue';
import { getIDPokemon } from './utils/getID.js'
import PokemonList from './pokemon/pokemonList.vue'

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
    return filteredPokemons.value.slice(offset, offset.value+limit);
});

async function getPokemon()
{
        const response = await fetchPromise("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898");
        if (response && response.results) {
            pokemons = response.results;
            filteredPokemons.value = pokemons;
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

function handleLoadMore()
{
    offset.value += limit;
}

</script>

<template>
    <div class="container">
        <div class="header">
            <h2>Pokemon API</h2>
        </div>
        <input type="text" placeholder="Search some Pokemon" class="poke-search" v-model="valueSearch" @input="handleSearch">

        <PokemonList :pokemons = "renderPokemon"/>
        
        <button 
        v-show="filteredPokemons.length > limit"
        class="load-page-btn" @click="handleLoadMore">Load More</button>
    </div>
</template>

<style>
.header
{
    font-size: 25px;
}
.header h2
{
    font-weight: 400;
}
.container
{
    max-width: 1200px;
    margin-inline: auto;
    text-align: center;
}
.poke-list
{
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    /* justify-content: space-between; */
    margin-top: 50px;
}
.poke-search
{
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
.poke-search:focus
{
    outline: 1px solid #000000;
}
.load-page-btn
{
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

.poke-item
{
    height: auto;
    border-radius: 15px;
    box-shadow: #0000001a 0 4px 12px;
    padding: 20px 0;
    margin: 10px 5px;
    text-transform: capitalize;
}
/* css pokemon types */
.flex-types
{
    display: flex;
    justify-content: center;
    gap: 10px;
}
.type-item
{
    font-size: 14px;
    border-radius: 5px;
    font-weight: 500;
    padding: 3px 4px;
    text-transform: capitalize;
}
.grass
{
    background-color: #78CD54;
}
.fire
{
    background-color: #FF421C;
}
.water
{
    background-color: #6390F0;
}
.electric
{
    background-color: #F7D02C;
}
.ice
{
    background-color: #96D9D6;
}
.fighting
{
    background-color: #C22E28;
}
.poison
{
    background-color: #A33EA1;
}
.ground
{
    background-color: #E2BF65;
}
.flying
{
    background-color: #A98FF3;
}
.psychic
{
    background-color: #F95587;
}
.bug
{
    background-color: #A6B91A;
}
.rock
{
    background-color: #B6A136;
}
</style>