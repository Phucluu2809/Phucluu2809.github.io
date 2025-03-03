<script setup>
import { ref } from 'vue';
import PokemonDetails from '@/pokemon/PokemonDetails.vue';

const props = defineProps({
  pokemons: {
    type: Array,
    required: true
  }
});

const statePokemon = ref(false);
const loadingPokemonList = ref(false);

setTimeout( () => {
   loadingPokemonList.value = true;
}, 150)

</script>

<template>
  <div>
    <div class="pokemon-details-wrap" v-if="statePokemon"> 
        <PokemonDetails />
    </div>
    <div class="pokemon-list" v-else>

      <div v-for="pokemon in pokemons" :key="pokemon.name" class="pokemon-item" >
        <div class="imgLoading" v-if="!loadingPokemonList">
            <img src="../assets/loading-pokemon.jpg">
        </div>
        <RouterLink :to="`/${pokemon.name}`" v-if="loadingPokemonList">  
          <div class="pokemon-id">{{ pokemon.id }}</div>
          <img class="img-pokemon" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" />
          <p>{{ pokemon.name }}</p>
          <div class="pokemon-types">
            <span 
              v-for="type in pokemon.types" 
              :key="type" 
              :class="type" 
              class="pokemon-type"
            >
              {{ type }}
            </span>
          </div>
        </RouterLink>
      </div>  
    </div>
  </div>
</template>

<style>
.pokemon-list
{
  display: grid;
  grid-template-columns: auto auto auto auto auto auto;
    /* justify-content: space-between; */
    margin-top: 50px;
}

.img-pokemon{
    width: 100%;
    height: auto;
}

.pokemon-item
{
    height: auto;
    border-radius: 15px;
    box-shadow: #0000001a 0 4px 12px;
    padding: 20px 0;
    margin: 10px 5px;
    text-transform: capitalize;
    cursor: pointer;
}

.pokemon-item:hover{
    box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
}

/* css pokemon types */
.pokemon-types
{
    display: flex;
    justify-content: center;
    gap: 10px;
}
.pokemon-type
{
    font-size: 14px;
    border-radius: 5px;
    font-weight: 500;
    padding: 3px 4px;
    text-transform: capitalize;
}
.normal {
    background-color: #a8a77a; 
}

.fire {
    background-color: #ff421c; 
}

.water {
    background-color: #6390f0; 
}

.grass {
    background-color: #78cd54;
}

.electric {
    background-color: #f7d02c; 
}

.ice {
    background-color: #96d9d6; 
}

.fighting {
    background-color: #c22e28; 
}

.poison {
    background-color: #a33ea1; 
}

.ground {
    background-color: #e2bf65; 
}

.flying {
    background-color: #a98ff3; 
}

.psychic {
    background-color: #f95587;
}

.bug {
    background-color: #a6b91a; 
}

.rock {
    background-color: #b6a136; 
}

.ghost {
    background-color: #735797; 
}

.dragon {
    background-color: #6f35fc; 
}

.dark {
    background-color: #705746; 
}

.steel {
    background-color: #b7b7ce; 
}

.fairy {
    background-color: #d685ad; 
}
</style>
