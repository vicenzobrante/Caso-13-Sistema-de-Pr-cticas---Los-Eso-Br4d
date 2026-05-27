require('dotenv').config();

const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');

const errorHandler =
    require('./middlewares/errorHandler');

const documentoRoutes =
    require('./routes/documentoRoutes');

const documentoApoyoRoutes =
    require('./routes/documentoApoyoRoutes');

const informePracticaRoutes =
    require('./routes/informePracticaRoutes');

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use('/documento', documentoRoutes);

app.use('/documentoApoyo', documentoApoyoRoutes);

app.use('/informePractica', informePracticaRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {

    console.log(
        `[ms-documentos] Escuchando en puerto ${PORT}`
    );
});