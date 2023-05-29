const adminLogueado = JSON.parse(localStorage.getItem('adminLogueado')) || false;
const listaUsuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const btnUsuarios = document.getElementById('botonUsuarios');

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