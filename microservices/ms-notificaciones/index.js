require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const errorHandler =
    require('./middlewares/errorHandler');

const notificacionRoutes =
    require('./routes/notificacionRoutes');

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use('/notificacion', notificacionRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => {

    console.log(
        `[ms-notificaciones] Escuchando en puerto ${PORT}`
    );
});