// Array para almacenar los participantes
var participantes = [];
var ganadores = [];

window.onload = async function () {

    //EJECUTA CUANDO ENTRAMOS A LA PAGINA DE GANADORES 
    if (window.location.pathname.includes('ganadores.html')) {
        try {
            // Llama a obtenerParticipantes y espera su resultado
            participantes = await obtenerParticipantes();

            // Llama a obtenerGanadores y espera su resultado
            ganadores = await obtenerGanadores();

            // Realiza el sorteo si no hay ganadores
            if (ganadores.length === 0) {
                realizarSorteo(participantes);


            } else {


                document.getElementById("ganador1").innerHTML = ganadores[0].nombre + " " + ganadores[0].apellidos;
                document.getElementById("ganador2").innerHTML = ganadores[1].nombre + " " + ganadores[1].apellidos;
                document.getElementById("ganador3").innerHTML = ganadores[2].nombre + " " + ganadores[2].apellidos;
                document.getElementById("ganador4").innerHTML = ganadores[3].nombre + " " + ganadores[3].apellidos;
                document.getElementById("ganador5").innerHTML = ganadores[4].nombre + " " + ganadores[4].apellidos;
                document.getElementById("ganador6").innerHTML = ganadores[5].nombre + " " + ganadores[5].apellidos;
                document.getElementById("ganador7").innerHTML = ganadores[6].nombre + " " + ganadores[6].apellidos;
                document.getElementById("ganador8").innerHTML = ganadores[7].nombre + " " + ganadores[7].apellidos;
                document.getElementById("ganador9").innerHTML = ganadores[8].nombre + " " + ganadores[8].apellidos;
                document.getElementById("ganador10").innerHTML = ganadores[9].nombre + " " + ganadores[9].apellidos;

                // Ocultar la pantalla de carga
                document.getElementById("preload").classList.add("hidden");

                const jsConfetti = new JSConfetti();
                jsConfetti.addConfetti();



            }


        } catch (error) {
            console.error("Error en la carga de ganadores:", error);
        }
    }
};

//MANDAR CORREO DE ENHORABUENA A LOS GANADORES
function mandarCorreoEnhorabuena(ganadorEmail, ganadorNombre, ganadorApellidos) {

    const serviceID = 'service_ygs1sy4';
    const templateID = 'template_0aqqah9';
    var ganador = {
        email: ganadorEmail, nombre: ganadorNombre, apellidos: ganadorApellidos
    };

    return emailjs.send(serviceID, templateID, ganador)
        .then(() => {

        }, (err) => {


        });

}

// Función para obtener los participantes desde el servidor
async function obtenerParticipantes() {
    try {
        // Hacemos una solicitud GET al endpoint /participantes
        const response = await fetch('/participantes');

        // Convertimos la respuesta a JSON y la retornamos directamente
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}


async function realizarSorteo(participantes) {


    //MOSTRAR EL PRELOAD MIENTRAS SE REALIZA EL SORTEO
    document.getElementById("contenidoPreload").innerHTML = "Realizando sorteo... Espere por favor."
    document.getElementById("preload").classList.add("mostrar");


    var ganadores = [];

    // BUSCAMOS 10 GANADORES
    while (ganadores.length < 10) {
        // Seleccionamos un ganador aleatorio
        var aleatorio = Math.floor(Math.random() * participantes.length);
        var ganador = participantes[aleatorio];
        var ganadorExiste = false;

        // Comprobamos si ya está en la lista de ganadores
        for (i = 0; i < ganadores.length; i++) {
            if (ganadores[i].email == ganador.email) {
                ganadorExiste = true;
                break;
            }
        }

        // Si no está en la lista, lo añadimos
        if (ganadorExiste == false) {
            ganadores.push(ganador);
        }
    }

    await guardarGanadores(ganadores);

    ganadores = await obtenerGanadores();

    // Enviar correos con una espera de 3 segundos entre cada envío para no saturar
    for (const ganador of ganadores) {
        await new Promise(resolve => setTimeout(resolve, 3000)); // Espera de 3 segundos
        mandarCorreoEnhorabuena(ganador.email, ganador.nombre, ganador.apellidos);
    }

    // Recargar la página después de realizar el sorteo
    window.location.reload();

}
// Función para enviar los ganadores al servidor
async function guardarGanadores(ganadores) {
    try {
        const response = await fetch('/guardar-ganadores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ganadores }),
        });



        if (response.ok) {
            console.log("Ganadores guardados correctamente en el servidor.");
        } else {
            console.error("Error al guardar ganadores en el servidor.");
        }

    } catch (error) {
        console.error("Error al enviar ganadores al servidor:", error);
    }
}

// Función para obtener los ganadores desde el servidor
async function obtenerGanadores() {
    try {
        const response = await fetch('/ganadores');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener ganadores:', error);
    }
}