const riotLogo = document.getElementById('riot-logo');
const container = document.getElementById('container');
const overlay = document.getElementById('overlay');
const riotLogo2 = document.getElementById('riot-logo-2');
const closeButton = document.getElementById('close-btn');
const language = document.getElementById('language');
const assIMG = document.getElementById('assIMG');
const fightIMG = document.getElementById('fightIMG');
const mageIMG = document.getElementById('mageIMG');
const markIMG = document.getElementById('markIMG');
const spIMG = document.getElementById('spIMG');
const tankIMG = document.getElementById('tankIMG');
const rift = document.getElementById('rift_video');
const aram = document.getElementById('aram_video');
const tft = document.getElementById('tft_video');
riotLogo.addEventListener('click', () => {
    overlay.style.display = 'flex';
    
    const G1 = document.getElementById('game_anh1');
    const G2 = document.getElementById('game_anh2');
    const G3 = document.getElementById('game_anh3');
    const G4 = document.getElementById('game_anh4');
    const G5 = document.getElementById('game_anh5');
    const F1 = document.getElementById('forge_1');
    const F2 = document.getElementById('forge_2');
    const F3 = document.getElementById('forge_3');
    const F4 = document.getElementById('forge_4');
    const F5 = document.getElementById('forge_5');
    const ES1 = document.getElementById('es1');
    const ES2 = document.getElementById('es2');
    const EN1 = document.getElementById('en1');
    const EN2 = document.getElementById('en2');
    const EN3 = document.getElementById('en3');
    const B1 = document.getElementById('b1');
    const B2 = document.getElementById('b2');
    const B3 = document.getElementById('b3');
    const B4 = document.getElementById('b4');
    const empty = document.getElementById('no_hover_1');
    const empty1 = document.getElementById('no_hover_2');
    
    function hover_button(call_back) {
        G1.style.display = 'none';
        G2.style.display = 'none';
        G3.style.display = 'none';
        G4.style.display = 'none';
        G5.style.display = 'none';
        F1.style.display = 'none';
        F2.style.display = 'none';
        F3.style.display = 'none';
        F4.style.display = 'none';
        F5.style.display = 'none';
        ES1.style.display = 'none';
        ES2.style.display = 'none';
        EN1.style.display = 'none';
        EN2.style.display = 'none';
        EN3.style.display = 'none';
        B1.style.display = 'none';
        B2.style.display = 'none';
        B3.style.display = 'none';
        B4.style.display = 'none';
        empty.style.display = 'none';
        empty1.style.display = 'none';
        call_back.style.display = 'flex';
    }
    document.getElementById('button_game_1').addEventListener("mouseenter", () => hover_button(G1));
    document.getElementById('button_game_2').addEventListener("mouseenter", () => hover_button(G2));
    document.getElementById('button_game_3').addEventListener("mouseenter", () => hover_button(G3));
    document.getElementById('button_game_4').addEventListener("mouseenter", () => hover_button(G4));
    document.getElementById('button_game_5').addEventListener("mouseenter", () => hover_button(G5));
    document.getElementById('button_forge_1').addEventListener("mouseenter", () => hover_button(F1));
    document.getElementById('button_forge_2').addEventListener("mouseenter", () => hover_button(F2));
    document.getElementById('button_forge_3').addEventListener("mouseenter", () => hover_button(F3));
    document.getElementById('button_forge_4').addEventListener("mouseenter", () => hover_button(F4));
    document.getElementById('button_forge_5').addEventListener("mouseenter", () => hover_button(F5));
    document.getElementById('button_es_1').addEventListener("mouseenter", () => hover_button(ES1));
    document.getElementById('button_es_2').addEventListener("mouseenter", () => hover_button(ES2));
    document.getElementById('button_en_1').addEventListener("mouseenter", () => hover_button(EN1));
    document.getElementById('button_en_2').addEventListener("mouseenter", () => hover_button(EN2));
    document.getElementById('button_en_3').addEventListener("mouseenter", () => hover_button(EN3));
    document.getElementById('button_b_1').addEventListener("mouseenter", () => hover_button(B1));
    document.getElementById('button_b_2').addEventListener("mouseenter", () => hover_button(B2));
    document.getElementById('button_b_3').addEventListener("mouseenter", () => hover_button(B3));
    document.getElementById('button_b_4').addEventListener("mouseenter", () => hover_button(B4));
    function set_hover(){
        G1.style.display = 'none';
        G2.style.display = 'none';
        G3.style.display = 'none';
        G4.style.display = 'none';
        G5.style.display = 'none';
        F1.style.display = 'none';
        F2.style.display = 'none';
        F3.style.display = 'none';
        F4.style.display = 'none';
        F5.style.display = 'none';
        ES1.style.display = 'none';
        ES2.style.display = 'none';
        EN1.style.display = 'none';
        EN2.style.display = 'none';
        EN3.style.display = 'none';
        B1.style.display = 'none';
        B2.style.display = 'none';
        B3.style.display = 'none';
        B4.style.display = 'none';
        empty.style.display = 'flex';
        empty1.style.display = 'flex';
    }
    const buttonsArray = [
        document.getElementById('button_game_1'),
        document.getElementById('button_game_2'),
        document.getElementById('button_game_3'),
        document.getElementById('button_game_4'),
        document.getElementById('button_game_5'),
        document.getElementById('button_forge_1'),
        document.getElementById('button_forge_2'),
        document.getElementById('button_forge_3'),
        document.getElementById('button_forge_4'),
        document.getElementById('button_forge_5'),
        document.getElementById('button_es_1'),
        document.getElementById('button_es_2'),
        document.getElementById('button_en_1'),
        document.getElementById('button_en_2'),
        document.getElementById('button_en_3'),
        document.getElementById('button_b_1'),
        document.getElementById('button_b_2'),
        document.getElementById('button_b_3'),
        document.getElementById('button_b_4')
    ];
    buttonsArray.forEach(button => {
        button.addEventListener("mouseleave", set_hover);
    });
    
    
    
    
});

