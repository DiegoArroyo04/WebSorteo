document.addEventListener("DOMContentLoaded", function () {
    //BOTON DE GOOGLE KEYS
    const CLIENT_ID = '606576321819-uuqgovhm3rq6u99fgltkopde58huta69.apps.googleusercontent.com';
    const API_KEY = 'AIzaSyDzYORZrX0CQkYvXNXpzObFbE-882api_Q';
    const SCOPES = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
    var tokenClient;

    // Event listener para el formulario
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", validarFormulario);



    // Iniciar la autenticación al hacer clic en el botón
    document.getElementById('botonGoogle').addEventListener('click', function () {
        tokenClient.requestAccessToken();
    });

    // Inicializar el cliente de Google Identity Services
    function initializeGSI() {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: handleAuthResponse,
        });
    }



    // Inicia el contador cuando se cargue la página
    iniciarCuentaRegresiva();
    //CARGAR PUBLICIDAD
    publicidad();
    //Inicializar GSI
    initializeGSI();

    //MOSTRAR MODAL DE COOKIES SI NO SE HAN ACEPTADO
    if (checkCookieConsent() == false) {
        mostrarModalCookies();
    }

    // Verifica si las cookies están aceptadas y si el usuario está registrado
    if ((checkCookieConsent() == true) && (getCookie("participaSorteo") == "true")) {
        const nombre = getCookie("nombre");
        const apellidos = getCookie("apellidos");
        // Oculta el formulario
        document.getElementById("formulario").style.display = "none";
        // Muestra el mensaje de agradecimiento
        document.getElementById("mensajeGracias").innerHTML = "¡Gracias por participar " + nombre + " " + apellidos + "!";
        document.getElementById("agradecimientoPartipacion").style.display = "flex";
    }

    document.getElementById("iconoErrorNombre").style.display = "none";
    document.getElementById("iconoErrorApellidos").style.display = "none";
    document.getElementById("iconoErrorCorreo").style.display = "none";
    document.getElementById("iconoErrorTelefono").style.display = "none";
});


