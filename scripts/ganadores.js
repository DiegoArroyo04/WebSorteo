// Array para almacenar los participantes
var participantes = [];
window.onload = async function () {


    // Llama a obtenerParticipantes y espera su resultado
    participantes = await obtenerParticipantes();

    realizarSorteo(participantes);



};

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
