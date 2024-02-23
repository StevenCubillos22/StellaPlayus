import { Cancion } from "./Cancion.js";

import { convertirSecMin, abrirReproductor } from "./util.js";

const contImg = document.querySelector(".imagen-cancion");
const contTitulo = document.querySelector(".titulo-cancion");
const contAutor = document.querySelector(".autor-cancion");
const contVideojuego = document.querySelector(".videojuego-cancion");
const contAudio = document.querySelector("audio");
const contRange = document.querySelector("#rango");
const contLabel = document.querySelector("#minutos");
const contLabelActual = document.querySelector("#minutos-actuales");
const btnPlayPause = document.querySelector(".PlayPausa");
const svgPlay = document.querySelector("#Play");
const svgPausa = document.querySelector("#Pausa");
const svgBucle = document.querySelector('#Bucle');
const svgAleatorio = document.querySelector('#Aleatorio');
const btnAnt = document.querySelector(".anterior");
const btnSig = document.querySelector(".siguiente");
const btnRandom = document.querySelector(".aleatorio");
const btnLoop = document.querySelector(".bucle");

let isAleatorio = false;
let isBucle = false;

// Lista de canciones
const canciones = [
    new Cancion(
        "img1",
        "./../canciones/SonicAdventureEmeraldCoastOST.mp3",
        "./../img/Diseño_sin_título-removebg-preview.png", 
        "Emerald Coast OST",
        "Jun Senoue",
        "Sonic Adventure"
    ),

    new Cancion(
        "img2",
        "./../canciones/TAKUMI2009.mp3",
        "./../img/ya3.jpg",
        "TAKUMI 2009",
        "SEGA SOUND TEAM",
        "Yakuza 3"
    ),

    new Cancion(
        "img3",
        "./../canciones/BloodOfVillain.mp3",
        "./../img/p5-removebg-preview.png",
        "Blood Of Villain",
        "Shoji Meguro",
        "Persona 5"
    ),

    new Cancion(
        "img4",
        "./../canciones/XenobladeChroniclesOSTGaurPlain.mp3",
        "./../img/xeno-removebg-preview.png",
        "Gaur Plain",
        "ACE+",
        "Xenoblade Chronicles"
    ),

    new Cancion(
        "img5",
        "./../canciones/Resident Evil 2 Save Room.mp3",
        "./../img/re2.jpg",
        "Safe Room",
        "Masami Ueda",
        "Resident Evil 2"
    ),

    new Cancion(
        "img6",
        "./../canciones/Silent Hill - No Dream.mp3",
        "./../img/silenthill-removebg-preview.png",
        "No Dream",
        "Keiichiro Toyama",
        "Silent Hill 2"
    ),

    new Cancion(
        "img7",
        "./../canciones/TEKKEN 7 - CHARACTER SELECT THEME.mp3",
        "./../img/tekken.jpg",
        "Character Selection",
        "Rio Hamamoto",
        "Tekken 7"
    ),

    new Cancion(
        "img8",
        "./../canciones/Fire Emblem Awakening OST - Fire Emblem Awakening Main Theme.mp3",
        "./../img/fireemblem.jpg",
        "Awakening",
        "Hiroki Morishita and Rei Kondoh",
        "Fire Emblem Awakening"
    ),
];


function cargarCancion() {
    const cancion = canciones.find(cancion => cancion.id === obtenerCancion());

    cancion.impCancion(contImg, contTitulo, contAutor, contVideojuego, contAudio, contLabel, contRange);
}

function obtenerCancion(){
    const params = new URLSearchParams(window.location.search);
    const numCancion = params.get('numCancion');
    isAleatorio = params.get('isAleatorio');
    isBucle = params.get('isBucle');

    return numCancion;
}


