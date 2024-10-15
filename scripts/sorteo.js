//ANALITICAS VERCEL 
import { inject } from "@vercel/analytics";
function MyApp({ Component, pageProps }) {
    // Inyecta Vercel Analytics en tu aplicación
    inject();

    return <Component {...pageProps} />;
}

export default MyApp;

const modal = document.getElementById("modal");
const botonParticipar = document.getElementById("participar");
const formulario = document.getElementById("formulario");



formulario.addEventListener("submit", function (event) {
    //MODAL CONFIRMAR PARTICIPACION
    modal.style.display = "block";
    //REGISTRAR EN BASE DE DATOS
    const nombre = document.getElementById("nombre").value;
    const apellidos = document.getElementById("apellidos").value;
    const email = document.getElementById("email").value;

    // Enviar los datos al servidor para guardarlos en MongoDB
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellidos, email }),
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            alert(data);  // Mostrar mensaje de éxito o error al usuario
        })
        .catch(error => {
            console.error("Error al registrar usuario:", error);
            alert("Error al registrar usuario.");
        });



    /*MANDAR CORREO CONFIRMACION
    event.preventDefault();
    const serviceID = 'service_dy20kyj';
    const templateID = 'template_pz76sxi';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {

            alert('Sent!');
        }, (err) => {

            alert(JSON.stringify(err));
        });
    */
});

//EVENTO PARA CERRAR EL MODAL AL PULSAR FUERA
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});


