fetch('http://localhost:8080/tfg/BackEnd/gestion/obtenerProductosCarrito.php')
  .then(response => response.json())
  .then(data => {
    const productos = JSON.parse(data[0].productos);
    console.log(productos);
    console.log(productos.length);

    //obtenemos los elementos del html
    const contInfoArticulos = document.getElementById("cont_info_articulos");
    const divProductosCarrito = document.getElementById("productos_carrito");
    const divResumenPedido = document.getElementById("cont_pedido");
    const divBotones = document.getElementById("cont_botones");

    // Crear el título "Mi cesta"
    const tituloCesta = document.createElement("h2");
    tituloCesta.classList.add("text-center");
    tituloCesta.textContent = "Mi cesta";

    // Crear el texto de artículos
    const textoArticulos = document.createElement("p");
    textoArticulos.classList.add("text-center", "text-secondary");
    textoArticulos.textContent = `${productos.length} artículos`;

    contInfoArticulos.appendChild(tituloCesta);
    contInfoArticulos.appendChild(textoArticulos);


    if (productos === null) {
      divProductosCarrito.style.display = "none";
    } 
    else {
      divResumenPedido.classList.remove("oculto");
      divResumenPedido.classList.add("visible");

      const divCestaVacia = document.getElementById("cont_cesta_vacia");
      divCestaVacia.style.display = "none";

      const divProductosCarrito = document.getElementById("productos_carrito");

      let precioTotal = 0;

      productos.forEach(producto => {
        const id = producto.producto[0].id;
        const nombre = producto.producto[0].nombre;
        const imagen = producto.producto[0].imagen;
        const accion = producto.accion;
        let precio;
    

        const contProducto = document.createElement("div");
        contProducto.classList.add("container-fl", "mb-2", "border", "border-secondary", "rounded", "cont_producto");

        const tituloAlquilar = document.createElement("p");
        if(accion === "alquilar"){
            tituloAlquilar.classList.add("col-12", "text-center", "bg-danger", "text-white");
            tituloAlquilar.textContent = "Alquilar";
            precio = parseFloat(producto.producto[0].precio_alquiler);
        }
        else{
            tituloAlquilar.classList.add("col-12", "text-center", "bg-success", "text-white");
            tituloAlquilar.textContent = "Comprar";
            precio = parseFloat(producto.producto[0].precio_compra);
            
        }
        contProducto.appendChild(tituloAlquilar);

        precioTotal += precio;

        const row = document.createElement("div");
        row.classList.add("row", "mt-3", "mb-3", "ms-3");

        const colImg = document.createElement("div");
        colImg.classList.add("col-4");

        const linkImg = document.createElement("a");
        linkImg.href = "../detalles-producto/detalles-producto.html?id=" + id;

        const imgProducto = document.createElement("img");
        imgProducto.classList.add("img_producto");
        imgProducto.src = "../../img/Productos/" + imagen;
        imgProducto.alt = "";
        linkImg.appendChild(imgProducto);
        colImg.appendChild(linkImg);
        row.appendChild(colImg);

        const colInfo = document.createElement("div");
        colInfo.classList.add("col-8");

        const linkNombre = document.createElement("a");
        linkNombre.classList.add("link-dark");
        linkNombre.href = "../detalles-producto/detalles-producto.html?id=" + id;

        const nombreProducto = document.createElement("strong");
        nombreProducto.textContent = nombre;
        linkNombre.appendChild(nombreProducto);
        colInfo.appendChild(linkNombre);

        const precioUnidad = document.createElement("p");
        precioUnidad.classList.add("mt-2");
        precioUnidad.textContent = "Precio por unidad: ";
        const precioUnidadValor = document.createElement("strong");
        precioUnidadValor.classList.add("text-danger");
        precioUnidadValor.textContent = precio + " €";
        precioUnidad.appendChild(precioUnidadValor);
        colInfo.appendChild(precioUnidad);

        const cantidad = document.createElement("p");
        cantidad.classList.add("mt-2");
        cantidad.textContent = "Cantidad: ";
        const cantidadValor = document.createElement("strong");
        cantidadValor.classList.add("text-danger");
        cantidadValor.textContent = producto.cantidad;
        cantidad.appendChild(cantidadValor);
        colInfo.appendChild(cantidad);

        const recogerTienda = document.createElement("p");
        recogerTienda.classList.add("mt-2", "text-success");
        recogerTienda.textContent = "Recoger en tienda";
        colInfo.appendChild(recogerTienda);

        // Crear el elemento div contBorrar
        const contBorrar = document.createElement("div");
        contBorrar.classList.add("container", "cont_borrar");

        // Crear el elemento div rowBoton
        const rowBoton = document.createElement("div");
        rowBoton.classList.add("row", "mt-3");

        // Crear el elemento div colBoton
        const colBoton = document.createElement("div");
        colBoton.classList.add("col-12");

        // Crear el nuevo botón
        const nuevoBoton = document.createElement("div");
        nuevoBoton.classList.add("col-2", "me-3");

        const button = document.createElement("button");
        button.classList.add("btn", "btn-outline-dark", "border", "border-secondary", "rounded");

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        svg.setAttribute("fill", "currentColor");
        svg.setAttribute("class", "bi bi-trash3");
        svg.setAttribute("viewBox", "0 0 16 16");

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z");

        svg.appendChild(path);
        button.appendChild(svg);
        nuevoBoton.appendChild(button);

        colBoton.appendChild(nuevoBoton);
        rowBoton.appendChild(colBoton);
        contBorrar.appendChild(rowBoton);


        contBorrar.appendChild(rowBoton);
        colInfo.appendChild(contBorrar);
        row.appendChild(colInfo);
        contProducto.appendChild(row);

        divProductosCarrito.appendChild(contProducto);
        

        var resumenHTML = `
          <div class="container mt-3 mb-3">
              <h4 class="text-secondary">Resumen</h4>
              <p class="mt-3">Subtotal artículos: <strong>${precioTotal} €</strong></p>
              <hr class="mt-3 mb-3">
              <p class="mt-3">Total (Impuestos incluidos): <strong>${precioTotal} €</strong></p>
              <form method="post" action="../../../BackEnd/gestion/pedido.php">
                  <button type="submit" class="btn btn-warning mt-3 boton_pedido" name="boton_pedido">Realizar pedido</button>
              </form>
          </div>
        `;

        divResumenPedido.innerHTML = resumenHTML;

      });

      var contenidoDivBotones = `
            <button class="btn btn-outline-dark border border-secondary rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
                <span class="ms-2">Vaciar cesta</span>
            </button>
            <a class="enlace_productos btn btn-outline-dark border border-secondary rounded" href="../productos/productos-page.html">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
                <span class="ms-2">Seguir mirando</span>
            </a>`

        divBotones.innerHTML = contenidoDivBotones;
        divProductosCarrito.appendChild(divBotones);
    }
  })
  .catch(error => {
    console.log(error);
  });

