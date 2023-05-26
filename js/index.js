//ANIMACION VOLVER ARRIBA BOTON INICIO
let volverArriba = document.querySelector("#botonInicio");
    
volverArriba.addEventListener("click", function() {
    window.scrollTo(0, 0)
})
//FIN ANIMACION VOLVER ARRIBA

//ANIMACION SCROLL NAVBAR
const transparenciaTopBar = document.querySelector("#navBarPrincipal");

window.addEventListener("scroll", () => {
    if(window.scrollY > 0){
        transparenciaTopBar.classList.add("transparencia");
    }else{
        transparenciaTopBar.classList.remove("transparencia");
    }
})

// let alturaTopBar = transparenciaTopBar.offsetHeight;

//ANIMACION LETRAS TITULO SOUNDSTREAM
const typedTextSpan = document.querySelector(".animacionTextoSoundStream");
const cursorSpan = document.querySelector(".cursorAnimacionTexto");

const textArray = ["disfrutar", "relajarse", "divertirse", "MÚSICA"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});
//FIN ANIMACION LETRAS TITULO SOUNDSTREAM

//ANIMACION PESTAÑAS
const seccionPrincipal = document.querySelector(".seccionPrincipal");
const seccionFavoritos = document.querySelector(".seccionFavoritos");
const seccionPolitica = document.querySelector(".seccionPolitica");
const seccionTerminos = document.querySelector(".seccionTerminos");
const botonInicio = document.getElementById("botonInicio");
const botonFav = document.getElementById("botonFavoritos");
const botonPolitica = document.getElementById("botonPolitica");
const botonTerminos = document.getElementById("botonTerminos");

botonInicio.addEventListener("click", ()=>{
    seccionPrincipal.classList.remove("d-none");
    seccionFavoritos.classList.add("d-none");
    seccionPolitica.classList.add("d-none");
    seccionTerminos.classList.add("d-none");
})

botonFav.addEventListener("click", ()=>{
    seccionFavoritos.classList.remove("d-none");
    seccionPrincipal.classList.add("d-none");
    seccionPolitica.classList.add("d-none");
    seccionTerminos.classList.add("d-none");
})

botonPolitica.addEventListener("click", ()=>{
    seccionPolitica.classList.remove("d-none");
    seccionPrincipal.classList.add("d-none");
    seccionFavoritos.classList.add("d-none");
    seccionTerminos.classList.add("d-none");
    window.scrollTo(0, 0)
})

botonTerminos.addEventListener("click", ()=>{
    seccionTerminos.classList.remove("d-none");
    seccionPrincipal.classList.add("d-none");
    seccionFavoritos.classList.add("d-none");
    seccionPolitica.classList.add("d-none");
    window.scrollTo(0, 0)
})