require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const errorHandler =
    require('./middlewares/errorHandler');

const acta1Routes =
    require('./routes/acta1Routes');

const acta2Routes =
    require('./routes/acta2Routes');

const actaFinalRoutes =
    require('./routes/actaFinalRoutes');

const formularioRoutes =
    require('./routes/formularioRoutes');

const evaluacionInformePracticaRoutes =
    require('./routes/evaluacionInformePracticaRoutes');

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use('/acta1', acta1Routes);

app.use('/acta2', acta2Routes);

app.use('/actaFinal', actaFinalRoutes);

app.use('/evaluacionInformePractica', evaluacionInformePracticaRoutes);

app.use('/formulario', formularioRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {

    console.log(
        `[ms-evaluaciones] Escuchando en puerto ${PORT}`
    );
});