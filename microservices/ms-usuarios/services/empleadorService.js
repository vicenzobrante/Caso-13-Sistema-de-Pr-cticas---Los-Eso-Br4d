const Empleador = require('../models/Empleador');

exports.getEmpleadores = async () => {

    return await Empleador.find();
};

exports.getEmpleadorById = async (id) => {

    const empleador =
        await Empleador.findById(id);

    if (!empleador) {
        throw new Error('Empleador no encontrado');
    }

    return empleador;
};

exports.crearEmpleador = async (data) => {

    const nuevoEmpleador =
        new Empleador(data);

    return await nuevoEmpleador.save();
};

exports.actualizarEmpleador = async (id, data) => {

    const empleador =
        await Empleador.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!empleador) {
        throw new Error('Empleador no encontrado');
    }

    return empleador;
};

exports.eliminarEmpleador = async (id) => {

    const empleador =
        await Empleador.findByIdAndDelete(id);

    if (!empleador) {
        throw new Error('Empleador no encontrado');
    }

    return empleador;
};