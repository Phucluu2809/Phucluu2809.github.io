import { dataPokemon } from "./data.js";
const pokemonList = document.querySelector(".pokemon__list");
function out__imgs() {
    let imgs = "";
    for (let i = 0; i < dataPokemon.length; i++) {
        const t = dataPokemon[i].name;
        imgs += `
        <div class="pokemon">
            <div class="id">#${i+1}</div>
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png" alt="">
            <div class="name">${t}</div>
        </div>`
    }
    pokemonList.innerHTML = imgs;
}
out__imgs();

const name_inp = document.querySelector(".search")
function check(a,b){
    return b.includes(a);
}
name_inp.addEventListener(
    "input" , function (){
        let a = name_inp.value;
        let imgs = "";
        while (pokemonList.firstChild){
            pokemonList.removeChild(pokemonList.firstChild);
        }
        for (let i = 0; i < dataPokemon.length; i++)
        {
            let b = dataPokemon[i].name;
            if (check(a, b)) 
            {
                imgs += `
                    <div class="pokemon">
                        <div class="id">#${i+1}</div>
                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i + 1}.png" alt="">
                        <div class="name">${b}</div>
                    </div>`
            }
        }
        pokemonList.innerHTML = imgs;
    }

);