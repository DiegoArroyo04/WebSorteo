const modal = document.getElementById("modal");
const botonParticipar = document.getElementById("participar");

botonParticipar.addEventListener("click", function () {
    modal.style.display = "block";
    //REGISTRAR EN BASE DE DATOS


    //MODAL CONFIRMAR PARTICIPACION

    //MANDAR CORREO CONFIRMACION
});

//EVENTO PARA CERRAR EL MODAL AL PULSAR FUERA
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
