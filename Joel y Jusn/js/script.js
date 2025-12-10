const configuracionPreguntas = {
  pregunta1: { respuesta: "respuesta2", blur: 6, siguiente: "div_p2", mensaje: "mensajeRespuesta1" },
  pregunta2: { respuesta: "respuesta8", blur: 3, siguiente: "div_p3", mensaje: "mensajeRespuesta2" },
  pregunta3: { respuesta: "respuesta11", blur: 0, siguiente: "div_continuar", mensaje: "mensajeRespuesta3" },
  pregunta4: { respuesta: "resp_prin2", blur: 6, siguiente: "div_p2", mensaje: "mensajeRespuesta1" },
  pregunta5: { respuesta: "resp_prin5", blur: 3, siguiente: "div_p3", mensaje: "mensajeRespuesta2" },
  pregunta6: { respuesta: "resp_prin11", blur: 0, siguiente: "div_continuar", mensaje: "mensajeRespuesta3" },
  pregunta7: { respuesta: "resp_postre3", blur: 5, siguiente: "div_p2", mensaje: "mensajeRespuesta1" },
  pregunta8: { respuesta: "resp_postre8", blur: 0, siguiente: "div_continuar", mensaje: "mensajeRespuesta2" },
  pregunta9: { respuesta: "resp_bebida4", blur: 9, siguiente: "div_p2", mensaje: "mensajeRespuesta1" },
  pregunta10: { respuesta: "resp_bebida7", blur: 6, siguiente: "div_p3", mensaje: "mensajeRespuesta2" },
  pregunta11: { respuesta: "resp_bebida10", blur: 3, siguiente: "div_p4", mensaje: "mensajeRespuesta3" },
  pregunta12: { respuesta: "resp_bebida13", blur: 0, siguiente: "div_continuar", mensaje: "mensajeRespuesta4" },
};

function obtenerImagenId() {
  const pagina = window.location.pathname.split("/").pop();
  const mapaImagenes = {
    "entrantes.html": "img_entrantes",
    "principales.html": "img_principales",
    "postres.html": "img_postres",
    "bebidas.html": "img_bebidas",
  };
  return mapaImagenes[pagina] || null;
}

function verificarRespuesta(pregunta) {
  const config = configuracionPreguntas[pregunta];
  if (!config) return;

  const divActual = document.querySelector('div[id^="div_p"]:not([style*="display: none"])');
  const opciones = divActual.querySelectorAll('input[type="radio"]');
  let seleccionada = null;
  
  opciones.forEach(op => {
    if (op.checked) seleccionada = op.value;
  });

  const divMensaje = document.getElementById(config.mensaje);
  
  if (seleccionada === null) {
    divMensaje.innerText = "🎅 Por favor, selecciona una respuesta antes de continuar";
    divMensaje.style.color = "orange";
    divMensaje.style.display = "block";
    return;
  }

  if (seleccionada === config.respuesta) {
    divMensaje.innerText = "🎉 ¡Respuesta correcta! 🎄";
    divMensaje.style.color = "green";
    divMensaje.style.display = "block";

    const imgId = obtenerImagenId();
    if (imgId) {
      const img = document.getElementById(imgId);
      img.style.filter = `blur(${config.blur}px)`;
    }

    setTimeout(() => {
      divActual.style.display = "none";
      
      const siguienteDiv = document.getElementById(config.siguiente);
      if (siguienteDiv) {
        siguienteDiv.style.display = "block";
        
        // Limpiar selecciones visuales del siguiente div
        const siguientesCards = siguienteDiv.querySelectorAll('.option-card');
        siguientesCards.forEach(card => card.classList.remove('selected'));
      }
    }, 800);
  } else {
    divMensaje.innerText = "❌ Respuesta incorrecta. ¡Inténtalo de nuevo! 🎅";
    divMensaje.style.color = "red";
    divMensaje.style.display = "block";
    
    // Limpiar la selección después de 1.5 segundos
    setTimeout(() => {
      opciones.forEach(op => op.checked = false);
      const cards = divActual.querySelectorAll('.option-card');
      cards.forEach(card => card.classList.remove('selected'));
      divMensaje.style.display = "none";
    }, 1500);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const optionCards = document.querySelectorAll('.option-card');
  optionCards.forEach(card => {
    card.addEventListener('click', function() {
      // Solo quitar selección de las tarjetas del mismo formulario
      const form = this.closest('form');
      const cardsEnFormulario = form.querySelectorAll('.option-card');
      cardsEnFormulario.forEach(c => c.classList.remove('selected'));
      
      this.classList.add('selected');
      const radio = this.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
      }
    });
  });
});