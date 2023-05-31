const adminLogueado = JSON.parse(localStorage.getItem('adminLogueado')) || false;
const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
const listaCanciones = JSON.parse(localStorage.getItem('listaCanciones')) || [];
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const btnUsuarios = document.getElementById('botonUsuarios');
const btnCanciones = document.getElementById('botonCanciones');
const btnGenerarId = document.getElementById('generarIdCancion');
const formCancion = document.getElementById('formCancion');

if(!adminLogueado){
    Swal.fire({
        icon: 'error',
        text: 'Debes loguearte para administrar la pagina',
        showConfirmButton: false
    })
    let interval = setInterval(()=>{
        window.location.href='../index.html'
    },2000)
}

btnCerrarSesion.addEventListener('click', () => {
    Swal.fire({
        title: '¿Cerrar Sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Cerrando sesión...',
                toast: true,
                position: 'top',
                timer: 2000,
                showConfirmButton: false
            })
            localStorage.removeItem('adminLogueado');
            let interval = setInterval(() => {
                window.location.href = '../index.html'
            }, 2000)
        }
    })
})

btnUsuarios.addEventListener("click", ()=>{
    document.querySelector('.containerUsuarios').classList.remove('d-none');
    document.querySelector('.containerCanciones').classList.add('d-none');
    verListaUsuarios();
})

function verListaUsuarios(){
    if(listaUsuarios.length == 0){
        Swal.fire({
            icon: 'error',
            text: 'No hay usuarios registrados',
            timer: 1000,
            toast: true,
            position: 'center',
            showConfirmButton: false,
            showClass: {
                popup: 'animate__animated animate__zoomIn'
            },
            hideClass: {
                popup: 'animate__animated animate__zoomOut'
            }
        })
        let interval = setInterval(() => {
            window.location.href = '../html/admin.html';
        }, 1000)
    }
    let dataFila = '';
    if(listaUsuarios.length > 0){
        for (const i in listaUsuarios) {
            let usuario = listaUsuarios[i];
            dataFila += '<tr>';
            dataFila += `<td>${usuario.nombre}</td>`
            dataFila += `<td>${usuario.email}</td>`
            dataFila += `<td>${usuario.password}</td>`
            dataFila += `<td><button class="btn btn-danger" onclick="eliminarUsuario(${i})"><i class="bi bi-trash"></i></button></td>`
            dataFila += '</tr>'
        }

        document.getElementById('dataUsuarios').innerHTML = dataFila;
    }
}

function eliminarUsuario(usuario){
    Swal.fire({
        title: '¿Eliminar Usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Eliminando usuario...',
                toast: true,
                position: 'center',
                timer: 2000,
                showConfirmButton: false
            })
            listaUsuarios.splice(usuario, 1);
            localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
            let interval = setInterval(() => {
                verListaUsuarios();
            }, 2000)
        }
    })
}

btnCanciones.addEventListener("click", ()=>{
    document.querySelector('.containerUsuarios').classList.add('d-none')
    document.querySelector('.containerCanciones').classList.remove('d-none');
    verListaCanciones();
})

class Cancion {
    constructor(idCancion, tituloCancion, artistaCancion, categoriaCancion, imagenCancion, duracionCancion, nombreCancion, archivoCancion) {
        this.idCancion = idCancion;
        this.tituloCancion = tituloCancion;
        this.artistaCancion = artistaCancion;
        this.categoriaCancion = categoriaCancion;
        this.imagenCancion = imagenCancion;
        this.duracionCancion = duracionCancion;
        this.nombreCancion = nombreCancion;
        this.archivoCancion = archivoCancion;
    }
}

let canciones = [
    new Cancion('3215865168', "Monotonía", "Shakira", "Pop", "../assets/album/monotonia.jpg", "2:28", "Shakira ft. Ozuna - Monotonía", ''),
    new Cancion('5498472168', 'Besos en Guerra', 'Morat', 'Pop', '../assets/album/balasperdidas.jpg', '2:28', 'Morat ft. Juanes - Besos en guerra', ''),
    new Cancion('5487454187', 'Beso', 'Rosalia', 'Urbano Latino', '../assets/album/rr.jpg', '3:14', 'Rosalia ft. Rauw Alejandro - Beso', ''),
    new Cancion('8795165184', 'Die for you', 'The Weeknd', 'Dance/Electrónica', '../assets/album/starboy.jpg', '4:20', 'The Weeknd - Die for you', ''),
    new Cancion('8751321845', 'La triple T', 'Tini', 'Cumbia, Pop', '../assets/album/cupido.jpeg', '2:47', 'TINI - La Triple T', ''),
    new Cancion('0541950216', 'Efecto', 'BadBunny', 'Urbano Latino', '../assets/album/unveranosinti.jpg', '3:33', 'Bad Bunny - Efecto', ''),
]

