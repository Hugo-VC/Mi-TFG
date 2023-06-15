// Obtener la referencia del elemento tbody de la tabla
var contPedidos = document.getElementById('cont_pedidos');

// Obtener los datos de los clientes mediante una petición AJAX
fetch('../../../BackEnd/gestion/obtenerPedidos.php')
  .then((response) => response.json()) // Convertir la respuesta a JSON
  .then((pedidos) => {
    console.log(pedidos);
    // Iterar sobre los datos de los clientes
    pedidos.forEach((pedido, index) => {
      // Crear una nueva fila en la tabla para cada cliente
      var row = document.createElement('tr');

      // Crear las celdas para cada campo del cliente
      var indexCell = document.createElement('th');
      indexCell.setAttribute('scope', 'row');
      indexCell.textContent = index + 1;

      var idClienteCell = document.createElement('td');
      idClienteCell.textContent = pedido.id_cliente;
      
      var productosCell = document.createElement('td');
      productosCell.textContent = pedido.productos;

      var fechaCell = document.createElement('td');
      fechaCell.textContent = pedido.fecha;

      var fechaCaducidadCell = document.createElement('td');
      fechaCaducidadCell.textContent = pedido.fecha_caducidad;

      // Agregar las celdas a la fila
      row.appendChild(indexCell);
      row.appendChild(idClienteCell);
      row.appendChild(productosCell);
      row.appendChild(fechaCell);
      row.appendChild(fechaCaducidadCell);
    

      // Agregar la fila al tbody de la tabla
      contPedidos.appendChild(row);
    });
  })
  .catch((error) => console.error(error));
