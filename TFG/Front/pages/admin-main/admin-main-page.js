// Capturar el evento click del botón de alquiler
document.getElementById("boton_ver_clientes").addEventListener("click", function() {
    // Redirigir a productos.html con el parámetro "tipo=alquiler" en la URL
    window.location.href = "../ver-clientes/ver-clientes-page.html";
});

// Capturar el evento click del botón de compra
document.getElementById("boton_ver_pedidos").addEventListener("click", function() {
    // Redirigir a productos.html con el parámetro "tipo=compra" en la URL
    window.location.href = "../ver-pedidos/ver-pedidos-page.html";
});