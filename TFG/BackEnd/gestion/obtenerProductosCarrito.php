<?php
    //Incluimos las constantes del programa. 
    require_once "../config.php";
    require_once "../misclases/basedatos.php";

    use \misclases\BaseDatos;

    //Cargamos la sesión 
    session_start();

    // Obtener el correo electrónico de la sesión si está definido
    $emailUsuario = $_SESSION['usuario'];

    if (!empty($emailUsuario)) {
        $bd = new BaseDatos(HOSTNAME, USER, PASSWORD, BBDD);
        $idCarrito = $bd -> obtenerCarritoCliente($emailUsuario);
        $productosCarrito = $bd -> obtenerProductosCarritoCliente($idCarrito);

        // Convierte los datos en formato JSON
        $jsonProductos = json_encode($productosCarrito);

        // Envío los datos como respuesta en formato JSON
        header('Content-Type: application/json');
        echo $jsonProductos;
    }
    else{
        echo "Correo electrónico no definido en la sesión.";
    }

?>