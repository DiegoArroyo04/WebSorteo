// server.js

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

const uri = "mongodb+srv://diegoarroyogonzalez04:1234@clustersorteos.vsy0f.mongodb.net/?retryWrites=true&w=majority&appName=ClusterSorteos";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Middleware para parsear JSON (si lo necesitas)
app.use(express.json());

app.get('/pingMongo', async (req, res) => {
    try {
        // Conectar a MongoDB
        await client.connect();

        // Hacer ping a la base de datos
        await client.db("Sorteos").command({ ping: 1 });
        console.log("Ping exitoso. Conexión exitosa a MongoDB.");

        // Enviar respuesta exitosa
        res.status(200).send("Ping exitoso. Conexión exitosa a MongoDB.");
    } catch (error) {
        console.error("Error al hacer ping a MongoDB:", error);
        res.status(500).send("Error al hacer ping a MongoDB.");
    } finally {
        // Cerrar la conexión
        await client.close();
    }
});

// Levantar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
