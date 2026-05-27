const Formulario = require('../models/Formulario');

exports.getFormularios = async () => {

    return await Formulario.find();
};

exports.getFormularioById = async (id) => {

    const formulario = await Formulario.findById(id);

    if (!formulario) {
        throw new Error('Formulario no encontrado');
    }

    return formulario;
};

exports.crearFormulario = async (data) => {

    const nuevoFormulario = new Formulario(data);

    return await nuevoFormulario.save();
};

exports.actualizarFormulario = async (id, data) => {

    const formulario =
        await Formulario.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!formulario) {
        throw new Error('Formulario no encontrado');
    }

    return formulario;
};

exports.eliminarFormulario = async (id) => {

    const formulario =
        await Formulario.findByIdAndDelete(id);

    if (!formulario) {
        throw new Error('Formulario no encontrado');
    }

    return formulario;
};