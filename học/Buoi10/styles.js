import { dataPokemon } from "./data.js";
const pokemonList = document.querySelector(".pokemon__list");
const buton__pokemon = document.querySelector("#button__load");
function render__of__pokemon(dataPokemon,size) {
    let imgs = "";
    for (let i = 0; i < size; i++) {
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
render__of__pokemon(dataPokemon,3);

const name_inp = document.querySelector(".search")
function check(a,b){
    return b.includes(a);
}
name_inp.addEventListener(
    "input" , function (){
        let a = name_inp.value;
        let imgs = "";
        pokemonList.innerHTML = '';
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