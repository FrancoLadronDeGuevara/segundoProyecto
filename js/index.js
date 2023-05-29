const objArtistas = [
    {
        id: Date.now(),
        nombre: 'Shakira',
        categoria: 'Pop Latino',
        imagenAlbum: '',
        canciones: {
            cancionUno: {
                nombreCancion: 'Monotonia',
                duracion: '2:28',
                anio: 2022
            },
            cancionDos: {
                nombreCancion: 'Acróstico',
                duracion: '2:50',
                anio: 2023
            },
            cancionTres: {
                nombreCancion: 'Te felicito',
                duracion: '2:52',
                anio: 2022
            }
        }
    }
]

const btnCardArtistas = document.querySelectorAll('.btnCardArtistas');
const btnAdmin = document.getElementById('btnAdmin');
const btnIniciarSesion = document.getElementById('btnIniciarSesion');
const btnRegistrarse = document.getElementById('btnRegistrarse');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');

//LOCALSTORAGE

//VERIFICAR ADMIN LOGUEADO
const adminLogueado = JSON.parse(localStorage.getItem('adminLogueado')) || false;
if (adminLogueado) {
    btnIniciarSesion.classList.add('d-none');
    btnRegistrarse.classList.add('d-none');
    btnAdmin.classList.remove('d-none');
    btnCerrarSesion.classList.remove('d-none');
}
//VERIFICAR USUARIO LOGUEADO
const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado')) || false;
if (usuarioLogueado) {
    btnIniciarSesion.classList.add('d-none');
    btnRegistrarse.classList.add('d-none');
    btnCerrarSesion.classList.remove('d-none');

}
//FUNCION DEL BOTON CERRAR SESION
btnCerrarSesion.addEventListener('click', () => {
    Swal.fire({
        title: '¿Cerrar Sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cerrar sesión!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Cerrando sesión...',
                toast: true,
                position: 'top',
                timer: 2000,
                showConfirmButton: false
            })
            localStorage.removeItem('adminLogueado');
            localStorage.removeItem('usuarioLogueado');
            let interval = setInterval(() => {
                window.location.href = '../index.html'
            }, 2000)
        }
    })
})

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

document.addEventListener("DOMContentLoaded", function () {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});
//FIN ANIMACION LETRAS TITULO SOUNDSTREAM

//FUNCIONALIDAD CARDS ARTISTAS
btnCardArtistas.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        document.querySelector('.mostrarCard').innerHTML = `
        <div class="modal fade" id="modalCardArtista" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                    <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/68E8A1tkQcOdRwnRcIvxOP?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
        `
    })
});