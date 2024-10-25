// Array para almacenar los participantes
var participantes = [];
window.onload = async function () {


    // Llama a obtenerParticipantes y espera su resultado
    participantes = await obtenerParticipantes();

    // Imprime los participantes en la consola
    console.log(participantes);
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
