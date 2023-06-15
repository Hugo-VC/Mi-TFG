<?php

    namespace misclases;

    class BaseDatos {
        private $conexion;
    
        public function __construct($host='', $usuario='', $contrasena='', $dbname='') {
            $this->conexion = mysqli_connect($host, $usuario, $contrasena, $dbname);
    
            if ($this->conexion->connect_error) {
                die("Error al conectar a la base de datos: " . $this->conexion->connect_error);
            }
        }

    
        public function crearCliente($nombre, $apellido, $email, $password): bool {
            $passwordMd5 = md5($password); // Convertir la contraseña a formato MD5
        
            // Crear el carrito y obtener su ID
            $idCarrito = $this->crearCarrito();
        
            if ($idCarrito == 0) {
                return false; // Si ocurrió un error al crear el carrito, se retorna false
            }
        
            $consulta = "INSERT INTO usuarios (nombre, apellido, email, password, rol_id, id_carrito) VALUES ('$nombre', '$apellido', '$email', '$passwordMd5', 2, $idCarrito)";
        
            $creado = false;
            if (mysqli_query($this->conexion, $consulta)) {
                $creado = true;
            } else {
                echo "Error al insertar el cliente: " . mysqli_error($this->conexion);
            }
            mysqli_close($this->conexion);
        
            return $creado;
        }
        
        public function comprobarEmail($email):bool {
            $valido = false;
            $consulta = "SELECT * FROM usuarios WHERE email = '$email'";
            $resultado = mysqli_query($this->conexion, $consulta);

            if($resultado->num_rows !== 1) { // si se han encontrado resultados
                $valido = true;
            }
            
            mysqli_close($this->conexion);
            return $valido;
        }

    
        public function comprobarLogin($email, $password):bool {
            $passwordMd5 = md5($password);
            $consulta = "SELECT * FROM usuarios WHERE email = '$email' AND password = '$passwordMd5'";
            $resultado = mysqli_query($this->conexion, $consulta);
            $comprobado = false;

            if($resultado->num_rows === 1) { // si se han encontrado resultados
                $comprobado = true;
            }
            else{
                echo "usuario NO encontrado";
            }
            mysqli_close($this->conexion);

            return $comprobado;
        }

        public function obtenerProductos() {
            $consulta = "SELECT * FROM productos";
            $resultado = mysqli_query($this->conexion, $consulta);
        
            if (!$resultado) {
                echo "Error al ejecutar la consulta: " . mysqli_error($this->conexion);
                return;
            }
        
            // Obtener los datos de los productos
            $productos = array();
            if ($resultado->num_rows > 0) {
                while($row = $resultado->fetch_assoc()) {
                    $productos[] = $row;
                }
            }
            mysqli_close($this->conexion);
            $productos_json = json_encode($productos);
            return $productos_json;
        }

        public function recuperarProducto($idProducto) {
            $consulta = "SELECT id, nombre, precio_alquiler, precio_compra, imagen FROM productos WHERE id = '$idProducto'";
            $resultado = mysqli_query($this->conexion, $consulta);

            if ($resultado) {
                // Obtener los datos de los productos
                $producto = array();
                if ($resultado->num_rows > 0) {
                    while($row = $resultado->fetch_assoc()) {
                        $producto[] = $row;
                    }
                }
            }
            else{
                echo "Error al ejecutar la consulta: " . mysqli_error($this->conexion);
                return;
            }
            
            // mysqli_close($this->conexion);
        
            return $producto;
        }

        public function crearCarrito(): int {
            $sql = "INSERT INTO carrito (id_carrito) VALUES (NULL)";
            $resultado = mysqli_query($this->conexion, $sql);
        
            if ($resultado) {
                $lastId = mysqli_insert_id($this->conexion);
                return $lastId;
            } else {
                echo "Error al insertar el carrito: " . mysqli_error($this->conexion);
                return 0;
            }

            mysqli_close($this->conexion);
        }

        public function obtenerCarritoCliente($email): int {
            $sql = "SELECT id_carrito FROM usuarios WHERE email = '$email'";
            $resultado = mysqli_query($this->conexion, $sql);
        
            if ($resultado) {
                // Obtener el primer registro del resultado
                $fila = mysqli_fetch_assoc($resultado);
        
                // Obtener el valor de id_carrito
                $idCarrito = $fila['id_carrito'];
        
                // Retornar el valor de id_carrito
                return $idCarrito;
            } else {
                echo "Error al buscar el carrito: " . mysqli_error($this->conexion);
                return 0;
            }

            // mysqli_close($this->conexion);
        }
        
        public function meterProductoCarritoCliente($email, $producto, $accion, $cantidad): bool {
            $idCarrito = $this->obtenerCarritoCliente($email);
            $sql = "SELECT productos FROM carrito WHERE id_carrito = '$idCarrito'";
            $resultado = mysqli_query($this->conexion, $sql);
            $comprobado = false;
        
            if ($resultado) {
                // Obtener los productos del carrito en formato JSON
                $fila = mysqli_fetch_assoc($resultado);
                $productos = json_decode($fila['productos'], true);
        
                // Crear un nuevo elemento de producto en formato JSON
                $nuevoProducto = array(
                    'producto' => $producto,
                    'accion' => $accion,
                    'cantidad' => $cantidad
                );
        
                // Agregar el nuevo producto al arreglo de productos
                $productos[] = $nuevoProducto;
        
                // Convertir el arreglo de productos de nuevo a formato JSON
                $productosJSON = json_encode($productos);
        
                // Actualizar la columna "productos" en la tabla "carrito" con el nuevo JSON
                $sql = "UPDATE carrito SET productos = '$productosJSON' WHERE id_carrito = '$idCarrito'";
                $resultado = mysqli_query($this->conexion, $sql);
        
                if ($resultado) {
                    $comprobado = true;
                } else {
                    echo "Error al añadir producto: " . mysqli_error($this->conexion);
                }
            } else {
                echo "Error al obtener los productos del carrito: " . mysqli_error($this->conexion);
            }

            mysqli_close($this->conexion);
            return $comprobado;
        }


        public function obtenerProductosCarritoCliente($idCarrito): array {
            $sql = "SELECT productos FROM carrito WHERE id_carrito = '$idCarrito'";
            $resultado = mysqli_query($this->conexion, $sql);
            
            // Obtener los datos del carrito en un array asociativo
            $carrito = array();
            if ($resultado->num_rows > 0) {
                while ($row = $resultado->fetch_assoc()) {
                    $carrito[] = $row;
                }
            }
            // mysqli_close($this->conexion);

            // Devolver los datos del carrito en formato JSON
            return $carrito;
        }

        public function obtenerRolUsuario($email):string {
            $sql = "SELECT r.rol
                    FROM usuarios u
                    JOIN roles r ON u.rol_id = r.rol_id
                    WHERE u.email = '$email'";

            $resultado = mysqli_query($this->conexion, $sql);

            if ($resultado && mysqli_num_rows($resultado) > 0) {
                $fila = mysqli_fetch_assoc($resultado);
                return $fila['rol'];
            }
            
            return ''; // Valor predeterminado si no se encuentra el usuario o no se puede obtener el nombre del rol
        }

        public function obtenerClientes(){
            $sql = "SELECT * FROM usuarios WHERE rol_id = 2";
            $resultado = mysqli_query($this->conexion, $sql);
        
            if (!$resultado) {
                echo "Error al ejecutar la consulta: " . mysqli_error($this->conexion);
                return;
            }
        
            // Obtener los datos de los clientes
            $clientes = array();
            if ($resultado->num_rows > 0) {
                while($row = $resultado->fetch_assoc()) {
                    $clientes[] = $row;
                }
            }
            mysqli_close($this->conexion);
            $clientes_json = json_encode($clientes);
            return $clientes_json;
        }

        public function obtenerIDCliente($email): int {
            $sql = "SELECT id FROM usuarios WHERE email = '$email'";
            $resultado = mysqli_query($this->conexion, $sql);
        
            if ($resultado) {
                // Obtener el primer registro del resultado
                $fila = mysqli_fetch_assoc($resultado);
        
                // Obtener el valor de id_carrito
                $id = $fila['id'];
        
                // Retornar el valor de id_carrito
                return $id;

            } else {
                echo "Error al buscar el carrito: " . mysqli_error($this->conexion);
                return 0;
            }

            // mysqli_close($this->conexion);
        }

        public function crearPedido($idCliente, $productos, $fecha, $fecha_caducidad): bool {
            $consulta = "INSERT INTO pedidos (id_cliente, productos, fecha, fecha_caducidad) VALUES ('$idCliente', '$productos', '$fecha', '$fecha_caducidad')";
            $creado = false;
            if (mysqli_query($this->conexion, $consulta)) {
                $creado = true;
            } else {
                echo "Error al insertar el pedido: " . mysqli_error($this->conexion);
            }
            // mysqli_close($this->conexion);
        
            return $creado;
        }

        public function borrarProductosCarrito($idCarrito): bool {
            $sql = "UPDATE carrito SET productos = NULL WHERE id_carrito = '$idCarrito'";
            $resultado = mysqli_query($this->conexion, $sql);
            $borrado = false;

            if ($resultado) {
                $borrado = true;
            } else {
                echo "Error al borrar los prodcutos del carrito: " . mysqli_error($this->conexion);
            }
            mysqli_close($this->conexion);
        
            return $borrado;
        }

        public function obtenerPedidos(){
            $sql = "SELECT * FROM pedidos";
            $resultado = mysqli_query($this->conexion, $sql);
        
            if (!$resultado) {
                echo "Error al ejecutar la consulta: " . mysqli_error($this->conexion);
                return;
            }
        
            // Obtener los datos de los clientes
            $pedidos = array();
            if ($resultado->num_rows > 0) {
                while($row = $resultado->fetch_assoc()) {
                    $pedidos[] = $row;
                }
            }
            mysqli_close($this->conexion);
            $pedidos_json = json_encode($pedidos);
            return $pedidos_json;
        
        }
    }
?>
