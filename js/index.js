const btnBusqueda = document.getElementById("btnBusqueda");
const inputBusqueda = document.getElementById("barraBusqueda");
const btnCardArtistas = document.querySelectorAll(".btnCardArtistas");
const btnAdmin = document.getElementById("btnAdmin");
const btnIniciarSesion = document.getElementById("btnIniciarSesion");
const btnRegistrarse = document.getElementById("btnRegistrarse");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const contenedorCanciones = document.getElementById("contenedorCanciones");
const reproductorSticky = document.querySelector('.reproductor');
const mostrarPlaylist = document.querySelector('.listaCancionesReproductor');

//VERIFICAR ADMIN LOGUEADO
const adminLogueado =
    JSON.parse(localStorage.getItem("adminLogueado")) || false;
if (adminLogueado) {
    btnIniciarSesion.classList.add("d-none");
    btnRegistrarse.classList.add("d-none");
    btnAdmin.classList.remove("d-none");
    btnCerrarSesion.classList.remove("d-none");
    reproductorSticky.classList.add('d-flex');
    document.getElementById("barraBusqueda").removeAttribute("disabled", "");
    localStorage.setItem('mostrarReproductor', true);
}
//VERIFICAR USUARIO LOGUEADO
const usuarioLogueado =
    JSON.parse(localStorage.getItem("usuarioLogueado")) || false;
if (usuarioLogueado) {
    btnIniciarSesion.classList.add("d-none");
    btnRegistrarse.classList.add("d-none");
    btnCerrarSesion.classList.remove("d-none");
    reproductorSticky.classList.add('d-flex');
    localStorage.setItem('mostrarReproductor', true);
    document.getElementById("barraBusqueda").removeAttribute("disabled", "");
}

const mostrarReproductor = JSON.parse(localStorage.getItem('mostrarReproductor')) || false;
if(mostrarReproductor){
    reproductorSticky.classList.remove("d-none");
}

//FUNCION DEL BOTON CERRAR SESION
btnCerrarSesion.addEventListener("click", () => {
    Swal.fire({
        title: "¿Cerrar Sesión?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, cerrar sesión!",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Cerrando sesión...",
                toast: true,
                position: "top",
                timer: 2000,
                showConfirmButton: false,
            });
            localStorage.removeItem("adminLogueado");
            localStorage.removeItem("usuarioLogueado");
            localStorage.removeItem('mostrarReproductor');
            localStorage.removeItem('playlist');
            reproductorSticky.classList.remove('d-flex');
            reproductorSticky.classList.add("d-none");
            let interval = setInterval(() => {
                window.location.href = "../index.html";
            }, 2000);
        }
    });
});

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
        if (!cursorSpan.classList.contains("typing"))
            cursorSpan.classList.add("typing");
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
        if (!cursorSpan.classList.contains("typing"))
            cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(
            0,
            charIndex - 1
        );
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});
//FIN ANIMACION LETRAS TITULO SOUNDSTREAM

btnBusqueda.addEventListener("click", () => {
    verificarLogueo("Registrate para buscar tus canciones favoritas!");
});

const canciones = JSON.parse(localStorage.getItem("listaCanciones"));

canciones.forEach((cancion) => {
    const {
        idCancion,
        tituloCancion,
        artistaCancion,
        categoriaCancion,
        imagenCancion,
        duracionCancion,
        nombreCancion,
    } = cancion;
    contenedorCanciones.innerHTML += `
    <div class="card bg-secondary mx-3 mt-2" style="width: 12rem;">
        <img src="${imagenCancion}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title" style="font-size:16px;">${nombreCancion}</h5>
            <hr>
            <div>
                <button class="btn btn-success" onclick="reproducirCancion(${idCancion})"><i class="bi bi-play-circle"></i></button>
                <button class="btn btn-dark" onclick="verDetalle(${idCancion})"><i class="bi bi-eye"></i></button>
                <button class="btn btn-warning" onclick="agregarCancionPlaylist(${idCancion})"><i class="bi bi-plus-square"></i></button>
            </div>
        </div>
    </div>
    `;
});

const filtrar = () => {
    contenedorCanciones.innerHTML = "";
    const textoBusqueda = inputBusqueda.value.toLowerCase();
    for (let cancion of canciones) {
        let nombre = cancion.nombreCancion.toLowerCase();
        let artista = cancion.artistaCancion.toLowerCase();
        if (
            nombre.indexOf(textoBusqueda) !== -1 ||
            artista.indexOf(textoBusqueda) !== -1
        ) {
            contenedorCanciones.innerHTML += `
            <div class="card bg-secondary mx-3 mt-2" style="width: 12rem;">
            <img src="${cancion.imagenCancion}" class="card-img-top h-100" alt="...">
            <div class="card-body">
            <h5 class="card-title" style="font-size:16px;">${cancion.nombreCancion}</h5>
            <hr>
            <div>
                <button class="btn btn-success" onclick="reproducirCancion(${cancion.idCancion})"><i class="bi bi-play-circle"></i></button>
                <button class="btn btn-dark" onclick="verDetalle(${cancion.idCancion})"><i class="bi bi-eye"></i></button>
                <button class="btn btn-warning" onclick="agregarCancionPlaylist(${cancion.idCancion})"><i class="bi bi-plus-square"></i></button>
                </div>
                </div>
                </div>
            `;
        }
    }
    if (contenedorCanciones.innerHTML === "") {
        contenedorCanciones.innerHTML =
            '<h3 class="text-white"><i>No se encontraron resultados...</i></h3>';
    }
};

