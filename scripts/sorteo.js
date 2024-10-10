const modal = document.getElementById("modal");
const botonParticipar = document.getElementById("participar");
const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function (event) {
    //MODAL CONFIRMAR PARTICIPACION
    modal.style.display = "block";
    //REGISTRAR EN BASE DE DATOS




    //MANDAR CORREO CONFIRMACION
    event.preventDefault();
    const serviceID = 'service_dy20kyj';
    const templateID = 'template_pz76sxi';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {

            alert('Sent!');
        }, (err) => {

            alert(JSON.stringify(err));
        });

});

//EVENTO PARA CERRAR EL MODAL AL PULSAR FUERA
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
