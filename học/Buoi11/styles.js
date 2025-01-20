function fetchPromise(URL) {
    return new Promise(function (resolve) {
        fetch(URL)
            .then(function (response) {
                const promise = response.json();
                resolve(promise);
            })
            .catch(function (error) {
                console.log('error!!!!!!!!!!!!!!');
            });
    });
}

async function main() {
    let pokemons = []; 
    //lấy danh sách !!!
    const data = await fetchPromise("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898");
    pokemons = data.results;
    //tạo data tới link trong pokemos rồi kiếm hệ=)))
    const pokemonPromises = pokemons.map(pokemon => fetchPromise(pokemon.url));

    // chờ tất cả các Promise hoàn thành
    const pokemon__element = await Promise.all(pokemonPromises);    
    //  tới đây code thoi=)))


    const pokemonList = document.querySelector(".pokemon__list");
    const button__pokemon = document.querySelector("button");



    let size = 4;
    function render__of__pokemon(dataPokemon,size,pokemon__element,element__id) {
        let imgs = "";
        pokemonList.innerHTML = imgs;
        for (let i = 0; i < size; i++) {


            if (!element__id[0]) 
                element__id[i]=i;
            let element = "";
    // khúc này tao mò khùng luôn=))) 
            for (let j = 0;j < pokemon__element[i].types.length; j++)
                element+=`<div class="${pokemon__element[i].types[j].type.name}">
                              ${pokemon__element[i].types[j].type.name}
                         </div>`;
            imgs += `
            <div class="pokemon">
                <div class="id">#${element__id[i] + 1}</div>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${element__id[i] + 1}.png" alt="">
                <div class="element__pokemon">
                     ${element} 
                </div>
                <div class="name">${dataPokemon[i].name}</div>
            </div>`
        }
        pokemonList.innerHTML = imgs;
    }
    let element__id = [];
    render__of__pokemon(pokemons,size,pokemon__element,element__id);



    const name__inp = document.querySelector("input");
    function check(a,b){
        return b.includes(a);
    }
    let tmp = pokemons;
    let element__tmp = pokemon__element;
    name__inp.addEventListener('input',function(){
        let a = name__inp.value;
        let tmp = [];
        let element__tmp = [];
        let element__id = [];
        size = 5;
        console.log(a);
        for (let i = 0; i < pokemons.length; i++)
        {
            let b = pokemons[i].name;
            if (check(a, b)){
                tmp.push(pokemons[i]);
                element__tmp.push(pokemon__element[i]); 
                element__id.push(i);
            }
        }
        render__of__pokemon(tmp,size,element__tmp,element__id);
        button__pokemon.addEventListener('click',function(){
            if (size < element__tmp.length)
                size = size + 5;
            else size = element__tmp.length;
            render__of__pokemon(tmp,size,element__tmp,element__id);
        })
    })



    button__pokemon.addEventListener('click',function(){
        if (size < element__tmp.length)
            size = size + 5;
        else size = element__tmp.length;
        render__of__pokemon(tmp,size,element__tmp,element__id);
    })
}

main(); 
