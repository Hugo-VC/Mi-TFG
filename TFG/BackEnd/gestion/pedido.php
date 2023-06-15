<?php
    //Incluimos las constantes del programa. 
    require_once "../config.php";
    require_once "../misclases/basedatos.php";

    use \misclases\BaseDatos;

    //Cargamos la sesión 
    session_start();

    // Obtener el correo electrónico de la sesión si está definido
    $emailCliente = $_SESSION['usuario'];
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Verificar si se ha enviado el formulario
        if (isset($_POST['boton_pedido'])) {
            $bd = new BaseDatos(HOSTNAME, USER, PASSWORD, BBDD);
            $idCliente = $bd -> obtenerIDCliente($emailCliente);
            $idCarrito = $bd -> obtenerCarritoCliente($emailCliente);
            $productosCarrito = $bd -> obtenerProductosCarritoCliente($idCarrito);
            $fechaActual = date('d/m/Y');
            $fechaCaducidad = date('d/m/Y', strtotime('+2 weeks'));

            // Convierte los datos en formato JSON
            $jsonProductos = json_encode($productosCarrito);    

            $bd -> crearPedido($idCliente, $jsonProductos, $fechaActual, $fechaCaducidad);
            $bd -> borrarProductosCarrito($idCarrito);

            header("Location: ../../Front/pages/carrito/carrito-page.html");
            exit(); 
        }
    }
    
?>

