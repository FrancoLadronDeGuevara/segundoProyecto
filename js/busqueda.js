const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado')) || false;
const adminLogueado = JSON.parse(localStorage.getItem('adminLogueado')) || false;
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const contenedorCanciones = document.getElementById('contenedorCanciones');
const inputBusqueda = document.getElementById('barraBusqueda');
const btnBusqueda = document.getElementById('btnBusqueda');

if (!usuarioLogueado && !adminLogueado) {
    Swal.fire({
        icon: 'error',
        text: 'Registrate para acceder a la busqueda o a la creación de playlists',
        showConfirmButton: false,
        timer: 2000
    })
    let interval = setInterval(() => {
        window.location.href = '../html/registro.html';
    }, 2000)
}

if (usuarioLogueado) {
    btnCerrarSesion.classList.remove('d-none');
}

if (adminLogueado) {
    btnCerrarSesion.classList.remove('d-none');
    document.getElementById('btnAdmin').classList.remove('d-none')
}

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

const canciones = JSON.parse(localStorage.getItem('listaCanciones'));


canciones.forEach((cancion) => {
    const { idCancion, tituloCancion, artistaCancion, categoriaCancion, imagenCancion, duracionCancion, nombreCancion, archivoCancion} = cancion;

    contenedorCanciones.innerHTML += `
    <div class="card bg-secondary mx-3 mt-2" style="width: 12rem;">
        <img src="${imagenCancion}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${nombreCancion}</h5>
            <hr>
            <p class="card-text">Titulo: <b>${tituloCancion}</b><br>Artista: ${artistaCancion}
            <br>Género: ${categoriaCancion}<br>Duración: ${duracionCancion}</p>
            <div>
                <button class="btn btn-success" onclick="reproducirCancion()"><i class="bi bi-play-circle"></i></button>
                <button class="btn btn-danger" onclick="agregarCancionFav()"><i class="bi bi-heart"></i></button>
                <button class="btn btn-warning" onclick="agregarCancionPlaylist()"><i class="bi bi-plus-square"></i></button>
            </div>
        </div>
    </div>
    `;
})


const filtrar = ()=>{
    contenedorCanciones.innerHTML = '';
    const textoBusqueda = inputBusqueda.value.toLowerCase();
    for(let cancion of canciones){
        let nombre = cancion.nombreCancion.toLowerCase();
        let artista = cancion.artistaCancion.toLowerCase();
        if(nombre.indexOf(textoBusqueda) !== -1 || artista.indexOf(textoBusqueda) !== -1){
            contenedorCanciones.innerHTML += `
            <div class="card bg-secondary mx-3 mt-2" style="width: 12rem;">
            <img src="${cancion.imagenCancion}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${cancion.nombreCancion}</h5>
            <hr>
            <p class="card-text">Titulo: <b>${cancion.tituloCancion}</b><br>Artista: ${cancion.artistaCancion}
            <br>Género: ${cancion.categoriaCancion}<br>Duración: ${cancion.duracionCancion}</p>
            <div>
                <button class="btn btn-success" onclick="reproducirCancion()"><i class="bi bi-play-circle"></i></button>
                <button class="btn btn-danger" onclick="agregarCancionFav()"><i class="bi bi-heart"></i></button>
                <button class="btn btn-warning" onclick="agregarCancionPlaylist()"><i class="bi bi-plus-square"></i></button>
                </div>
                </div>
                </div>
            `
        }
    }
    if(contenedorCanciones.innerHTML === ''){
        contenedorCanciones.innerHTML = '<h3 class="text-white"><i>No se encontraron resultados...</i></h3>'
    }
}

btnBusqueda.addEventListener("click", filtrar);
inputBusqueda.addEventListener("keyup", filtrar);