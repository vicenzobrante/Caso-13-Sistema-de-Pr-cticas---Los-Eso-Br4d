const Notificacion = require('../models/Notificacion');

exports.getNotificacions = async () => {

    return await Notificacion.find();
};

exports.getNotificacionById = async (id) => {

    const notificacion = await Notificacion.findById(id);

    if (!notificacion) {
        throw new Error('Notificacion no encontrada');
    }

    return notificacion;
};

exports.crearNotificacion = async (data) => {

    const nuevoNotificacion = new Notificacion(data);

    return await nuevoNotificacion.save();
};

exports.actualizarNotificacion = async (id, data) => {

    const notificacion =
        await Notificacion.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!notificacion) {
        throw new Error('Notificacion no encontrada');
    }

    return notificacion;
};

exports.eliminarNotificacion = async (id) => {

    const notificacion =
        await Notificacion.findByIdAndDelete(id);

    if (!notificacion) {
        throw new Error('Notificacion no encontrada');
    }

    return notificacion;
};