riotLogo2.addEventListener('click', () => {
    overlay.style.display = 'none';
});
closeButton.addEventListener('click', () => {
    overlay.style.display =  'none';
});
function toggleLanguageMenu() {
    const languageMenu = document.getElementById("languageMenu");
    if (languageMenu.style.display === "flex") {
      languageMenu.style.display = "none";
    } else {
      languageMenu.style.display = "flex";
    }
}
document.getElementById("language").addEventListener("click", toggleLanguageMenu);

function toggle_lane(call_back) {
    assIMG.style.display = 'none';
    fightIMG.style.display = 'none';
    mageIMG.style.display = 'none';
    markIMG.style.display = 'none';
    spIMG.style.display = 'none';
    tankIMG.style.display = 'none';
    call_back.style.display = 'flex';

}
document.getElementById('ass').addEventListener("click", () => toggle_lane(assIMG));
document.getElementById('fight').addEventListener("click", () => toggle_lane(fightIMG));
document.getElementById('mage').addEventListener("click", () => toggle_lane(mageIMG));
document.getElementById('mark').addEventListener("click", () => toggle_lane(markIMG));
document.getElementById('sp').addEventListener("click", () => toggle_lane(spIMG));
document.getElementById('tank').addEventListener("click", () => toggle_lane(tankIMG));

function toggle_video(call_back) {
    rift.style.display = 'none';
    aram.style.display = 'none';
    tft.style.display = 'none';
    call_back.style.display = 'flex';
}
document.getElementById('rift').addEventListener("click", () => toggle_video(rift));
document.getElementById('aram').addEventListener("click", () => toggle_video(aram));
document.getElementById('tft').addEventListener("click", () => toggle_video(tft));




const btn1 = document.getElementById('game___');
const btn2 = document.getElementById('forge___');
const btn3 = document.getElementById('es___');
const btn4 = document.getElementById('en___');
const btn5 = document.getElementById('b___');
function tap_to_menu(call_back) {
    if (call_back.style.display === 'none') {     
        call_back.style.display = 'block';
    }
    else  call_back.style.display = 'none';
}
if (window.innerWidth < 1024){
    document.getElementById('game_btn').addEventListener("click", () => tap_to_menu(btn1));
    document.getElementById('forge_btn').addEventListener("click", () => tap_to_menu(btn2));
    document.getElementById('es_btn').addEventListener("click", () => tap_to_menu(btn3));
    document.getElementById('en_btn').addEventListener("click", () => tap_to_menu(btn4));
    document.getElementById('b_btn').addEventListener("click", () => tap_to_menu(btn5));
}

const categories = document.querySelectorAll(".category");
if (categories.length > 0) {
    categories[0].classList.add("no-hover");
    categories[0].style.pointerEvents = "none";
}
categories.forEach((box) => {
  box.addEventListener("click", () => {
    categories.forEach((otherBox) => {
      otherBox.style.pointerEvents = "auto"; 
      otherBox.classList.remove("no-hover");
    });
    box.style.pointerEvents = "none";
    box.classList.add("no-hover");
  });
});

