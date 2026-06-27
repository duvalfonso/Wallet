const lblSaldo = document.getElementById("lblSaldo")
const lblIngresos = document.getElementById("lblIngresos")
const lblEgresos = document.getElementById("lblEgresos")



function mostrarSaldo(usuario) {
  lblSaldo.textContent = "$ " + usuario.saldo.toLocaleString()
}

function mostrarIngresos(usuario) {
  lblIngresos.textContent = "$ " + usuario.ingresos.toLocaleString()
}

function mostrarEgresos(usuario) {
  lblEgresos.textContent = "$ " + usuario.egresos.toLocaleString()
}

function mostrarContactos(usuario) {

}

function cargarHome() {
  verificarSesion()
  const usuario = obtenerUsuarioActual()
  if(!usuario) {
    alert("No se encontró la información del usuario.")
    localStorage.removeItem("usuarioLogueado")
    window.location.href = "login.html"
    return
  }

  mostrarSaldo(usuario)
  mostrarIngresos(usuario)
  mostrarEgresos(usuario)
  // mostrarContactos(usuario)
}

cargarHome()
