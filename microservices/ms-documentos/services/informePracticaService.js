const InformePractica = require('../models/InformePractica');
const mongoose = require("mongoose");

exports.getInformePracticas = async () => {

    return await InformePractica.find();
};

exports.getInformePracticaById = async (id) => {

    const informePractica = await InformePractica.findById(id);

    if (!informePractica) {
        throw new Error('Informe Practica no encontrado');
    }

    return informePractica;
};

exports.crearInformePractica = async (data) => {

    const nuevoInformePractica = await mongoose.connection.db.collection('documentos').findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(data.documentoId) },
        {
            $set: {
                __t: 'Informe_Practica',
                estado: data.estado,
                observaciones: data.observaciones,
            }
        },
        { new: true, runValidators: true }
    );
    if (!nuevoInformePractica) {
        throw new Error('El usuario base no existe');
    }

    return await InformePractica.findById(nuevoInformePractica._id)
};

exports.actualizarInformePractica = async (id, data) => {

    const informePractica =
        await InformePractica.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!informePractica) {
        throw new Error('Informe Practica no encontrado');
    }

    return informePractica;
};

exports.eliminarInformePractica = async (id) => {

    const informePractica =
        await InformePractica.findByIdAndDelete(id);

    if (!informePractica) {
        throw new Error('Informe Practica no encontrado');
    }

    return informePractica;
};