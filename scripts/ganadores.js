window.onload = obtenerParticipantes();

// Array para almacenar los participantes
var participantes = [];

// Función para obtener los participantes desde el servidor
async function obtenerParticipantes() {
    try {
        // Hacemos una solicitud GET al endpoint /participantes
        const response = await fetch('/participantes');

        // Verificamos si la respuesta fue correcta
        if (!response.ok) {
            throw new Error('Error al obtener los participantes');
        }

        // Convertimos la respuesta a JSON y la almacenamos en el array
        participantes = await response.json();


    } catch (error) {
        console.error('Error:', error);
    }
}




