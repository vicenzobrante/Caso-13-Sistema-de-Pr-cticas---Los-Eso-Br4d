const CentroPractica = require('../models/CentroPractica');

exports.getCentroPracticas = async () => {

    return await CentroPractica.find();
};

exports.getCentroPracticaById = async (id) => {

    const centroPractica = await CentroPractica.findById(id);

    if (!centroPractica) {
        throw new Error('CentroPractica no encontrada');
    }

    return centroPractica;
};

exports.crearCentroPractica = async (data) => {

    const nuevoCentroPractica = new CentroPractica(data);

    return await nuevoCentroPractica.save();
};

exports.actualizarCentroPractica = async (id, data) => {

    const centroPractica =
        await CentroPractica.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!centroPractica) {
        throw new Error('CentroPractica no encontrada');
    }

    return centroPractica;
};

exports.eliminarCentroPractica = async (id) => {

    const centroPractica =
        await CentroPractica.findByIdAndDelete(id);

    if (!centroPractica) {
        throw new Error('CentroPractica no encontrada');
    }

    return centroPractica;
};