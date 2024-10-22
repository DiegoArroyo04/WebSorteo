document.addEventListener("DOMContentLoaded", function () {
    // Event listener para el formulario
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", validarFormulario);

    // Inicia el contador cuando se cargue la página
    window.onload = iniciarCuentaRegresiva;


});




function validarFormulario(event) {
    event.preventDefault(); // Evita el envío del formulario


    //PERMITIR O DENEGAR REGISTRO
    if ((comprobarNombre() == true) && (comprobarApellidos() == true) && (comprobarTelefono() == true)) {

        //REGISTRAR EN BASE DE DATOS
        registrarBaseDatos();

        /* MANDAR EMAIL
        event.preventDefault();
        const serviceID = 'service_dy20kyj';
        const templateID = 'template_w55i12k';
    
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
    
            }, (err) => {
    
               
            });
        */

        //MOSTRAR MENSAJE CONFIRMACION 
        mostrarModalConfirmacion();
        // Permitir el envío del formulario

        return true;

    } else {

        return false;
    }

}
function comprobarTelefono() {
    var telefono = document.getElementById("telefono").value;
    var patronNumeros = "6789";
    var patronCorrecto = false;
    var longitud = false;
    if (telefono === "") {
        document.getElementById("parrafoVerificacionTlf").style.display = "none";
        return false; // Aquí no hay nada que validar si está vacío
    }
    if (patronNumeros.includes(telefono[0])) {
        patronCorrecto = true;
        document.getElementById("parrafoVerificacionTlf").style.display = "none";
    }
    if (telefono.length == 9) {
        longitud = true;
        document.getElementById("parrafoVerificacionTlf").style.display = "none";
    }

    if ((patronCorrecto == true) && (longitud == true)) {
        document.getElementById("parrafoVerificacionTlf").style.display = "none";
        return true;
    } else if (patronCorrecto == false) {
        document.getElementById("parrafoVerificacionTlf").innerHTML = "Formato de telefono incorrecto.Los numeros en España comienzan por 6 7 8 o 9.";
        document.getElementById("parrafoVerificacionTlf").style.display = "block";
        document.getElementById("parrafoVerificacionTlf").style.color = "red";
        return false;
    } else {
        document.getElementById("parrafoVerificacionTlf").innerHTML = "Longitud de telefono incorrecta.";
        document.getElementById("parrafoVerificacionTlf").style.display = "block";
        document.getElementById("parrafoVerificacionTlf").style.color = "red";
        return false;
    }

}
function comprobarNombre() {
    var nombre = document.getElementById("nombre").value;
    var validado = true;
    const numeros = "1234567890";

    //COMPROBACION DE QUE EL CAMPO DE NOMBRE NO TENGA NUMEROS
    for (i = 0; i < nombre.length; i++) {
        if (numeros.includes(nombre[i])) {
            validado = false;
            document.getElementById("parrafoVerificacionNombre").innerHTML = "Nombre inválido.Un nombre no contiene números";
            document.getElementById("parrafoVerificacionNombre").style.display = "block";
            document.getElementById("parrafoVerificacionNombre").style.color = "red";

        }
    }

    if (validado == true) {
        document.getElementById("parrafoVerificacionNombre").style.display = "none";
    }

    return validado;
}
function comprobarApellidos() {
    var apellidos = document.getElementById("apellidos").value;
    var validado = true;
    const numeros = "1234567890";

    //COMPROBACION DE QUE EL CAMPO DE NOMBRE NO TENGA NUMEROS
    for (i = 0; i < apellidos.length; i++) {
        if (numeros.includes(apellidos[i])) {
            validado = false;
            document.getElementById("parrafoVerificacionApellidos").innerHTML = "Apellidos inválidos.Los apellidos no contienen números";
            document.getElementById("parrafoVerificacionApellidos").style.display = "block";
            document.getElementById("parrafoVerificacionApellidos").style.color = "red";

        }
    }

    if (validado == true) {
        document.getElementById("parrafoVerificacionApellidos").style.display = "none";
    }

    return validado;
}

function registrarBaseDatos() {
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const email = document.getElementById("email").value;
    const telefono = document.getElementById("telefono").value;



    // Enviar los datos al servidor para guardarlos en MongoDB
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellidos, email, telefono })
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);

        })
        .catch(error => {
            console.error("Error al registrar usuario:", error);

        });

}

//MODAL PRIVACIDAD


const modalPrivacidad = document.getElementById("privacyModal");
const acceptButton = document.getElementById("acceptButton");
const checkboxAceptaProteccionDatos = document.getElementById("aceptaProteccionDatos");
const modalPoliticaPrivacidadFooter = document.getElementById("modalPoliticaPrivacidadFooter");
const abrirModalPoliticaPrivacidadcheckbox = document.getElementById("abrirModalPoliticaPrivacidad");

// Mostrar modal al hacer clic en los enlaces
modalPoliticaPrivacidadFooter.addEventListener("click", function (e) {
    e.preventDefault();
    modalPrivacidad.style.display = "flex";
});

abrirModalPoliticaPrivacidadcheckbox.addEventListener("click", function (e) {
    e.preventDefault();
    modalPrivacidad.style.display = "flex";
});

// Marcar checkbox y cerrar modal al aceptar
acceptButton.addEventListener("click", function () {
    checkboxAceptaProteccionDatos.checked = true;
    modalPrivacidad.style.display = "none";
});

// Cerrar modal si se hace clic fuera de él
window.onclick = function (event) {
    if (event.target == modalPrivacidad) {
        modalPrivacidad.style.display = "none";
    }
};



//MODAL CONFIRMACION
function mostrarModalConfirmacion() {
    const modal = document.getElementById("confirmationModal");
    modal.style.display = "flex";
    // Cerrar el modal automáticamente después de 5 segundos
    setTimeout(() => {
        modal.style.display = "none";
        document.getElementById("formulario").submit();
    }, 5000);
}


// Cerrar el modal si se hace clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById("confirmationModal");
    if (event.target === modal) {
        modal.style.display = "none"; // Ocultar el modal
    }
};


function iniciarCuentaRegresiva() {
    // Establece la fecha de finalización del sorteo 
    const fechaFinalSorteo = new Date("Oct 22, 2024 18:25:00").getTime();

    // Actualiza el contador cada segundo
    const interval = setInterval(function () {
        const ahora = new Date().getTime();

        // Calcula la diferencia entre la fecha actual y la fecha de finalización
        const tiempoRestante = fechaFinalSorteo - ahora;

        // Calcula días, horas, minutos y segundos
        const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
        const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

        // Muestra el resultado 
        document.getElementById("countdown").style.display = "block";
        document.getElementById("countdown").innerHTML = "Tiempo restante fin sorteo: " + dias + "d " + horas + "h "
            + minutos + "m " + segundos + "s ";

        // Si el conteo ha terminado, detén el contador y muestra un mensaje
        if (tiempoRestante < 0) {
            clearInterval(interval);
            document.getElementById("countdown").innerHTML = "¡El sorteo ha terminado!";
            window.location.href = "../ganadores.html";
        }
    }, 1000);
}





