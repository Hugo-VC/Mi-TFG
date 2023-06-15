<?php

    //Incluimos las constantes del programa. 
    require_once "config.php";
    

    //Cargamos la fn de auto carga de las clases. 
    spl_autoload_register();

    //Declaramos alias para los objetos en el espacio de nombres
    use \misclases\Usuario;
    use \misclases\BaseDatos;


    //Cargamos la sesión 
    session_start();

    //Creamos los objetos.
    //Gestión de la base de datos 
    $bd = new BaseDatos(HOSTNAME, USER, PASSWORD, BBDD);

    //Usuario para la gestión de los usuarios. 
    $usuario = new Usuario();
    

    // Verificar si se ha enviado el formulario de deslogueo
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['desloguear'])) {
        
        echo "ta luego";
        // Eliminar la variable de sesión 'usuario'
        unset($_SESSION['usuario']);

        // Destruir completamente la sesión
        session_destroy();

        // Redirigir a la página principal u otra ubicación
        // header("Location: ../Front/pages/main/main-page.html");
        // exit();
    }


    
    // Verificar si se ha enviado la solicitud de alquiler
    if (isset($_POST['alquilar'])) {
        if (!isset($_SESSION['usuario'])) {
            // Redirigir al usuario a la página de inicio de sesión
            header("Location: ../Front/pages/form-login/form-login-page.html");
            exit();
        } 
        else {
            echo "hola";
            $email = $_SESSION['usuario'];
            $idProducto = $_POST['idProducto'];
            $producto = $bd->recuperarProducto($idProducto);
            $accion = 'alquilar';
            $cantidad = $_POST['cantidadProducto'];

            $resultado = $bd->meterProductoCarritoCliente($email, $producto, $accion, $cantidad);

            header("Location: ../Front/pages/productos/productos-page.html");
            exit();

        }
    }
    

    // Verificar si se ha enviado la solicitud de compra
    if (isset($_POST['comprar'])) {
        if (!isset($_SESSION['usuario'])) {
            // Redirigir al usuario a la página de inicio de sesión
            header("Location: ../Front/pages/form-login/form-login-page.html");
            exit();
        } 
        else {
            $email = $_SESSION['usuario'];
            $idProducto = $_POST['idProducto'];
            $producto = $bd->recuperarProducto($idProducto);
            $accion = 'comprar';
            $cantidad = $_POST['cantidadProducto'];

            $resultado = $bd->meterProductoCarritoCliente($email, $producto, $accion, $cantidad);

            header("Location: ../Front/pages/productos/productos-page.html");
            exit();
            
        }
    }

    else {
        // Si el usuario no ha iniciado sesión, redirigir al main-page.
        header("Location: ../Front/pages/main/main-page.html");
        exit();
    }

?>
