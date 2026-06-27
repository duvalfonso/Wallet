const loginForm = document.getElementById('login-form')
const registerForm = document.getElementById('register-form')

function registrarUsuario(usuario, password) {
  const usuarios = obtenerUsuarios()

  const existe = usuarios.find(u => u.usuario === usuario)
  if(existe) {
    alert('El usuario ya está registrado.')

    return false;
  }

  const nuevoUsuario = {
    id: Date.now(),
    usuario,
    password,
    saldo: 0,
    ingresos: 0,
    egresos: 0,
    movimientos: [],
    contactos: []
  }

  usuarios.push(nuevoUsuario)
  guardarUsuarios(usuarios)
  mostrarAlerta("Usuario registrado con éxito. Redirigiendo al login ...")

  window.location.href = 'login.html'
  return true
}

function login(usuario, password) {
  const usuarios = obtenerUsuarios()
  const usuarioValido = usuarios.find(u => u.usuario === usuario && u.password === password)

  if(usuarioValido) {
    localStorage.setItem('usuarioLogueado', usuarioValido.id)
    mostrarAlerta("Inicio de sesión exitoso. Redireccionando ...", "success")
    window.location.href = '../pages/home.html'
  } else {
    mostrarAlerta("Usuario o contraseña incorrectos", "danger")
  }
}

if(registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const usuario = document.getElementById('inputUsuario').value.trim()
    const password = document.getElementById('inputPassword').value.trim()
    const confirmPassword = document.getElementById('inputConfirmPassword').value.trim()

    if(!usuario || !password || !confirmPassword) {
      mostrarAlerta("Por favor completa todos los campos", "warning")
      return
    }

    if(password !== confirmPassword) {
      mostrarAlerta("Datos incorrectos, por favor verifiquar.", "danger")
      return
    }

    registrarUsuario(usuario, password)
  })
}

if(loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const usuario = document.getElementById('inputUsuario').value.trim()
    const password = document.getElementById('inputPassword').value.trim()

    if(!usuario || !password) {
      mostrarAlerta("Por favor completa los campos", "warning")
      return
    }

    login(usuario, password)
  })
}
