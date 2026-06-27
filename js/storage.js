function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || []
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios))
}

function obtenerUsuarioActual() {
  const id = Number(localStorage.getItem("usuarioLogueado"))
  const usuarios = obtenerUsuarios()
  return usuarios.find(u => u.id === id)
}

function guardarUsuario(usuarioActualizado) {
  const usuarios = obtenerUsuarios()
  const indice = usuarios.findIndex(u => u.id === usuarioActualizado.id)

  if(indice !== -1) {
    usuarios[indice] = usuarioActualizado
    guardarUsuarios(usuarios)
  }
}

function verificarSesion() {
  const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    if (!usuarioLogueado) {
      window.location.href = "login.html";
    }
}
