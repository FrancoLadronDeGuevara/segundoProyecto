const btnBusqueda = document.getElementById("btnBusqueda");
const inputBusqueda = document.getElementById("barraBusqueda");
const btnCardArtistas = document.querySelectorAll(".btnCardArtistas");
const btnAdmin = document.getElementById("btnAdmin");
const btnIniciarSesion = document.getElementById("btnIniciarSesion");
const btnRegistrarse = document.getElementById("btnRegistrarse");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");
const contenedorCanciones = document.getElementById("contenedorCanciones");

//VERIFICAR ADMIN LOGUEADO
const adminLogueado =
    JSON.parse(localStorage.getItem("adminLogueado")) || false;
if (adminLogueado) {
    btnIniciarSesion.classList.add("d-none");
    btnRegistrarse.classList.add("d-none");
    btnAdmin.classList.remove("d-none");
    btnCerrarSesion.classList.remove("d-none");
    document.getElementById("barraBusqueda").removeAttribute("disabled", "");
}
//VERIFICAR USUARIO LOGUEADO
const usuarioLogueado =
    JSON.parse(localStorage.getItem("usuarioLogueado")) || false;
if (usuarioLogueado) {
    btnIniciarSesion.classList.add("d-none");
    btnRegistrarse.classList.add("d-none");
    btnCerrarSesion.classList.remove("d-none");
    document.getElementById("barraBusqueda").removeAttribute("disabled", "");
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
            <p class="card-text" style="font-size:12px;">Titulo: <b>${tituloCancion}</b><br>Artista: ${artistaCancion}
            <br>Género: ${categoriaCancion}<br>Duración: ${duracionCancion}</p>
            <div>
                <button class="btn btn-success" onclick="reproducirCancion()"><i class="bi bi-play-circle"></i></button>
                <button class="btn btn-dark" onclick="verDetalle()" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-eye"></i></button>
                <button class="btn btn-warning" onclick="agregarCancionPlaylist()"><i class="bi bi-plus-square"></i></button>
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
            <img src="${cancion.imagenCancion}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title" style="font-size:16px;">${cancion.nombreCancion}</h5>
            <hr>
            <p class="card-text" style="font-size:12px;">Titulo: <b>${cancion.tituloCancion}</b><br>Artista: ${cancion.artistaCancion}
            <br>Género: ${cancion.categoriaCancion}<br>Duración: ${cancion.duracionCancion}</p>
            <div>
                <button class="btn btn-success" onclick="reproducirCancion()><i class="bi bi-play-circle"></i></button>
                <button class="btn btn-dark" onclick="verDetalle()" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-eye"></i></button>
                <button class="btn btn-warning" onclick="agregarCancionPlaylist()"><i class="bi bi-plus-square"></i></button>
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

function reproducirCancion() {
    verificarLogueo("Registrate para escuchar tus canciones favoritas!");
}

function verDetalle() {
    verificarLogueo("Registrate para usar esta funcionalidad!");
    const contentDiv = document.getElementById("modalCancion");
    contentDiv.innerHTML = `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    `;

}

function agregarCancionPlaylist() {
    verificarLogueo("Registrate para crear una playlist!");
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
