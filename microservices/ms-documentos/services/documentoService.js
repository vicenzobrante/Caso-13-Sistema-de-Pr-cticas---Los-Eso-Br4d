const Documento = require('../models/Documento');

exports.getDocumentos = async () => {

    return await Documento.find();
};

exports.getDocumentoById = async (id) => {

    const documento = await Documento.findById(id);

    if (!documento) {
        throw new Error('Documento no encontrado');
    }

    return documento;
};

exports.crearDocumento = async (data) => {

    const nuevoDocumento = new Documento(data);

    return await nuevoDocumento.save();
};

exports.actualizarDocumento = async (id, data) => {

    const documento =
        await Documento.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!documento) {
        throw new Error('Documento no encontrado');
    }

    return documento;
};

exports.eliminarDocumento = async (id) => {

    const documento =
        await Documento.findByIdAndDelete(id);

    if (!documento) {
        throw new Error('Documento no encontrado');
    }

    return documento;
};