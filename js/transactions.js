const listaMovimientos = document.getElementById("listaMovimientos")

verificarSesion()

function mostrarMovimientos() {
  const usuario = obtenerUsuarioActual()
  const movimientos = usuario.movimientos

  if(movimientos.length === 0) {
    mostrarAlerta("Todavía no existen movimientos.", "warning")
    return
  }

  const movimientosOrdenados = [...movimientos].sort((a,b) => new Date(b.fecha) - new Date(a.fecha))

  movimientosOrdenados.forEach(movimiento => {
    listaMovimientos.appendChild(crearCardMovimiento(movimiento))
  })
}

function crearCardMovimiento(movimiento) {
  const card = document.createElement("div")

    card.className = "card shadow-sm mb-3"
    const { color, icono, signo, titulo } = obtenerEstiloMovimiento(movimiento.tipo)

    card.innerHTML =
    `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-1"><i class="bi ${icono} me-2"></i>${titulo}</h5>
          <p class="mb-1">${movimiento.descripcion || "Sin descripción"}</p>
          <small class="text-muted">${formatearFecha(movimiento.fecha)}</small>
        </div>
        <div class="text-end">
          <span class="fw-bold fs-5 text-${color}">${signo}${formatearMoneda(movimiento.monto)}</span>
        </div>
      </div>
    </div>
    `
    return card
}

function obtenerEstiloMovimiento(tipo) {
  switch(tipo) {
    case TIPOS_MOVIMIENTO.DEPOSITO:
      return {
        color: "success",
        icono: "bi-arrow-down-circle-fill",
        signo: "+",
        titulo: "Depósito"
      }

    case TIPOS_MOVIMIENTO.RETIRO:
      return {
        color: "danger",
        icono: "bi-arrow-up-circle-fill",
        signo: "-",
        titulo: "Retiro"
      }
    
    case TIPOS_MOVIMIENTO.TRANSFERENCIA_ENVIADA:
      return {
        color: "danger",
        icono: "bi-send-fill",
        signo: "-",
        titulo: "Transferencia enviada"
      }
    
    case TIPOS_MOVIMIENTO.TRANSFERENCIA_RECIBIDA:
      return {
        color: "success",
        icono: "bi-wallet2",
        signo: "+",
        titulo: "Transferencia recibida"
      }
    
    default:
      return {
        color: "secondary",
        icono: "bi-clok-history",
        signo: "",
        titulo: tipo
      }
  }
}

mostrarMovimientos()
