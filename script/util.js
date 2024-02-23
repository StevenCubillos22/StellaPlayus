export function convertirSecMin(duration) {
    const segundos = Math.floor(duration) % 60;

    const minutos = Math.floor(duration) / 60;

    return Math.trunc(minutos) + ':' + segundos;
}

export function abrirReproductor(numCancion, isAleatorio, isBucle){
    window.location.href = "./../main/reproductor.html?numCancion=" + numCancion;
}