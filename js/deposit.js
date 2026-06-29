verificarSesion()

const txtMonto = document.getElementById("txtMonto")
const txtDescripcion = document.getElementById("txtDescripcion")
const btnDepositar = document.getElementById("btnDepositar")

btnDepositar.addEventListener("click", realizarDeposito)

function realizarDeposito() {
  const usuario = obtenerUsuarioActual()
  const monto = Number(txtMonto.value)

  validarMonto(monto)
  
  actualizarSaldo(usuario, monto, "deposito")
  
  const movimiento = {
    id: Date.now(),
    tipo: "deposito",
    monto: monto,
    descripcion: txtDescripcion.value.trim(),
    fecha: new Date().toISOString()
  }
  registrarMovimiento(usuario, movimiento)
  
  mostrarAlerta("Depósito realizado correctamente.", "success")
  setTimeout(() => {
    window.location.href = "home.html"
  }, 1200)
}

function validarMonto(monto) {
  if(isNaN(monto)) {
    mostrarAlerta("Ingrese un monto válido.", "danger")
    return false
  }
  
  if(monto <= 0) {
    mostrarAlerta("El monto debe ser mayor que cero.", "danger")
    return false
  }
  return true
}
