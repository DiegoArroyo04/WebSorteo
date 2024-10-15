const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Conexión a MongoDB usando la URI desde una variable de entorno
const uri = process.env.MONGODB_URI;  // Aquí usaremos la variable de entorno
console.log("Conexión a MongoDB con URI:", process.env.MONGODB_URI);
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Middleware para procesar datos JSON y formularios
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sirviendo archivos estáticos
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/scripts', express.static(path.join(__dirname, '../scripts')));
app.use('/styles', express.static(path.join(__dirname, '../styles')));

// Ruta para servir el archivo `index.html` desde la raíz
app.get('/', (req, res) => {
    res.send('Servidor Express funcionando en Vercel');
})

// Ruta para manejar el registro del formulario
app.post('/register', async (req, res) => {
    try {
        await client.connect();  // Conectarse a la base de datos
        const database = client.db("Sorteos");
        const collection = database.collection("voltrex");

        const { nombre, apellidos, email } = req.body;

        const result = await collection.insertOne({
            nombre,
            apellidos,
            email,
            fechaRegistro: new Date()
        });

        console.log("Usuario registrado:", result.insertedId);
        res.send("Registro exitoso");
    } catch (err) {
        console.error("Error al registrar el usuario:", err.message);
        res.status(500).send("Error al registrar el usuario: " + err.message);
    } finally {
        await client.close();  // Cierra la conexión a la base de datos
    }
});


// Exportar la aplicación para que Vercel la pueda utilizar
module.exports = app;

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
