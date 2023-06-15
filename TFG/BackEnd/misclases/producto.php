<?php

    namespace misclases;

    class Producto {
        private $nombre;
        private $descripcion;
        private $categoria;
        private $precio_alquiler;
        private $precio_compra;
        private $disponibilidad;
        private $imagen;
        private $stock;
    
        public function __construct($nombre = "", $descripcion = "", $categoria = "", $precio_alquiler = 0, $precio_compra = 0, $disponibilidad = false, $imagen = "", $stock = 0) {
            $this->nombre = $nombre;
            $this->descripcion = $descripcion;
            $this->categoria = $categoria;
            $this->precio_alquiler = $precio_alquiler;
            $this->precio_compra = $precio_compra;
            $this->disponibilidad = $disponibilidad;
            $this->imagen = $imagen;
            $this->stock = $stock;
        }

        // Setters
        public function setNombre($nombre) {
            $this->nombre = $nombre;
        }

        public function setDescripcion($descripcion) {
            $this->descripcion = $descripcion;
        }

        public function setCategoria($categoria) {
            $this->categoria = $categoria;
        }

        public function setPrecio_alquiler($precio_alquiler) {
            $this->precio_alquiler = $precio_alquiler;
        }

        public function setPrecio_compra($precio_compra) {
            $this->precio_compra = $precio_compra;
        }

        public function setDisponibilidad($disponibilidad) {
            $this->disponibilidad = $disponibilidad;
        }

        public function setImagen($imagen) {
            $this->imagen = $imagen;
        }

        public function setStock($stock) {
            $this->stock = $stock;
        }


        // Getters
        public function getNombre(){
            return $this->nombre;
        }

        public function getDescripcion() {
            return $this->descripcion;
        }

        public function getCategoria() {
            return $this->categoria;
        }

        public function getPrecio_alquiler() {
            return $this->precio_alquiler;
        }

        public function getPrecio_compra() {
            return $this->precio_compra;
        }

        public function getDisponibilidad() {
            return $this->disponibilidad;
        }

        public function getImagen() {
            return $this->imagen;
        }

        public function getStock() {
            return $this->stock;
        }
        
    }
    

?>