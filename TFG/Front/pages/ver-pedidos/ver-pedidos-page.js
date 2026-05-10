var contPedidos = document.getElementById('cont_pedidos');

function normalizarLineasProductosPedido(productosCampo) {
  var data = productosCampo;
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      return [];
    }
  }
  if (!Array.isArray(data)) {
    return [];
  }

  if (
    data.length === 1 &&
    data[0] &&
    typeof data[0].productos === 'string'
  ) {
    try {
      var inner = JSON.parse(data[0].productos);
      if (Array.isArray(inner)) {
        return inner;
      }
    } catch (e) {}
  }

  if (data.length && data[0] && data[0].producto !== undefined) {
    return data;
  }

  var lineas = [];
  data.forEach(function (item) {
    if (item && typeof item.productos === 'string') {
      try {
        var inner2 = JSON.parse(item.productos);
        if (Array.isArray(inner2)) {
          inner2.forEach(function (x) {
            lineas.push(x);
          });
        }
      } catch (e) {}
    }
  });
  return lineas.length ? lineas : data;
}

function primerProductoDesdeLinea(productoField) {
  if (!productoField) {
    return null;
  }
  if (Array.isArray(productoField)) {
    return productoField[0] || null;
  }
  return productoField;
}

function etiquetaAccion(accion) {
  if (accion === 'alquilar') {
    return 'Alquiler';
  }
  if (accion === 'comprar') {
    return 'Compra';
  }
  return accion || '—';
}

function precioFormateadoSegunAccion(productoField, accion) {
  var p = primerProductoDesdeLinea(productoField);
  if (!p) {
    return '—';
  }
  var raw =
    accion === 'alquilar' ? p.precio_alquiler : p.precio_compra;
  if (raw === null || raw === undefined || raw === '') {
    return '—';
  }
  var n = Number(raw);
  if (isNaN(n)) {
    return String(raw) + ' €';
  }
  return n.toFixed(2) + ' €';
}

function nombreProductoDesdeLinea(productoField) {
  var p = primerProductoDesdeLinea(productoField);
  return p && p.nombre ? p.nombre : '—';
}

function construirCeldaProductos(productosRaw) {
  var lineas = normalizarLineasProductosPedido(productosRaw);
  if (!lineas.length) {
    var vacio = document.createElement('span');
    vacio.className = 'text-muted';
    vacio.textContent = 'Sin productos';
    return vacio;
  }

  var tabla = document.createElement('table');
  tabla.className = 'table table-sm table-bordered mb-0 pedido-lineas';

  var thead = document.createElement('thead');
  thead.innerHTML =
    '<tr><th>Producto</th><th>Acción</th><th>Precio</th><th>Cantidad</th></tr>';
  tabla.appendChild(thead);

  var tbody = document.createElement('tbody');
  lineas.forEach(function (linea) {
    var tr = document.createElement('tr');
    var accion = linea.accion || '';
    var tdNom = document.createElement('td');
    tdNom.textContent = nombreProductoDesdeLinea(linea.producto);
    var tdAcc = document.createElement('td');
    tdAcc.textContent = etiquetaAccion(accion);
    var tdPre = document.createElement('td');
    tdPre.textContent = precioFormateadoSegunAccion(linea.producto, accion);
    var tdCant = document.createElement('td');
    tdCant.textContent =
      linea.cantidad !== undefined && linea.cantidad !== null
        ? String(linea.cantidad)
        : '—';
    tr.appendChild(tdNom);
    tr.appendChild(tdAcc);
    tr.appendChild(tdPre);
    tr.appendChild(tdCant);
    tbody.appendChild(tr);
  });
  tabla.appendChild(tbody);

  return tabla;
}

fetch('../../../BackEnd/gestion/obtenerPedidos.php')
  .then(function (response) {
    return response.json();
  })
  .then(function (pedidos) {
    pedidos.forEach(function (pedido, index) {
      var row = document.createElement('tr');

      var indexCell = document.createElement('th');
      indexCell.setAttribute('scope', 'row');
      indexCell.textContent = index + 1;

      var emailCell = document.createElement('td');
      emailCell.textContent =
        pedido.email_cliente && pedido.email_cliente.length
          ? pedido.email_cliente
          : '(usuario no disponible)';

      var productosCell = document.createElement('td');
      productosCell.appendChild(construirCeldaProductos(pedido.productos));

      var fechaCell = document.createElement('td');
      fechaCell.textContent = pedido.fecha;

      var fechaCaducidadCell = document.createElement('td');
      fechaCaducidadCell.textContent = pedido.fecha_caducidad;

      row.appendChild(indexCell);
      row.appendChild(emailCell);
      row.appendChild(productosCell);
      row.appendChild(fechaCell);
      row.appendChild(fechaCaducidadCell);

      contPedidos.appendChild(row);
    });
  })
  .catch(function (error) {
    console.error(error);
  });