async function validarFormulario(event) {
    event.preventDefault(); // Evita el envío del formulario


    //PERMITIR O DENEGAR REGISTRO
    if ((comprobarNombre() == true) && (comprobarApellidos() == true) && (comprobarTelefono() == true) && (await validarUsuarioYaParticipa() == true)) {

        //REGISTRAR EN BASE DE DATOS
        registrarBaseDatos();


        /*MANDAR EMAIL CONFIRMACION REGISTRO
        mandarEmail(event.target);
        */

        //MOSTRAR MENSAJE CONFIRMACION 
        mostrarModalConfirmacion();


        //SI EL USUARIO TIENE LAS COOKIES ACEPTADAS ENTONCES CREAMOS COOKIE DE PARTICIPACION
        nombre = document.getElementById("nombre").value;
        apellidos = document.getElementById("apellidos").value;

        if (checkCookieConsent() == true) {
            // Crear cookie para indicar que el usuario ha participado
            setCookie("participaSorteo", "true", 30);
            // Crear cookies para nombre y apellidos
            setCookie("nombre", nombre, 30);
            setCookie("apellidos", apellidos, 30);

            nombre = getCookie("nombre");
            apellidos = getCookie("apellidos");

            // Oculta el formulario
            document.getElementById("formulario").style.display = "none";
            // Muestra el mensaje de agradecimiento
            document.getElementById("mensajeGracias").innerHTML = "¡Gracias por participar " + nombre + " " + apellidos + "!";
            document.getElementById("agradecimientoPartipacion").style.display = "flex";
        }

        // Permitir el envío del formulario
        return true;

    } else {
        mostrarModalError();
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
        document.getElementById("iconoErrorTelefono").style.display = "none";
        document.getElementById("telefono").style.borderColor = "#003366";

        return false; // Aquí no hay nada que validar si está vacío
    }
    if (patronNumeros.includes(telefono[0])) {
        patronCorrecto = true;
        document.getElementById("parrafoVerificacionTlf").style.display = "none";
        document.getElementById("iconoErrorTelefono").style.display = "none";
        document.getElementById("telefono").style.borderColor = "#003366";
    }
    if (telefono.length == 9) {
        longitud = true;
        document.getElementById("parrafoVerificacionTlf").style.display = "none";
        document.getElementById("iconoErrorTelefono").style.display = "none";
        document.getElementById("telefono").style.borderColor = "#003366";
    }

    if ((patronCorrecto == true) && (longitud == true)) {
        document.getElementById("parrafoVerificacionTlf").style.display = "none";
        document.getElementById("iconoErrorTelefono").style.display = "none";
        document.getElementById("telefono").style.borderColor = "#003366";
        return true;
    } else if (patronCorrecto == false) {

        document.getElementById("parrafoVerificacionTlf").innerHTML = "Formato de telefono incorrecto.Los numeros en España comienzan por 6 7 8 o 9.";
        document.getElementById("parrafoVerificacionTlf").style.display = "block";
        document.getElementById("iconoErrorTelefono").style.display = "inline";
        document.getElementById("telefono").style.borderColor = "#003366";

        return false;
    } else {

        document.getElementById("parrafoVerificacionTlf").innerHTML = "Longitud de telefono incorrecta.";
        document.getElementById("parrafoVerificacionTlf").style.display = "block";
        document.getElementById("iconoErrorTelefono").style.display = "inline";

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
            document.getElementById("iconoErrorNombre").style.display = "inline";
            document.getElementById("nombre").style.borderColor = "red";



        }
    }

    if (validado == true) {
        document.getElementById("parrafoVerificacionNombre").style.display = "none";
        document.getElementById("iconoErrorNombre").style.display = "none";
        document.getElementById("nombre").style.borderColor = "#003366";

    }

    return validado;
}
function comprobarApellidos() {
    var apellidos = document.getElementById("apellidos").value;
    var validado = true;
    const numeros = "1234567890";

    //COMPROBACION DE QUE EL CAMPO DE APELLIDOS NO TENGA NUMEROS
    for (i = 0; i < apellidos.length; i++) {
        if (numeros.includes(apellidos[i])) {
            validado = false;

            document.getElementById("parrafoVerificacionApellidos").innerHTML = "Apellidos inválidos.Los apellidos no contienen números";
            document.getElementById("parrafoVerificacionApellidos").style.display = "block";
            document.getElementById("iconoErrorApellidos").style.display = "inline";
            document.getElementById("apellidos").style.borderColor = "red";

        }
    }

    if (validado == true) {
        document.getElementById("parrafoVerificacionApellidos").style.display = "none";
        document.getElementById("iconoErrorApellidos").style.display = "none";
        document.getElementById("apellidos").style.borderColor = "#003366";
    }

    return validado;
}
async function validarUsuarioYaParticipa() {
    var validado = true;

    /*REUTILIZO LA VARIABLE PARTICIPANTES Y LA FUNCION OBTENER PARTICIPANTES DEFINIDA EN GANADORES PARA NO DUPLICAR CODIGO*/
    participantes = await obtenerParticipantes();

    //COMPROBAR QUE ESE EMAIL NO ESTE REGISTRADO YA
    for (i = 0; i < participantes.length; i++) {
        if (participantes[i].email == document.getElementById("email").value) {
            validado = false;
            document.getElementById("parrafoVerificacionEmail").innerHTML = "¡Ya estas participando en el sorteo! Solamente se admite una participación.";
            document.getElementById("parrafoVerificacionEmail").style.display = "block";
            document.getElementById("iconoErrorCorreo").style.display = "inline";
            document.getElementById("email").style.borderColor = "red";
        }

    }

    //COMPROBAR QUE ESE NUMERO DE TELEFONO NO ESTE REGISTRADO YA
    for (i = 0; i < participantes.length; i++) {
        if (participantes[i].telefono == document.getElementById("telefono").value) {
            validado = false;
            document.getElementById("parrafoVerificacionTlf").innerHTML = "¡Ya estas participando en el sorteo! Solamente se admite una participación.";
            document.getElementById("parrafoVerificacionTlf").style.display = "block";
            document.getElementById("iconoErrorTelefono").style.display = "inline";
            document.getElementById("telefono").style.borderColor = "red";
        }

    }



    if (validado == true) {
        document.getElementById("parrafoVerificacionEmail").style.display = "none";
        document.getElementById("iconoErrorCorreo").style.display = "none";
        document.getElementById("email").style.borderColor = "#003366";

        // Solo oculta si el formato es correcto y ademas no esta registrado
        if (comprobarTelefono() == true) {
            parrafoVerificacionTlf.style.display = "none";
            document.getElementById("iconoErrorTelefono").style.display = "none";
            document.getElementById("telefono").style.borderColor = "#003366";
        }
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


function mandarEmail(form) {

    const serviceID = 'service_dy20kyj';
    const templateID = 'template_w55i12k';

    return emailjs.sendForm(serviceID, templateID, form)
        .then(() => {

        }, (err) => {


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


//MODAL ERROR
function mostrarModalError() {
    const modal = document.getElementById("errorModal");
    modal.style.display = "flex";
    // Cerrar el modal automáticamente después de 5 segundos
    setTimeout(() => {
        modal.style.display = "none";
    }, 5000);
}



// Cerrar el modal si se hace clic fuera de él
window.onclick = function (event) {
    const modalConfirmacion = document.getElementById("confirmationModal");
    const modalError = document.getElementById("errorModal");
    const modalPoliticaPrivacidad = document.getElementById("privacyModal");
    if (event.target === modalConfirmacion) {
        modalConfirmacion.style.display = "none"; // Ocultar el modal de confirmacion
    }

    if (event.target === modalError) {
        modalError.style.display = "none"; // Ocultar el modal de confirmacion
    }
    if (event.target === modalPoliticaPrivacidad) {
        modalPoliticaPrivacidad.style.display = "none"; // Ocultar el modal de confirmacion
    }
};


function iniciarCuentaRegresiva() {
    // Establece la fecha de finalización del sorteo 
    const fechaFinalSorteo = new Date("Oct 28, 2024 18:25:00").getTime();

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

function publicidad() {
    const bannersEstaticos = [
        {
            imagen: 'url("../assets/publi_estatica.jpeg")',
            url: 'https://www.finanzas.com/'
        },
        {
            imagen: 'url("../assets/publi_estatica2.jpeg")',
            url: 'https://www.emagister.com/'
        },
        {
            imagen: 'url("../assets/publi_estatica3.jpeg")',
            url: 'https://www.vivagym.es/'
        },
        {
            imagen: 'url("../assets/publi_estatica4.jpeg")',
            url: 'https://www.viajes.com/'
        },
        {
            imagen: 'url("../assets/publi_estatica5.jpeg")',
            url: 'https://www.primevideo.com/'
        },
        {
            imagen: 'url("../assets/publi_estatica6.jpeg")',
            url: 'https://algo-bonito.com/'
        },
        {
            imagen: 'url("../assets/publi_estatica7.jpeg")',
            url: 'https://medlineplus.gov/spanish/mentalhealth.html'
        },
        {
            imagen: 'url("../assets/publi_estatica8.jpeg")',
            url: 'https://play.google.com/store/apps/details?id=com.LionGames.BattleHero.v2&hl=es_AR'
        }
    ];


    // Función para seleccionar una imagen aleatoria
    function bannerAleatorio() {
        const indiceAleatorio = Math.floor(Math.random() * bannersEstaticos.length);
        return bannersEstaticos[indiceAleatorio];
    }
    var publicidad1 = document.getElementById("publicidad1");
    var publicidad2 = document.getElementById("publicidad2");

    var banner1 = bannerAleatorio();
    var banner2 = bannerAleatorio();
    //Al cargar la pagina tenemos un anuncio distinto
    publicidad1.style.backgroundImage = banner1.imagen;
    publicidad2.style.backgroundImage = banner2.imagen;

    // Asignar las urls a los contenedores segun el banner 
    publicidad1.onclick = function () {
        window.open(banner1.url, '_blank');
    };
    publicidad2.onclick = function () {
        window.open(banner2.url, '_blank');
    };




}


// Función para manejar la respuesta de autenticación
function handleAuthResponse(tokenResponse) {
    if (tokenResponse && tokenResponse.access_token) {
        fetchUserData(tokenResponse.access_token);
    }
}

// Función para obtener datos del usuario usando el token de acceso y realizar el autocompletado
function fetchUserData(accessToken) {
    fetch('https://people.googleapis.com/v1/people/me?personFields=names,emailAddresses', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(response => response.json())
        .then(data => {


            if (data.names && data.names.length > 0) {
                document.getElementById('nombre').value = data.names[0].givenName || '';
                document.getElementById('apellidos').value = data.names[0].familyName || '';
            }
            if (data.emailAddresses && data.emailAddresses.length > 0) {
                document.getElementById('email').value = data.emailAddresses[0].value || '';
            }

            //ESCONDER EL BOTON UNA VEZ AUTOCOMPLETADO LOS CAMPOS 
            document.getElementById("botonGoogle").style.display = "none";
        }).catch(error => {
            console.error("Error al obtener los datos del usuario:", error);
        });
}

// Función para crear una cookie
function setCookie(name, value, days) {
    const fechaActual = new Date();
    fechaActual.setTime(fechaActual.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + fechaActual.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Función para leer una cookie (devuelve su valor segun su nombre)
function getCookie(name) {
    //Prefijo cookie
    const nameEQ = name + "=";
    //obtenemos todas las cookies en un array
    const cookiesArray = document.cookie.split(';');


    for (i = 0; i < cookiesArray.length; i++) {
        // Removemos espacios iniciales (en caso de que haya) del valor de la cookie actual
        let c = cookiesArray[i].trim();

        // Verificamos si esta cookie empieza con el prefijo de la cookie buscada
        if (c.indexOf(nameEQ) === 0) {
            // Si coincide, extraemos el valor de la cookie desde el índice donde termina el nombre y retorna ese valor
            return c.substring(nameEQ.length, c.length);
        }
    }

    //Devolvemos null si no se encuentra la cookie
    return null;
}

// Función para comprobar si la cookie de consentimiento existe y el usuario la aceptado
function checkCookieConsent() {
    return getCookie("cookieConsent") === "true";
}

// Mostrar el modal de cookies
function mostrarModalCookies() {
    const modalCookies = document.getElementById("cookieModal");
    modalCookies.style.display = "block";

}

// Función para aceptar cookies
function acceptCookies() {
    setCookie("cookieConsent", "true", 30); // Cookie dura 30 días
    document.getElementById("cookieModal").style.display = "none";

}

// Función para rechazar cookies
function rejectCookies() {
    setCookie("cookieConsent", "false", 30);
    document.getElementById("cookieModal").style.display = "none";

}

