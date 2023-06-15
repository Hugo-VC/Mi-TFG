<?php

    //Incluimos las constantes del programa. 
    require_once "../config.php";
    require_once "../misclases/basedatos.php";

    use \misclases\BaseDatos;

    $bd = new BaseDatos(HOSTNAME, USER, PASSWORD, BBDD);
    $productos = $bd->obtenerProductos();

    header('Content-Type: application/json');
    echo $productos;

?>