function verListaCanciones(){
    let dataFila = '';
    if(listaCanciones.length > 0){
        for (const i in listaCanciones) {
            let cancion = listaCanciones[i];
            dataFila += '<tr>';
            dataFila += `<td>${cancion.idCancion}</td>`
            dataFila += `<td>${cancion.tituloCancion}</td>`
            dataFila += `<td>${cancion.artistaCancion}</td>`
            dataFila += `<td>${cancion.categoriaCancion}</td>`
            dataFila += `<td>${cancion.imagenCancion}</td>`
            dataFila += `<td>${cancion.duracionCancion}</td>`
            dataFila += `<td>${cancion.nombreCancion}</td>`
            dataFila += `<td>${cancion.archivoCancion}</td>`
            dataFila += `<td><button class="btn btn-warning" onclick="editarCancion(${i})"><i class="bi bi-pencil"></i></button></td>`
            dataFila += `<td><button class="btn btn-danger" onclick="eliminarCancion(${i})"><i class="bi bi-trash"></i></button></td>`
            dataFila += '</tr>'
        }

        document.getElementById('dataCanciones').innerHTML = dataFila;
    }
}

function eliminarCancion(cancion){
    Swal.fire({
        title: '¿Eliminar Canción?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'No, cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Eliminando canción...',
                toast: true,
                position: 'center',
                timer: 2000,
                showConfirmButton: false
            })
            listaCanciones.splice(cancion, 1);
            localStorage.setItem('listaCanciones', JSON.stringify(listaCanciones));
            let interval = setInterval(() => {
                verListaCanciones();
            }, 2000)
        }
    })
}

btnGenerarId.addEventListener("click", (e)=>{
    e.preventDefault();
    const id = document.getElementById('inputId').value = Math.floor(Math.random()*10000000000);
})

formCancion.addEventListener("submit", (e)=>{
    e.preventDefault();

    const id = document.getElementById('inputId').value;
	const titulo = document.getElementById('tituloCancion').value;
	const artista = document.getElementById('artistaCancion').value;
    const categoria = document.getElementById('generoCancion').value;
	const imagen = document.getElementById('imagenCancion').files[0].name;
	const minutos = document.getElementById('minutosCancion').value;
    const segundos = document.getElementById('segundosCancion').value;
    const nombre = document.getElementById('nombreCancion').value;
	const archivo = document.getElementById('archivoCancion').files[0].name;

	const canciones = JSON.parse(localStorage.getItem('listaCanciones')) || [];
	const cancionRepetida = canciones.find(cancion => cancion.nombreCancion === nombre && cancion.tituloCancion === titulo);
	if (cancionRepetida) {
		Swal.fire({
			icon: 'error',
			text: 'La canción ya se encuentra en la lista',
			timer: 2000,
			toast: true,
			position: 'top',
			showConfirmButton: false,
			showClass: {
				popup: 'animate__animated animate__fadeInDown'
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutDown'
			}
		})
		return;
	}

    if (id != '' && titulo != '' && artista != '' && categoria != '' && imagen != '' && !isNaN(minutos) && !isNaN(segundos) && nombre != '' && archivo != '') {
		formCancion.reset();

		listaCanciones.push({ idCancion: id, tituloCancion: titulo, artistaCancion: artista, categoriaCancion: categoria, imagenCancion: `../assets/album/${imagen}`, duracionCancion: `${minutos}:${segundos}`, nombreCancion: nombre, archivoCancion: `../assets/musica/${archivo}`});
		localStorage.setItem('listaCanciones', JSON.stringify(listaCanciones));

		Swal.fire({
			icon: 'success',
			title: 'Cancion agregada!',
			showConfirmButton: false,
			allowOutsideClick: false
		})
		let interval = setInterval(() => {
			location.reload();
		}, 2000)

	} else {
		Swal.fire({
			icon: 'error',
			text: 'Por favor, rellena los datos correctamente',
			timer: 800,
			toast: true,
			position: 'bottom',
			showConfirmButton: false,
			showClass: {
				popup: 'animate__animated animate__fadeInUp'
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutUp'
			}
		})
	}
})