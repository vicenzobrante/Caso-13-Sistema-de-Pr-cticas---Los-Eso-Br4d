require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const errorHandler =
    require('./middlewares/errorHandler');

const practicaRoutes =
    require('./routes/practicaRoutes');

const centroPracticaRoutes =
    require('./routes/centroPracticaRoutes');

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use('/practica', practicaRoutes);

app.use('/centroPractica', centroPracticaRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {

    console.log(
        `[ms-practicas] Escuchando en puerto ${PORT}`
    );
});