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

function registrarMovimiento(usuario, movimiento) {
  usuario.movimientos.push(movimiento)
  guardarUsuario(usuario)
}

function actualizarSaldo(usuario, monto, tipo) {
  switch(tipo) {
    case "deposito":
      usuario.saldo += monto
      usuario.ingresos += monto
      break

    case "retiro":
      usuario.saldo -= monto
      usuario.egresos += monto
      break
  }
}

function verificarSesion() {
  const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    if (!usuarioLogueado) {
      window.location.href = "login.html";
    }
}

function obtenerUsuarioPorId(id) {
  const usuarios = obtenerUsuarios()
  return usuarios.find(u => u.id === id)
}

function obtenerUsuarioPorNombre(nombre) {
  const usuarios = obtenerUsuarios()
  return usuarios.find(u => u.usuario.toLowerCase() === nombre.toLowerCase())
}

function existeContacto(usuario, idContacto) {
  const contactos = usuario.contactos
  return contactos.some(c => c.id === idContacto)
}

function agregarContacto(usuarioActual, nombreUsuario) {
  const contacto = obtenerUsuarioPorNombre(nombreUsuario)

  if(!contacto) {
    return {
      ok: false,
      mensaje: "El usuario no existe."
    }
  }

  if(contacto.id === usuarioActual.id) {
    return {
      ok: false,
      mensaje: "No puedes agregarte como contacto a ti mismo."
    }
  }

  if(existeContacto(usuarioActual, contacto.id)) {
    return {
      ok: false,
      mensaje: "Ese usuario ya está en tus contactos."
    }
  }

  usuarioActual.contactos.push({
    id: contacto.id,
    favorito: false
  })

  guardarUsuario(usuarioActual)
  return {
    ok: true,
    mensaje: "Contacto agregado correctamente."
  }
}
