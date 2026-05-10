var contClientes = document.getElementById('cont_clientes');

function iconoPapelera() {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('width', '18');
  svg.setAttribute('height', '18');
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('class', 'bi bi-trash');
  svg.setAttribute('viewBox', '0 0 16 16');
  var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute(
    'd',
    'M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'
  );
  var path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path2.setAttribute('fill-rule', 'evenodd');
  path2.setAttribute(
    'd',
    'M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
  );
  svg.appendChild(path);
  svg.appendChild(path2);
  return svg;
}

function cargarClientes() {
  contClientes.innerHTML = '';
  fetch('../../../BackEnd/gestion/obtenerClientes.php')
    .then(function (response) {
      return response.json();
    })
    .then(function (clientes) {
      clientes.forEach(function (cliente, index) {
        var row = document.createElement('tr');

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

        var accionesCell = document.createElement('td');
        accionesCell.className = 'text-center';

        var btnBorrar = document.createElement('button');
        btnBorrar.type = 'button';
        btnBorrar.className = 'btn btn-link btn-sm text-danger p-0 btn-eliminar-cliente';
        btnBorrar.setAttribute('title', 'Eliminar cuenta');
        btnBorrar.appendChild(iconoPapelera());

        btnBorrar.addEventListener('click', function () {
          var msg =
            '¿Eliminar la cuenta de ' +
            cliente.email +
            '? Se borrarán también sus pedidos asociados.';
          if (!window.confirm(msg)) {
            return;
          }
          var fd = new FormData();
          fd.append('id_cliente', String(cliente.id));
          fetch('../../../BackEnd/gestion/eliminarCliente.php', {
            method: 'POST',
            body: fd,
            credentials: 'same-origin',
          })
            .then(function (r) {
              return r.json();
            })
            .then(function (data) {
              if (data.ok) {
                cargarClientes();
              } else {
                window.alert('No se pudo eliminar el cliente.');
              }
            })
            .catch(function () {
              window.alert('Error de conexión al eliminar.');
            });
        });

        accionesCell.appendChild(btnBorrar);

        row.appendChild(indexCell);
        row.appendChild(idCell);
        row.appendChild(nombreCell);
        row.appendChild(apellidoCell);
        row.appendChild(emailCell);
        row.appendChild(idCarritoCell);
        row.appendChild(accionesCell);

        contClientes.appendChild(row);
      });
    })
    .catch(function (error) {
      console.error(error);
    });
}

cargarClientes();
