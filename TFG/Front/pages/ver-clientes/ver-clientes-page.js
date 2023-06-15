// Obtener la referencia del elemento tbody de la tabla
var contPedidos = document.getElementById('cont_clientes');

// Obtener los datos de los clientes mediante una petición AJAX
fetch('../../../BackEnd/gestion/obtenerClientes.php')
  .then((response) => response.json()) // Convertir la respuesta a JSON
  .then((clientes) => {
    console.log(clientes);
    // Iterar sobre los datos de los clientes
    clientes.forEach((cliente, index) => {
      // Crear una nueva fila en la tabla para cada cliente
      var row = document.createElement('tr');

      // Crear las celdas para cada campo del cliente
      var indexCell = document.createElement('th');
      indexCell.setAttribute('scope', 'row');
      indexCell.textContent = index + 1;

      var idCell = document.createElement('td');
      idCell.textContent = cliente.id;

      var nombreCell = document.createElement('td');
      nombreCell.textContent = cliente.nombre;

      var apellidoCell = document.createElement('td');
      apellidoCell.textContent = cliente.apellido;

      var emailCell = document.createElement('td');
      emailCell.textContent = cliente.email;

      var idCarritoCell = document.createElement('td');
      idCarritoCell.textContent = cliente.id_carrito;

      // Agregar las celdas a la fila
      row.appendChild(indexCell);
      row.appendChild(idCell);
      row.appendChild(nombreCell);
      row.appendChild(apellidoCell);
      row.appendChild(emailCell);
      row.appendChild(idCarritoCell);

      // Agregar la fila al tbody de la tabla
      contPedidos.appendChild(row);
    });
  })
  .catch((error) => console.error(error));
