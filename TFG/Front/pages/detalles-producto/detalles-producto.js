// Obtener el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productoId = urlParams.get('id');

// Obtener elementos del DOM
const spanCantidad = document.getElementById('cantidad');
const btnRestar = document.getElementById('restarCantidad');
const btnSumar = document.getElementById('sumarCantidad');


fetch(`../../../BackEnd/gestion/obtenerProductos.php?`)
  .then(response => response.json())
  .then(productos => {
    // Filtrar el arreglo de productos por ID
    const producto = productos.find(p => p.id === productoId);
    console.log(producto);
    // Actualizar los elementos del DOM con los datos del producto
    const imagenProducto = document.getElementById('imagenProducto');
    const imagen = document.createElement('img');
    imagen.src = `../../img/Productos/${producto.imagen}`; // Asignar la URL de la imagen del producto
    imagen.alt = 'Imagen del producto';
    imagen.classList.add("img-fluid");
    imagenProducto.appendChild(imagen);

    document.getElementById('nombreProducto').textContent = producto.nombre;
    document.getElementById('descripcion').textContent = producto.descripcion;

    const precioAlquiler = document.getElementById('precio_alquiler');
    const precioCompra = document.getElementById('precio_compra');

    if (producto.precio_alquiler !== null) {
      precioAlquiler.textContent = `${producto.precio_alquiler} €`;
    } 
    
    else {
      precioAlquiler.textContent = 'No disponible';
      document.querySelector('.boton_alquilar').style.display = 'none'; // Ocultar el botón de alquiler
    }

    if (producto.precio_compra !== null) {
      precioCompra.textContent = `${producto.precio_compra} €`;
    } 
    
    else {
      precioCompra.textContent = 'No disponible';
      document.querySelector('.boton_comprar').style.display = 'none'; // Ocultar el botón de compra
    }

    const stockProducto = document.getElementById('stockProducto');
    if (producto.stock > 0) {
      stockProducto.classList.add('text-success');
      stockProducto.textContent = '¡En stock!';
    } 
    
    else {
      stockProducto.classList.add('text-danger');
      stockProducto.textContent = '¡No queda stock!';
    }

    if(stockProducto.textContent === '¡No queda stock!'){
      precioAlquiler.textContent = 'No disponible';
      document.querySelector('.boton_alquilar').style.display = 'none';
      precioCompra.textContent = 'No disponible';
      document.querySelector('.boton_comprar').style.display = 'none';
    }

    // Actualizar los valores de los campos ocultos con la cantidad y el ID del producto
    const cantidadProducto = document.getElementById('cantidadProducto');
    const idProducto = document.getElementById('idProducto');
    cantidadProducto.value = '1'; // Valor inicial de la cantidad
    idProducto.value = productoId; // ID del producto actualizado

    // Manejar evento de restar cantidad
    btnRestar.addEventListener('click', () => {
        let cantidad = parseInt(spanCantidad.textContent);
        if (cantidad > 0) {
            cantidad--;
            spanCantidad.textContent = cantidad.toString();
            cantidadProducto.value = cantidad.toString(); // Actualizar el valor del campo oculto
        }
    });

    // Manejar evento de sumar cantidad
    btnSumar.addEventListener('click', () => {
        let cantidad = parseInt(spanCantidad.textContent);
        cantidad++;
        spanCantidad.textContent = cantidad.toString();
        cantidadProducto.value = cantidad.toString(); // Actualizar el valor del campo oculto
    });

  })
  .catch(error => {
    console.error('Error al obtener los datos del producto:', error);
  });
