require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const errorHandler =
    require('./middlewares/errorHandler');

const usuarioRoutes =
    require('./routes/usuarioRoutes');

const alumnoRoutes =
    require('./routes/alumnoRoutes');

const docenteRoutes =
    require('./routes/docenteRoutes');

const coordinadorRoutes =
    require('./routes/coordinadorRoutes');

const jefeCarreraRoutes =
    require('./routes/jefeCarreraRoutes');

const empleadorRoutes =
    require('./routes/empleadorRoutes');

const carreraRoutes =
    require('./routes/carreraRoutes');

const sedeRoutes =
    require('./routes/sedeRoutes');

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use('/usuarios', usuarioRoutes);

app.use('/carreras', carreraRoutes);

app.use('/sedes', sedeRoutes);

app.use('/alumnos', alumnoRoutes);

app.use('/docentes', docenteRoutes);

app.use('/coordinadores', coordinadorRoutes);

app.use('/jefes', jefeCarreraRoutes);

app.use('/empleadores', empleadorRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {

    console.log(
        `[ms-usuarios] Escuchando en puerto ${PORT}`
    );
});