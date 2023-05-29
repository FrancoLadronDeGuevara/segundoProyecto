const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e)=>{
  e.preventDefault();

  const email = document.getElementById('correo').value;
  const password = document.getElementById('password').value;

  if(email === "admin@soundstream.com" && password === "administradorSS"){
    localStorage.setItem('adminLogueado', true);
    Swal.fire({
      icon: 'success',
      text: `Bienvenido`,
      showConfirmButton: false
    })
    let interval = setInterval(()=>{
      window.location.href= '../index.html'
    },2000)
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('listaUsuarios')) || [];

  const usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.password === password);

  if(!usuarioValido){
    Swal.fire({
      icon: 'error',
      text: 'El usuario ingresado no es valido',
      timer: 2000,
      toast: true,
      position: 'top',
      showConfirmButton: false,
      showClass: {
        popup: 'animate__bounceIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutDown'
      }
    })
    return;
  }

  localStorage.setItem('usuarioLogueado', JSON.stringify('usuarioValido'));
  Swal.fire({
    icon: 'success',
    text: `Bienvenido`,
    showConfirmButton: false
  })
  let interval = setInterval(()=>{
    window.location.href= '../index.html'
  },2000)
})


