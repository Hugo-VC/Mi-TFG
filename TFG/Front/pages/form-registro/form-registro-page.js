// recogemos los campos del formulario
var nombre = document.getElementById("nombre");
var apellido = document.getElementById("apellido");
var email = document.getElementById("email");
var password = document.getElementById("password");
var condiciones = document.getElementById("condiciones");
var formulario = document.getElementById("registro");
var mensaje = document.getElementById("aviso");

function validarEmail() {
    // El campo email debe ser una dirección de email válida.
    var patron = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; //usuario@dominio.com
  
    if (patron.test(email.value)) {
        // Realizar la verificación adicional con una solicitud AJAX
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.existe) {
                        mensaje.innerHTML = "*El email ya está registrado.";
                    }
                } 
                else {
                    mensaje.innerHTML = "Error al verificar el email.";
                }
            }
        };
    
        xhr.open("POST", "../../../BackEnd/gestion/verificar_email.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send("email=" + encodeURIComponent(email.value));
    
        return true;
    } 
    else {
        mensaje.innerHTML = "*El email NO es válido.";
        return false;
    }
}

function validarPassword(){
    // El password debe tener una longitud mínima de 6 caracteres, 
    // y contener al menos una letra minúscula, una letra mayúscula y un dígito.
    var patron = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,16}$/;

    if(patron.test(password.value)){
        // alert("Contraseña válida");
        return true;
    }
    else{
        mensaje.innerHTML = "*La contraseña NO es válida.";
        return false;
    }
}

function validarCondiciones(){
    if(condiciones.checked){
        return true;
    }
    else{
        mensaje.innerHTML = "*Tienes que aceptar las condiciones.";
        return false;
    }
}

//Si el campo no cumple las restricciones, se mostrará un aviso al perder el foco.
function campoNombre(){
    if(nombre.value.length == 0){
        mensaje.innerHTML = "*El campo NOMBRE es obligatorio !";
    }
}

function campoApellido(){
    if(apellido.value.length == 0){
        mensaje.innerHTML = "*El campo APELLIDO es obligatorio !";
    }
}

function campoEmail(){
    if(email.value.length == 0){
        mensaje.innerHTML = "*El campo EMAIL es obligatorio !";
    }
}

function campoPassword(){
    if(password.value.length == 0){
        mensaje.innerHTML = "*El campo CONTRASEÑA es obligatorio !";
    }
}


// Funcion que le pasamos al onsubmit del formulario.
function enviar(){
    if(!(nombre.value.length == 0 || apellido.value.length == 0 || email.value.length == 0 || password.value.length == 0)){
        if(validarEmail() == false || validarPassword() == false || validarCondiciones() == false){
            return false;
        }
        else{
            return true;
        }
    }

    else{
        mensaje.innerHTML = "*Rellene los campos obligatorios.";
        return false;
    }
}

// Validamos cada uno de los campos cuando pierde el foco
nombre.onblur = campoNombre;
apellido.onblur = campoApellido;
email.onblur = campoEmail;
password.onblur = campoPassword;

//Enviamos el formulario si todos los campos son válidos.
formulario.setAttribute("onsubmit", "return enviar();"); //Si el onsubmit retorna true se envia el formulario.