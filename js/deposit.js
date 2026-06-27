verificarSesion()

const txtMonto = document.getElementById("txtMonto")
const txtDescripcion = document.getElementById("txtDescripcion")
const btnDepositar = document.getElementById("btnDepositar")

btnDepositar.addEventListener("click", realizarDeposito)

function realizarDeposito() {
  const usuario = obtenerUsuarioActual()
  const monto = Number(txtMonto.value)

  validarMonto(monto)
  
  usuario.saldo += monto
  usuario.ingresos += monto
  
  usuario.movimientos.push({
    tipo: "Depositar",
    monto: monto,
    descripcion: txtDescripcion.value,
    fecha: new Date().toLocaleString()
  })
  
  guardarUsuario(usuario)
  mostrarAlerta("Depósito realizado correctamente.", "success")
  window.location.href = "home.html"
}

function validarMonto(monto) {
  if(isNaN(monto)) {
    mostrarAlerta("Ingrese un monto válido.", "danger")
    return
  }
  
  if(monto <= 0) {
    mostrarAlerta("El monto debe ser mayor que cero.", "danger")
    return
  }
}

function registrarMovimiento() {

}
