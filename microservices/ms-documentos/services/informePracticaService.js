const InformePractica = require('../models/InformePractica');

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

    const nuevoInformePractica = new InformePractica(data);

    return await nuevoInformePractica.save();
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