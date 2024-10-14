const modal = document.getElementById("modal");
const botonParticipar = document.getElementById("participar");
const formulario = document.getElementById("formulario");



formulario.addEventListener("submit", function (event) {
    //MODAL CONFIRMAR PARTICIPACION
    modal.style.display = "block";
    //REGISTRAR EN BASE DE DATOS

    const { MongoClient, ServerApiVersion } = require('mongodb');
    const uri = "mongodb+srv://diegoarroyogonzalez04:<1234>@clustersorteos.vsy0f.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSorteos";
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    async function run() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();
            // Send a ping to confirm a successful connection
            await client.db("Sorteos").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            alert("Ping exitoso. Conexión exitosa a MongoDB.")
        } finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
    }
    run().catch(console.dir);



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


