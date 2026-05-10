# TFG — Set Solution (e-commerce / alquiler)

Aplicación web para la gestión de un catálogo de mobiliario con **compra y alquiler**, carrito de pedidos y panel de administración. Proyecto académico (**Trabajo Fin de Grado**) con arquitectura **cliente ligero + servidor PHP** y persistencia en **MySQL**.

---

## En qué consiste el proyecto

El sistema simula una tienda online donde los **clientes** pueden registrarse, iniciar sesión, explorar productos, añadirlos al carrito (como compra o alquiler) y formalizar un **pedido**. Los **administradores** acceden a un área restringida para consultar clientes registrados, eliminar cuentas de cliente y revisar pedidos con el detalle de líneas (producto, acción, precio y cantidad).

La interfaz está inspirada en la marca **Set Solution** (logotipo, navegación y pie con mapa de contacto).

---

## Funcionalidades

### Área pública y cliente

- Página principal con información y mapa (Leaflet).
- **Registro** e **inicio de sesión** (sesión PHP + uso complementario de `localStorage` tras el login).
- **Catálogo de productos** con listado vía API JSON, búsqueda, filtro por categoría y paginación.
- **Ficha de producto** con opciones de **comprar** o **alquilar** (requiere sesión).
- **Carrito** persistente en base de datos (contenido en JSON por usuario).
- **Tramitar pedido**: crea el registro en `pedidos`, asocia fechas y vacía el carrito.

### Área administrador

- Acceso tras login con rol **administrador**.
- Panel principal con enlaces a gestión.
- **Ver clientes**: listado de usuarios con rol cliente; posibilidad de **eliminar cuenta** (incluye pedidos asociados y carrito).
- **Ver pedidos**: listado con **email del cliente** y tabla detallada de productos (nombre, acción, precio según compra/alquiler, cantidad).

---

## Tecnologías usadas

| Capa        | Tecnología |
|------------|------------|
| Backend    | **PHP** (mysqli, sesiones) |
| Base de datos | **MySQL** |
| Frontend   | **HTML5**, **CSS3**, **JavaScript** (vanilla) |
| UI         | **Bootstrap 5** (CDN) |
| Mapas      | **Leaflet** (CDN) |

No se utiliza Node.js, Composer ni framework PHP: el front son páginas estáticas que consumen endpoints PHP bajo `BackEnd/gestion/`.

---

## Estructura del repositorio

```
TFG/
├── BackEnd/
│   ├── config.php              # Host, usuario, contraseña y nombre de la BD
│   ├── index.php               # Acciones carrito (comprar/alquilar) vía POST
│   ├── misclases/              # Clases PHP (p. ej. BaseDatos, Usuario, Producto)
│   └── gestion/                # Endpoints: login, productos, carrito, pedidos, admin…
├── Front/
│   ├── pages/                  # Vistas HTML por pantalla
│   ├── scripts/                # JS compartido (mapa, logout…)
│   └── img/                    # Recursos gráficos
└── README.md
```

---

## Requisitos previos

- [XAMPP](https://www.apachefriends.org/) (o stack equivalente: **Apache**, **PHP**, **MySQL** / MariaDB).
- Navegador actual.

---

## Cómo lanzarlo en local

### 1. Copiar el proyecto

Coloca la carpeta del proyecto dentro del directorio web de Apache, por ejemplo:

`C:\xampp\htdocs\Mi-TFG\TFG\`

### 2. Configurar la base de datos

1. Arranca **Apache** y **MySQL** desde el panel de XAMPP.
2. Crea una base de datos (el nombre por defecto esperado en el código es `tfg`).
3. Crea un usuario MySQL con permisos sobre esa base **o** adapta las credenciales en `BackEnd/config.php`:

```php
define("HOSTNAME", "localhost");
define("USER", "tu_usuario");
define("PASSWORD", "tu_contraseña");
define("BBDD", "tfg");
```

4. **Importa o crea el esquema** (tablas como `usuarios`, `roles`, `productos`, `carrito`, `pedidos`, etc.).  
   Este repositorio **no incluye** un volcado `.sql`; debes usar el script o modelo de datos de tu memoria/docencia.

### 3. Abrir la aplicación

En el navegador, usa la ruta acorde a tu carpeta bajo `htdocs`, por ejemplo:

`http://localhost/Mi-TFG/TFG/Front/pages/main/main-page.html`

Los formularios y peticiones `fetch` apuntan a rutas relativas hacia `BackEnd/`, por lo que conviene servir el sitio **siempre vía `http://localhost/...`** (no abrir los HTML con `file://`, para evitar problemas de rutas y cookies de sesión).

### 4. Usuarios de prueba

Debes dar de alta en la base de datos al menos:

- Un usuario con rol **cliente** (`rol_id` correspondiente en tu tabla `roles`).
- Un usuario con rol **administrador** para probar el panel admin.

Los detalles exactos dependen de tu esquema y semillas de datos.

---

## Notas

- Las contraseñas en el código de ejemplo se almacenan con **MD5**; es adecuado para un entorno de prácticas, pero **no** es una práctica recomendable en producción (usar `password_hash` / `password_verify` y políticas fuertes).
- La eliminación de clientes desde el panel admin borra también sus **pedidos** y el **carrito** asociado, para mantener la integridad referencial.

---

## Licencia y autoría

Proyecto académico (TFG). Ajusta autor, tutor y licencia según los requisitos de tu centro.
