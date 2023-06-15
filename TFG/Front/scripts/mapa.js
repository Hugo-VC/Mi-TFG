// Mostrar el mapa del footer
function initMap() {
    const LATITUD = 40.59435;
    const LONGITUD = -3.24072;

    var mapa = L.map('mapa').setView([LATITUD, LONGITUD], 13);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; SetSolution contributors',
        maxZoom: 18
    }).addTo(mapa);
  
    var marker = L.marker([LATITUD, LONGITUD]).addTo(mapa);
  }


// Espera a que se cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa el mapa cuando se cargue el DOM
    initMap();
});
  