function play(cancion) {
    cancion.intervalo = setInterval(() => { 
        cancion.tiempoReproducido++;

        let is0 = false;

        if(contRange.max <= cancion.tiempoReproducido){
            cancion.tiempoReproducido = 0;
            is0 = true;
        }
        
        contRange.value = cancion.tiempoReproducido;
        contLabelActual.innerHTML = convertirSecMin(cancion.tiempoReproducido);
        console.log(cancion.tiempoReproducido);
        
        if(is0){
            if(isBucle){
                contAudio.play();
            } else {
                if(isAleatorio){
                    elegirCancionAleatoria();
                } else {
                    elegirSiguienteCancion();
                }
                
            }
        }

        
    }, 1000);
} 

function pausa(cancion) {
    clearInterval(cancion.intervalo);
}

function playPausa(){
    const cancion = canciones.find(cancion => cancion.id === obtenerCancion());

    svgPausa.classList.toggle('dispNone');
    svgPlay.classList.toggle('dispNone');

    let intervalo;
    console.log('click');
    if (cancion.isReproduciendo) {
        contAudio.pause();
        pausa(cancion);
    } else {
        contAudio.play();
        play(cancion);
    }
    console.log(contAudio.currentTime);

    cancion.isReproduciendo = !cancion.isReproduciendo;
}

btnPlayPause.addEventListener('click', playPausa);

contRange.addEventListener('change', e => {
    console.log('click');

    const cancion = canciones.find(cancion => cancion.id === obtenerCancion());

    let tiempo = contRange.value;

    contAudio.currentTime = tiempo;
    cancion.tiempoReproducido = tiempo;
    
})

function elegirCancionAleatoria(){
    const cancionActual = canciones.find(cancion => cancion.id === obtenerCancion());
    const numAleatorio = Math.floor(Math.random()*canciones.length);

    while(numAleatorio === canciones.indexOf(cancionActual)){
        const numAleatorio = Math.floor(Math.random()*canciones.length);
    }

    const cancion = canciones[numAleatorio];

    abrirReproductor(cancion.id);
}

function elegirSiguienteCancion() {
    const cancionActual = canciones.find(cancion => cancion.id === obtenerCancion());

    let cancionIndex;
    
    if (canciones.indexOf(cancionActual) === canciones.length - 1) {
        cancionIndex = 0;
    } else {
        cancionIndex = canciones.indexOf(cancionActual) + 1;
    }

    const siguienteCancion = canciones[cancionIndex];

    console.log(siguienteCancion.id);
    abrirReproductor(siguienteCancion.id);
}


function elegirCancionAnterior() {
    const cancionActual = canciones.find(cancion => cancion.id === obtenerCancion());

    let cancionIndex;
    
    if (canciones.indexOf(cancionActual) === 0) {
        cancionIndex = canciones.length - 1;
    } else {
        cancionIndex = canciones.indexOf(cancionActual) - 1;
    }

    const cancionAnterior = canciones[cancionIndex];

    abrirReproductor(cancionAnterior.id);
}


btnAnt.addEventListener('click', elegirCancionAnterior);

btnSig.addEventListener('click', e => {
    if(isAleatorio){
        elegirCancionAleatoria();
    } else {
        elegirSiguienteCancion();
    }
});

btnLoop.addEventListener('click', e => {
    isBucle = !isBucle;

    if(isBucle){
        svgBucle.classList.add('enUso')
    } else {
        svgBucle.classList.remove('enUso')
    }
})

btnRandom.addEventListener('click', e => {
    isAleatorio = !isAleatorio;

    if(isAleatorio){
        svgAleatorio.classList.add('enUso')
    } else {
        svgAleatorio.classList.remove('enUso')
    }
})

function cambiarEstadoBotones() {
    if(isAleatorio){
        svgAleatorio.classList.add('enUso')
    } else {
        svgAleatorio.classList.remove('enUso')
    }

        if(isBucle){
        svgBucle.classList.add('enUso')
    } else {
        svgBucle.classList.remove('enUso')
    }
}


window.onload = cargarCancion();

