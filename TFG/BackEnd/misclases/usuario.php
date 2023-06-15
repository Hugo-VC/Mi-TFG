<?php

    namespace misclases;

    class Usuario {
        private $nombre;
        private $apellido;
        private $email;
        private $rol_id;
        private $id_carrito;
    
        public function __construct($nombre = "", $apellido = "", $email = "", $rol_id = 0, $id_carrito = 0) {
            $this->nombre = $nombre;
            $this->apellido = $apellido;
            $this->email = $email;
            $this->rol_id = $rol_id;
            $this->id_carrito = $id_carrito;
        }

        public function setNombre($nombre) {
            $this->nombre = $nombre;
        }

        public function setEmail($email) {
            $this->email = $email;
        }
    
        public function getNombre() {
            return $this->nombre;
        }
    
        public function getApellido() {
            return $this->apellido;
        }
    
        public function getEmail() {
            return $this->email;
        }
    
        public function getRolId() {
            return $this->rol_id;
        }

        public function getIdCarrito() {
            return $this->id_carrito;
        }
    }
    

?>