// recogemos los campos del formulario
var email = document.getElementById("email");
var password = document.getElementById("password");
var formulario = document.getElementById("login");
var mensaje = document.getElementById("aviso");

//Si el campo no cumple las restricciones, se mostrará un aviso al perder el foco.
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
function enviar() {
    if (email.value.length == 0 || password.value.length == 0) {
        mensaje.innerHTML = "*Rellene los campos.";
        return false;
    }
    else{
        return true;
    }
}


// Validamos cada uno de los campos cuando pierde el foco
email.onblur = campoEmail;
password.onblur = campoPassword;

//Enviamos el formulario si todos los campos son válidos.
formulario.setAttribute("onsubmit", "return enviar();"); //Si el onsubmit retorna true se envia el formulario.
