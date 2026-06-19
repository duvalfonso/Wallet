const loginForm = document.getElementById('login-form')
const registerForm = document.getElementById('register-form')

function registrarUsuario(usuario, password) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

  const existe = usuarios.find(u => u.usuario === usuario)
  if(existe) {
    alert('El usuario ya está registrado.')
    return false;
  }

  usuarios.push({ usuario, password })
  localStorage.setItem('usuarios', JSON.stringify(usuarios))
  alert('Usuario registrado con éxito. Redirigiendo al login...')

  window.location.href = 'login.html'
  return true
}

function login(usuario, password) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []
  const usuarioValido = usuarios.find(u => u.usuario === usuario && u.password === password)

  if(usuarioValido) {
    localStorage.setItem('usuarioLogueado', JSON.stringify({ usuario }))
    alert('Inicio de sesión existoso')
    window.location.href = 'home.html'
  } else {
    alert('Usuario o contraseña incorrectos.')
  }
}

if(registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const usuario = document.getElementById('inputUsuario').value.trim()
    const password = document.getElementById('inputPassword').value.trim()
    const confirmPassword = document.getElementById('inputConfirmPassword').value.trim()

    if(!usuario || !password || !confirmPassword) {
      alert('Por favor completa los todos campos.')
    }

    if(password !== confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor verifícalas.')
      return
    }

    registrarUsuario(usuario, password)
  })
}

if(loginForm) {
  loginForm.addEventListener('submit', (e) => {
    
  })
}
