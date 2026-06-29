const listaContactos = document.getElementById("listaContactos")
const btnAgregar = document.getElementById("btnAgregar")
const txtBuscar = document.getElementById("txtBuscar")

verificarSesion()

function mostrarContactos() {
  const usuarioActual = obtenerUsuarioActual()

  listaContactos.innerHTML = ""

  if(usuarioActual.contactos.lenght === 0) {
    listaContactos.innerHTML = `
      <div class="text-center text-muted py-5">
        <i class="bi bi-people fs-1"></i>
        <p class="mt-3">Todavía no tienes contactos.</p>
      </div>
    `

    return
  }

  usuarioActual.contactos.forEach(contacto => {
    const usuario = obtenerUsuarioPorId(contacto.id)
    if(usuario) {
      listaContactos.appendChild(crearCardContacto(usuario))
    }
  })
}

function crearCardContacto(usuario) {
  const card = document.createElement("div")
  card.className = "d-flex align-items-center border-bottom py-3"
  card.style.cursor = "pointer"
  card.innerHTML =`
      <img
        src="../assets/img/perfil.jpg"
        class="rounded-circle me-3"
        width="55"
        height="55">

      <div class="flex-grow-1">
        <h6 class="fw-semibold mb-1">${usuario.usuario}</h6>
        <small class="text-secondary">${usuario.usuario}</small>
      </div>

      <i class="bi bi-chevron-right text-secondary"></i>
    `
  return card
}

function agregarNuevoContacto() {
  const nombre = txtBuscar.value.trim()

  if(!nombre) {
    mostrarAlerta("Ingresa un nombre de usuario.", "warning")
    return
  }

  const usuarioActual = obtenerUsuarioActual()

  const resultado = agregarContacto(usuarioActual, nombre)
  mostrarAlerta(resultado.mensaje, resultado.ok ? "success" : "danger")

  if(resultado.ok) {
    txtBuscar.value = ""
    mostrarContactos()
  }
}

btnAgregar.addEventListener("click", agregarNuevoContacto)

mostrarContactos()
