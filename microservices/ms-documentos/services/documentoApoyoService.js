const DocumentoApoyo = require('../models/DocumentoApoyo');
const mongoose = require("mongoose");

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

    const nuevoDocumentoApoyo = await mongoose.connection.db.collection('documentos').findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(data.documentoId) },
        {
            $set: {
                __t: 'Documento_Apoyo',
                titulo: data.titulo,
            }
        },
        { new: true, runValidators: true }
    );
    if (!nuevoDocumentoApoyo) {
        throw new Error('El usuario base no existe');
    }

    return await DocumentoApoyo.findById(nuevoDocumentoApoyo._id)
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