const mongoose = require('mongoose');

// Connect to MongoDB; if no connection string or connection fails, fall back
// to an in-memory MongoDB for local testing (mongodb-memory-server).
module.exports = async function connectDB() {
    const opts = { useNewUrlParser: true, useUnifiedTopology: true };
    if (process.env.DB_CONNECTION_STRING) {
        try {
            await mongoose.connect(process.env.DB_CONNECTION_STRING, opts);
            console.log('Conexión a MongoDB exitosa');
            return;
        } catch (err) {
            console.error('Error al conectar a MongoDB:', err);
        }
    }
    // fallback to in-memory
    try {
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri, opts);
        console.log('Conectado a MongoDB en memoria para pruebas');
    } catch (err) {
        console.error('Fallo al iniciar MongoDB en memoria:', err);
    }
};
