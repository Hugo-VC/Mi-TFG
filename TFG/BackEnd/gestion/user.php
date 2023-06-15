<?php

    //Incluimos las constantes del programa. 
    require_once "../config.php";
    require_once "../misclases/basedatos.php";

    use \misclases\BaseDatos;

    function comprobarRegistro(): bool {
        $bd = new BaseDatos(HOSTNAME, USER, PASSWORD, BBDD);
    
        if (isset($_POST['nombre']) && isset($_POST['apellido']) && isset($_POST['email']) && isset($_POST['password'])) {
            $nombre = $_POST['nombre'];
            $apellido = $_POST['apellido'];
            $email = $_POST['email'];
            $password = $_POST['password'];
    
            $creado = false;
    
            // Crear el cliente y obtener su carrito.
            if($bd->crearCliente($nombre, $apellido, $email, $password)){
                $creado = true;
            }
            
        }
    
        return $creado;
    }

    function comprobarLogin(): bool {
        $bd = new BaseDatos(HOSTNAME, USER, PASSWORD, BBDD);
        $comprobado = false;

        if(isset($_POST['email']) && isset($_POST['password'])) {
            if($bd->comprobarLogin($_POST['email'], $_POST['password'])){
                $comprobado = true;
            }
        }

        return $comprobado;
    }

    // si el usuairo se quiere registrar
    if(isset($_POST['registrarse'])){
        if(comprobarRegistro()){
            header("Location: ../../Front/pages/form-login/form-login-page.html");
            exit(); 
        }
    }

    // si el usuario quiere iniciar sesión
    if (isset($_POST['loguearse'])) {
        if (comprobarLogin()) {
            if (session_status() === PHP_SESSION_NONE) {
                session_start();
            }
            $_SESSION['usuario'] = $_POST['email'];

            $bd = new BaseDatos(HOSTNAME, USER, PASSWORD, BBDD);

            $rol = $bd -> obtenerRolUsuario($_SESSION['usuario']);

            if ($rol === 'administrador') {
                echo '<script>
                        localStorage.setItem("usuarioLogueado", "' . $_SESSION['usuario'] . '");
                        console.log(localStorage.getItem("usuarioLogueado"));
                        window.location.href = "../../Front/pages/admin-main/admin-main-page.html"; // Redireccionar en JavaScript
                      </script>';
            
                exit(); // Salir del script de PHP después de la ejecución del JavaScript
            }
            if($rol === 'cliente') {
                echo '<script>
                        localStorage.setItem("usuarioLogueado", "' . $_SESSION['usuario'] . '");
                        console.log(localStorage.getItem("usuarioLogueado"));
                        window.location.href = "../../Front/pages/main/main-page.html"; // Redireccionar en JavaScript
                      </script>';
            
                exit(); // Salir del script de PHP después de la ejecución del JavaScript
            }
            session_destroy();
            
        } else {
            echo "Email o contraseña incorrectos.";
        }
    }
    
    
    
?>