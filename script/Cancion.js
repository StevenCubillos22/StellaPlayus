import { convertirSecMin } from "./util.js";

export class Cancion {

    constructor (id, archAudio, archImg, titulo, autor, videojuego){
        this.id = id;
        this.cancion = archAudio;
        this.img = archImg;
        this.titulo = titulo;
        this.autor = autor;
        this.videojuego = videojuego;
        this.isReproduciendo = false;
        this.tiempoReproducido = 0;
        this.intervalo;
    }

    // Setter para el id
    set setId(id) {
        this.id = id;
    }

    // Getter para el id
    get getId() {
        return this.id;
    }

    // Setter para la imagen
    set setImg(img) {
        this.img = img;
    }

    // Getter para la imagen
    get getImg() {
        return this.img;
    }

    // Setter para la canción
    set setCancion(cancion) {
        this.cancion = cancion;
    }

    // Getter para la canción
    get getCancion() {
        return this.cancion;
    }

    // Setter para el título
    set setTitulo(titulo) {
        this.titulo = titulo;
    }

    // Getter para el título
    get getTitulo() {
        return this.titulo;
    }

    // Setter para el autor
    set setAutor(autor) {
        this.autor = autor;
    }

    // Getter para el autor
    get getAutor() {
        return this.autor;
    }

    // Setter para el videojuego
    set setVideojuego(videojuego) {
        this.videojuego = videojuego;
    }

    // Getter para el videojuego
    get getVideojuego() {
        return this.videojuego;
    }

    impCancion(contImg, contTitulo, contAutor, contVideojuego, contAudio, contMax, contRango) {
        contAudio.src = this.cancion;
        contAudio.load();

        contAudio.onloadedmetadata = function() {
            console.log(contAudio.duration)
            const duracionMinutos = convertirSecMin(contAudio.duration);
            contMax.innerHTML = duracionMinutos;
            contRango.max = contAudio.duration;

            console.log(Math.floor(contAudio.duration));
            console.log('duracion = ' + duracionMinutos);
        };

        contImg.src = this.img;
        contImg.alt = this.titulo;
        contTitulo.textContent = this.titulo;
        contAutor.textContent = this.autor;
        contVideojuego.textContent = this.videojuego;
    }

}