// Array de textos informativos
var textos = [
    "¡ Web actualizada a diario !",
    "¡ Productos actualizados !",
    "¡ Ofertas especiales disponibles !"
];

var index = 0;
var span1 = document.getElementById("texto-informativo-1");
var span2 = document.getElementById("texto-informativo-2");

// Función para cambiar los textos
function cambiarTexto() {
    span1.textContent = textos[index];
    index = (index + 1) % textos.length; // Cambiar al siguiente texto
    span2.textContent = textos[index];
}

// Llamada inicial para cambiar el texto
cambiarTexto();

// Intervalo de tiempo para cambiar los textos cada 8 segundos (8000 ms)
setInterval(cambiarTexto, 8000);