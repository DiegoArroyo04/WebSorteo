const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;  // Cambiar a la variable de entorno de Vercel

// Conexión a MongoDB 
const uri = "mongodb+srv://diegoarroyogonzalez04:1234@clustersorteos.vsy0f.mongodb.net/?retryWrites=true&w=majority";
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

// Ruta principal para servir el archivo `index.html`
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Ruta para manejar el registro del formulario
app.post('/register', async (req, res) => {
    try {
        await client.connect();
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
        console.error("Error al registrar el usuario:", err);
        res.status(500).send("Error al registrar el usuario");
    } finally {
        await client.close();
    }
});

// Iniciar el servidor (no es necesario en Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
}

module.exports = app;  // Exportar app para Vercel

