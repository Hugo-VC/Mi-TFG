const container = document.getElementById('productos-container');
const campoBuscar = document.getElementById('campo_buscar');
const filtroCategoria = document.getElementById('filtro_categoria');
const botonBuscar = document.getElementById('boton_buscar');
const itemsPorPagina = 6; // Número de elementos por página
let paginaActual = 1; // Página actual


// Asignar evento al botón de búsqueda
botonBuscar.addEventListener('click', function() {
    realizarBusqueda();
});


function realizarBusqueda() {
    const busqueda = campoBuscar.value.toLowerCase();
    const categoria = filtroCategoria.value.toLowerCase();

    console.log('categoria: ', categoria)

    if (busqueda.trim() === '' && categoria === '') {
        obtenerProductos();
    } else {
        busquedaProductos(busqueda, categoria);
    }
}


function obtenerProductos() {
    // Obtener los datos de los productos mediante una petición AJAX
    fetch('../../../BackEnd/gestion/obtenerProductos.php')
      .then((response) => response.json()) // Convertir la respuesta a JSON
      .then((productos) => {
        console.log('productos: ', productos)
        mostrarProductos(productos, 1);
        generarPaginacion(productos, 1);
      })
      .catch((error) => console.error(error));
}
  

function busquedaProductos(busqueda, categoria) {
  // Obtener los datos de los productos mediante una petición AJAX
  fetch('../../../BackEnd/gestion/obtenerProductos.php')
      .then(response => response.json()) // Convertir la respuesta a JSON
      .then(productos => {
          // Filtrar los productos que coinciden con la búsqueda y categoría
          const productosFiltrados = productos.filter(producto => {
              const nombre = producto.nombre.toLowerCase();
              const descripcion = producto.descripcion.toLowerCase();
              const categoriaProducto = producto.categoria.toLowerCase();

              return (
                  (busqueda === '' || nombre.includes(busqueda) || descripcion.includes(busqueda)) &&
                  (categoria === '' || categoriaProducto === categoria.toLowerCase())
              );
          });

          mostrarProductos(productosFiltrados, 1);
          generarPaginacion(productosFiltrados, 1);
      })
      .catch(error => console.error(error));
}



function mostrarProductos(productos, pagina) {
  paginaActual = pagina; // Actualizar la página actual

  const startIndex = (pagina - 1) * itemsPorPagina;
  const endIndex = startIndex + itemsPorPagina;
  const productosPagina = productos.slice(startIndex, endIndex);

  container.innerHTML = '';

  if (productosPagina.length === 0) {
    const mensaje = document.createElement('p');
    mensaje.className = 'text-center mt-5';
    mensaje.textContent = 'No se encontraron productos que coincidan con la búsqueda.';
    container.appendChild(mensaje);
  } else {
    productosPagina.forEach((producto) => {
      const card = document.createElement('div');
      card.className = 'col-lg-3 col-md-4 col-sm-6 m-5';

      const enlace = document.createElement('a');
      enlace.href = '../detalles-producto/detalles-producto.html?id=' + producto.id; // Reemplaza 'detalle-producto.html' con la ruta correcta de la página de detalles

      const contenidoProducto = `
          <div class="card" style="width: 18rem;">
              <img class="card-img-top" src="../../img/Productos/${producto.imagen}" alt="Card image cap">
              <div class="card-body">
                  <h5 class="card-title text-center">${producto.nombre}</h5>
                  <p class="card-text">${producto.descripcion}</p>
                  <div class="container mt-4">
                      <div class="row">
                          <div class="col-6">
                              <p class="text-center text-success border border-success rounded">Alquiler</p>
                              <p class="${producto.precio_alquiler !== null ? 'precio' : 'precio-no-disponible text-danger'} card-text text-center">${producto.precio_alquiler !== null ? producto.precio_alquiler + ' € / día' : 'No disponible'}</p>
                          </div>
                          <div class="col-6">
                              <p class="text-center text-danger border border-danger rounded">Compra</p>
                              <p class="${producto.precio_compra !== null ? 'precio' : 'precio-no-disponible text-danger'} card-text text-center">${producto.precio_compra !== null ? producto.precio_compra + ' €' : 'No disponible'}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;


      enlace.innerHTML = contenidoProducto;
      card.appendChild(enlace);
      container.appendChild(card);
    });
  }

  // Generar la paginación
  generarPaginacion(productos, pagina);
}

  
  

function generarPaginacion(productos, pagina) {
    const totalPaginas = Math.ceil(productos.length / itemsPorPagina);
  
    const paginacionContainer = document.querySelector('.pagination');
    paginacionContainer.innerHTML = '';
  
    // Botón "Anterior"
    const botonAnterior = document.createElement('li');
    botonAnterior.classList.add('page-item');
    botonAnterior.innerHTML = `
      <a class="page-link" href="#" tabindex="-1">Anterior</a>
    `;
  
    if (pagina === 1) {
      botonAnterior.classList.add('disabled');
    } else {
      botonAnterior.addEventListener('click', () => {
        mostrarProductos(productos, pagina - 1);
      });
    }
  
    paginacionContainer.appendChild(botonAnterior);
  
    // Números de página
    for (let i = 1; i <= totalPaginas; i++) {
      const botonPagina = document.createElement('li');
      botonPagina.classList.add('page-item');
      botonPagina.innerHTML = `
        <a class="page-link" href="#">${i}</a>
      `;
  
      if (i === pagina) {
        botonPagina.classList.add('active');
      } else {
        botonPagina.addEventListener('click', () => {
          mostrarProductos(productos, i);
        });
      }
  
      paginacionContainer.appendChild(botonPagina);
    }
  
    // Botón "Siguiente"
    const botonSiguiente = document.createElement('li');
    botonSiguiente.classList.add('page-item');
    botonSiguiente.innerHTML = `
      <a class="page-link" href="#">Siguiente</a>
    `;
  
    if (pagina === totalPaginas) {
      botonSiguiente.classList.add('disabled');
    } else {
      botonSiguiente.addEventListener('click', () => {
        mostrarProductos(productos, pagina + 1);
      });
    }
  
    paginacionContainer.appendChild(botonSiguiente);
}



function generarProductos(filtro) {
  // Obtener los datos de los productos mediante una petición AJAX
  fetch('../../../BackEnd/gestion/obtenerProductos.php')
  .then(response => response.json()) // Convertir la respuesta a JSON
  .then(productos => {
    const productosComprar = [];
    const productosAlquilar = []; // Crear un array vacío para almacenar los productos a alquilar
    productos.forEach(producto => {
      if (producto.precio_compra != null){
        productosComprar.push(producto);
      }
      if(producto.precio_alquiler != null){
        productosAlquilar.push(producto);
      }
    });
    console.log('comprar: ', productosComprar);
    console.log('alquilar: ', productosAlquilar);

    if (filtro == 'comprar'){
      mostrarProductos(productosComprar, 1);
    }
    else if(filtro == 'alquilar'){
      mostrarProductos(productosAlquilar, 1);
    }
    else{
      obtenerProductos();
    }

    // Aquí puedes hacer lo que necesites con los arrays de productos a comprar y alquilar
    // Por ejemplo, mostrarlos en tu página web o realizar alguna otra operación

  })
  .catch(error => console.error(error));
}




  
// Obtener el parámetro "filtro" de la URL
const urlParams = new URLSearchParams(window.location.search);
const filtro = urlParams.get('filtro');

generarProductos(filtro);

