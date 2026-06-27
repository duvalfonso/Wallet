const alertContainer = document.getElementById("alertMessage")
const alertText = document.getElementById("alertText")
const btnCloseAlert = document.getElementById("btnCloseAlert")

btnCloseAlert.addEventListener("click", ocultarAlerta)

function mostrarAlerta(mensaje, tipo) {
  alertContainer.className = "alert alert-dismissible fade"
  alertContainer.classList.add(`alert-${tipo}`, "show")
  alertContainer.classList.remove("d-none")

  alertText.textContent = mensaje
}

function ocultarAlerta() {
  alertContainer.classList.remove("show")
  alertContainer.classList.add("d-none")
}

function formatearMoneda(valor) {
  return "$ " + valor.toLocaleString();
}

function obtenerFecha() {
  return new Date().toLocaleString();
}
