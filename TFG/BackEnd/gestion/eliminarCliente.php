<?php

    require_once "../config.php";
    require_once "../misclases/basedatos.php";

    use \misclases\BaseDatos;

    session_start();

    header('Content-Type: application/json; charset=utf-8');

    if ($_SERVER['REQUEST_METHOD'] !== 'POST' || !isset($_POST['id_cliente'])) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'Solicitud inválida']);
        exit;
    }

    if (!isset($_SESSION['usuario'])) {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'No autorizado']);
        exit;
    }

    $bdAuth = new BaseDatos(HOSTNAME, USER, PASSWORD, BBDD);
    $rol = $bdAuth->obtenerRolUsuario($_SESSION['usuario']);
    if ($rol !== 'administrador') {
        http_response_code(403);
        echo json_encode(['ok' => false, 'error' => 'No autorizado']);
        exit;
    }

    $id = (int) $_POST['id_cliente'];
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'error' => 'ID inválido']);
        exit;
    }

    $bd = new BaseDatos(HOSTNAME, USER, PASSWORD, BBDD);
    $ok = $bd->eliminarCliente($id);

    echo json_encode(['ok' => $ok]);

?>
