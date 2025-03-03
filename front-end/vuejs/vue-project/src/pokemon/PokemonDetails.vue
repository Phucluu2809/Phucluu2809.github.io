<script setup>
import { ref, onMounted } from 'vue';
import { getShortName } from '@/utils/shortStats';
import { getIDPokemon } from '@/utils/getID';
import { useRoute } from 'vue-router';

const pokemonEvolution = ref([]);
const currentDirect = ref({});
let tmpDirect = {};
const pokemon = ref({});
const isGetPokemon = ref(false);
const route = useRoute();

const listOfPokemon = JSON.parse(sessionStorage.getItem('pokemonsData')) || [];
// console.log("list" , listOfPokemon)

pokemon.value = listOfPokemon.find(pokemon => pokemon.name === route.params.name);

console.log(route.params.name)
console.log(pokemon.value)

function getEvolutionPokemon() {
  if (pokemon.value && pokemon.value.evolution) {
    currentDirect.value = pokemon.value.evolution;
    do {
      pokemonEvolution.value.push(currentDirect.value.species);
      tmpDirect = currentDirect.value;
      if (currentDirect.value.evolves_to && currentDirect.value.evolves_to.length !== 0) {
        currentDirect.value = currentDirect.value.evolves_to[0];
      }
    } while (tmpDirect.evolves_to && tmpDirect.evolves_to.length !== 0);
  }
}

onMounted(() => {
  if (pokemon.value) {
    getEvolutionPokemon();
  }

  setTimeout(() => {
    isGetPokemon.value = true;
  }, 100);
});


</script>

<template>
  <div class="loading" v-if="!isGetPokemon">
    Getting Data From PokeDex...
  </div>

  <div class="wrapper" v-if="isGetPokemon">
    <RouterLink :to="'/'"  class="back-btn"> < Back </RouterLink>
    <div class="col-full" v-if="pokemon && pokemon.id">
      <div
        class="image-pokemon"
        :style="{
          backgroundImage: `url('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png')`
        }"
      ></div>
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
      <h2 class="name">{{ pokemon.name }}</h2>
      <p class="entry">{{ pokemon.species }}</p>
      <div class="detail__wrap">
        <div>
          <h3 class="label">Height</h3>
          <div class="detail-tag">{{ pokemon.height }}</div>
        </div>
        <div>
          <h3 class="label">Weight</h3>
          <div class="detail-tag">{{ pokemon.weight }}</div>
        </div>
      </div>
      <div class="ability">
        <h3 class="label">Abilities</h3>
        <div class="detail__wrap">
          <div v-for="ability in pokemon.abilities" :key="ability">
            <div class="detail-tag">{{ ability.ability.name }}</div>
          </div>
        </div>
      </div>
      <div class="stats">
        <h3 class="label">Stats</h3>
        <div class="detail__wrap">
          <div v-for="stat in pokemon.stats" :key="stat" class="tag">
            <div class="tag__label" :class="getShortName(stat.stat.name)">{{ getShortName(stat.stat.name) }}</div>
            <div class="tag__detail">{{ stat.base_stat}}</div>
          </div>
        </div>
      </div>
      <div class="evolution-content">
        <h3 class="label">Evolution</h3>
        <div class="evolution__wrap">
          <div v-for="(evolution, index) in pokemonEvolution" :key="evolution.name" class="evolution__wrap__content">
            <div class="divider" v-show="index != 0">&gt;</div>
            <div  class="evolution">
              <div class="form">
                <h4 class="name">{{ evolution.name }}</h4>
                <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getIDPokemon(evolution.url)}.png`" :alt="evolution.name" />
              </div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<style>
a{
  text-decoration: none;
}

.loading{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
}
.col-full {
  max-width: 500px;
  width: 100%;
  margin: auto;
}

.image-pokemon {
  width: 200px;
  height: 200px;
  margin: auto;
  background-size: cover;
}

.pokemon-type {
  font-weight: 600;
  text-align: center;
  margin-bottom: 5px;
  padding: 3px 4px;
  border-radius: 5px;
  margin: 0 3px;
  font-size: 13px;
  text-transform: capitalize;
}

.name {
  white-space: nowrap;
  font-weight: 700;
  text-align: center;
  text-transform: capitalize;
}

.entry{
  text-align: center;
}

.detail__wrap{
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 5px;
}

.label{
  font-weight: 600;
  text-align: center;
  margin-bottom: 5px;
}

.detail-tag{
  width: 100px;
  margin: 5px;
  padding: 2px;
  border-radius: 30px;
  background-color: #f6f8fc;
  text-align: center;
  text-transform: capitalize;
}

.tag{
  margin: 5px;
  padding: 5px;
  background-color: #f6f8fc;
  border-radius: 30px;
  box-shadow: #63636333 0 2px 8px;
}

.detail__wrap {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 5px;
}

.tag__label{
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 10px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}

.HP{
  background-color: #df2140;
}

.ATK{
  background-color: #ff994d;
}

.DEF {
  background-color: #eecd3d;
}

.SpA {
  background-color: #85ddff;
}

.SpD {
  background-color: #96da83;
}

.SPD {
  background-color: #fb94a8;
}

.tag__detail{
  text-align: center;
}

.evolution__wrap {
  display: flex;
  /* justify-content: center; */
  justify-content: space-around;
}

.divider{
  font-weight: 700;
  margin-right: 10px;
}

.evolution{
  display: flex;
  justify-content: space-around;
}

.evolution__wrap__content{
  display: flex;
  align-items: center;
}

.form{
  text-align: center;
  display: flex;
  align-items: center;
}

</style>