btnBusqueda.addEventListener("click", filtrar);
inputBusqueda.addEventListener("keyup", filtrar);

function reproducirCancion(idCancion) {
    verificarLogueo("Registrate para escuchar tus canciones favoritas!");
    const cancion = canciones.find((song)=> song.idCancion == idCancion);
    console.log(cancion)
    document.getElementById('frameSpotify').setAttribute('src', `${cancion.urlCancion}`)
}

function verDetalle(idCancion) {
    if (!usuarioLogueado && !adminLogueado) {
        Swal.fire({
            icon: "error",
            text: `Debes loguearte para usar esta funcionalidad`,
            showConfirmButton: false,
            timer: 2000,
        });
        let interval = setInterval(() => {
            window.location.href = "../html/registro.html";
        }, 2000);
        return;
    }
    const cancion = canciones.find((song)=> song.idCancion == idCancion);

    Swal.fire({
        title: `${cancion.nombreCancion}`,
        html: `ID: <b>${cancion.idCancion}</b><br>Artista: <b>${cancion.artistaCancion}</b><br>Género: <b>${cancion.categoriaCancion}</b><br>Duración: <b>${cancion.duracionCancion}</b>`,
        imageUrl: `${cancion.imagenCancion}`,
        imageWidth: 200,
        imageHeight: 250,
        color: '#FFF',
        background: '#09090A'
    })

}

const playlistUsuario = JSON.parse(localStorage.getItem('playlist')) || [];

if(playlistUsuario.length == 0){
    mostrarPlaylist.innerHTML = '<p class="text-center mt-3"><i>Todavia no hay canciones agregadas</i></p>';
}
if(playlistUsuario.length > 0){
    verPlaylist()
}

function verPlaylist(){
        mostrarPlaylist.innerHTML = '';
        if (playlistUsuario.length == 0) {
            mostrarPlaylist.innerHTML = '<p class="text-center mt-3"><i>Todavia no hay canciones agregadas</i></p>';
        }
        if (playlistUsuario.length > 0) {
            for (const i in playlistUsuario) {
                let cancion = playlistUsuario[i];
                mostrarPlaylist.innerHTML += `
            <hr class="m-0 p-0">
            <div class="d-flex justify-content-between align-items-center">
                <div><small>${cancion.nombreCancion}</small></div>
                <div>
                    <button class="btn btn-outline-success pt-0 px-3" onclick="reproducirCancionPlaylist(${i})"><i class="bi bi-play-circle" style="font-size: 10px;"></i></button>
                    <button class="btn btn-outline-danger pt-0 px-3" onclick="eliminarCancionPlaylist(${i})"><i class="bi bi-trash" style="font-size: 10px;"></i></button>
                </div>
            </div>
            `;
            }
        }
}

function reproducirCancionPlaylist(indexCancion){
    document.getElementById('frameSpotify').setAttribute('src', `${playlistUsuario[indexCancion].urlCancion}`)
}



function agregarCancionPlaylist(idCancion) {
    if (!usuarioLogueado && !adminLogueado) {
        Swal.fire({
            icon: "error",
            text: `Debes loguearte para agregar canciones a tu playlist`,
            showConfirmButton: false,
            timer: 2000,
        });
        let interval = setInterval(() => {
            window.location.href = "../html/registro.html";
        }, 2000);
        return;
    }
    mostrarPlaylist.innerHTML = '';
    const cancion = canciones.find((song)=> song.idCancion == idCancion);
    Swal.fire({
        icon: 'success',
        text: `Cancion agregada a la lista`,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        color: '#FFF',
        background: '#09090A'
    })
    playlistUsuario.push(cancion);
    localStorage.setItem('playlist', JSON.stringify(playlistUsuario));
    verPlaylist();
}

function eliminarCancionPlaylist(cancion) {
    Swal.fire({
        title: "¿Eliminar Canción?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "No, cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: "success",
                title: "Eliminando canción...",
                toast: true,
                position: "center",
                timer: 2000,
                showConfirmButton: false,
            });
            playlistUsuario.splice(cancion, 1);
            localStorage.setItem("playlist", JSON.stringify(playlistUsuario));
            verPlaylist();
        }
    });
}

function verificarLogueo(mensaje) {
    if (!usuarioLogueado && !adminLogueado) {
        Swal.fire({
            icon: "error",
            text: `${mensaje}`,
            showConfirmButton: false,
            timer: 2000,
        });
        let interval = setInterval(() => {
            window.location.href = "../html/registro.html";
        }, 2000);
        return;
    }
}

function loadContent(page) {
    const contentDiv = document.getElementById("contenidoPrincipal");
    contentDiv.innerHTML = "";

    // Cargar contenido HTML del archivo solicitado
    fetch(page)
        .then((response) => response.text())
        .then((html) => {
            contentDiv.innerHTML = html;
        });
}
