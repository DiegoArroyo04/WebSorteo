const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

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
        const { nombre, apellidos, email } = req.body;

        // Usar la URI del plugin de MongoDB de Vercel
        const uri = process.env.MONGODB_URI;

        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db("Sorteos");
        const collection = database.collection("voltrex");

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
    }
});

// Iniciar el servidor (solo para pruebas locales)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
}

module.exports = app; // Exportar app para Vercel
