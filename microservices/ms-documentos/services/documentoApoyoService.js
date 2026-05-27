const DocumentoApoyo = require('../models/DocumentoApoyo');

exports.getDocumentoApoyos = async () => {

    return await DocumentoApoyo.find();
};

exports.getDocumentoApoyoById = async (id) => {

    const documentoApoyo = await DocumentoApoyo.findById(id);

    if (!documentoApoyo) {
        throw new Error('Documento Apoyo no encontrado');
    }

    return documentoApoyo;
};

exports.crearDocumentoApoyo = async (data) => {

    const nuevoDocumentoApoyo = new DocumentoApoyo(data);

    return await nuevoDocumentoApoyo.save();
};

exports.actualizarDocumentoApoyo = async (id, data) => {

    const documentoApoyo =
        await DocumentoApoyo.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!documentoApoyo) {
        throw new Error('Documento Apoyo no encontrado');
    }

    return documentoApoyo;
};

exports.eliminarDocumentoApoyo = async (id) => {

    const documentoApoyo =
        await DocumentoApoyo.findByIdAndDelete(id);

    if (!documentoApoyo) {
        throw new Error('Documento Apoyo no encontrado');
    }

    return documentoApoyo;
};