// Capturar el evento click del botón de alquiler
document.getElementById("boton_alquiler").addEventListener("click", function() {
    // Redirigir a productos.html con el parámetro "tipo=alquiler" en la URL
    window.location.href = "../productos/productos-page.html?filtro=alquilar";
});

// Capturar el evento click del botón de compra
document.getElementById("boton_compra").addEventListener("click", function() {
    // Redirigir a productos.html con el parámetro "tipo=compra" en la URL
    window.location.href = "../productos/productos-page.html?filtro=comprar";
});