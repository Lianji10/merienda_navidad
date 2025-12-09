// Configuración de preguntas y respuestas
const configuracionPreguntas = {
    pregunta1: { respuesta: "respuesta2", blur: 6, siguiente: "div_p2" },
    pregunta2: { respuesta: "respuesta8", blur: 3, siguiente: "div_p3" },
    pregunta3: { respuesta: "respuesta11", blur: 0, siguiente: "div_continuar" },
    pregunta4: { respuesta: "resp_prin2", blur: 6, siguiente: "div_p2" },
    pregunta5: { respuesta: "resp_prin5", blur: 3, siguiente: "div_p3" },
    pregunta6: { respuesta: "resp_prin11", blur: 0, siguiente: "div_continuar" },
    pregunta7: { respuesta: "resp_postre3", blur: 5, siguiente: "div_p2" },
    pregunta8: { respuesta: "resp_postre8", blur: 0, siguiente: "div_continuar" },
    pregunta9: { respuesta: "resp_bebida4", blur: 9, siguiente: "div_p2" },
    pregunta10: { respuesta: "resp_bebida7", blur: 6, siguiente: "div_p3" },
    pregunta11: { respuesta: "resp_bebida10", blur: 3, siguiente: "div_p4" },
    pregunta12: { respuesta: "resp_bebida13", blur: 0, siguiente: "div_continuar" }
};

// Determinar qué imagen corresponde según la página
function obtenerImagenId() {
    const pagina = window.location.pathname.split('/').pop();
    const mapaImagenes = {
        'entrantes.html': 'img_entrantes',
        'principales.html': 'img_principales',
        'postres.html': 'img_postres',
        'bebidas.html': 'img_bebidas'
    };
    return mapaImagenes[pagina] || null;
}

// Función para actualizar la barra de progreso
function actualizarProgreso(preguntaActual, totalPreguntas) {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progreso = (preguntaActual / totalPreguntas) * 100;
        progressBar.style.width = progreso + '%';
    }
}

// Función para obtener el número de pregunta actual
function obtenerNumeroPregunta(preguntaId) {
    const numeros = {
        'pregunta1': 1, 'pregunta2': 2, 'pregunta3': 3,
        'pregunta4': 1, 'pregunta5': 2, 'pregunta6': 3,
        'pregunta7': 1, 'pregunta8': 2,
        'pregunta9': 1, 'pregunta10': 2, 'pregunta11': 3, 'pregunta12': 4
    };
    return numeros[preguntaId] || 1;
}

// Función para obtener el total de preguntas según la página
function obtenerTotalPreguntas() {
    const pagina = window.location.pathname.split('/').pop();
    const totales = {
        'entrantes.html': 3,
        'principales.html': 3,
        'postres.html': 2,
        'bebidas.html': 4
    };
    return totales[pagina] || 3;
}

// Función principal para verificar respuesta
function verificarRespuesta(pregunta) {

    // Buscar SOLO los radios dentro del div visible
    const divActual = document.querySelector('div[id^="div_p"]:not([style*="display: none"])');

    const opciones = divActual.querySelectorAll('input[type="radio"]');
    let seleccionada = null;

    opciones.forEach(op => {
        if (op.checked) seleccionada = op.value;
    });

    if (seleccionada === null) {
        alert("🎅 Por favor, selecciona una respuesta antes de continuar");
        return;
    }

    const config = configuracionPreguntas[pregunta];
    if (!config) return;

    if (seleccionada === config.respuesta) {
        alert("🎉 ¡Respuesta correcta! 🎄");

        const imgId = obtenerImagenId();
        if (imgId) {
            const img = document.getElementById(imgId);
            img.style.filter = `blur(${config.blur}px)`;
        }

        // Ocultar actual
        divActual.style.display = "none";

        // Mostrar siguiente
        document.getElementById(config.siguiente).style.display = "block";

        // Progreso
        actualizarProgreso(obtenerNumeroPregunta(pregunta), obtenerTotalPreguntas());

    } else {
        alert("❌ Respuesta incorrecta. ¡Inténtalo de nuevo! 🎅");
    }
}

// Agregar evento click a las tarjetas de opciones cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Agregar evento click a todas las tarjetas de opciones
    const optionCards = document.querySelectorAll('.option-card');
    
    optionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remover clase 'selected' de todas las tarjetas
            optionCards.forEach(c => c.classList.remove('selected'));
            
            // Agregar clase 'selected' a la tarjeta clickeada
            this.classList.add('selected');
            
            // Marcar el radio button
            const radio = this.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
});