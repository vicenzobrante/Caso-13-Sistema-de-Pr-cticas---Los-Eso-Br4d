const JefeCarrera =
    require('../models/JefeCarrera');

exports.getJefesCarrera = async () => {

    return await JefeCarrera.find();
};

exports.getJefeCarreraById = async (id) => {

    const jefe =
        await JefeCarrera.findById(id);

    if (!jefe) {
        throw new Error('Jefe de carrera no encontrado');
    }

    return jefe;
};

exports.crearJefeCarrera = async (data) => {

    const nuevoJefe =
        new JefeCarrera(data);

    return await nuevoJefe.save();
};

exports.actualizarJefeCarrera = async (id, data) => {

    const jefe =
        await JefeCarrera.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );

    if (!jefe) {
        throw new Error('Jefe de carrera no encontrado');
    }

    return jefe;
};

exports.eliminarJefeCarrera = async (id) => {

    const jefe =
        await JefeCarrera.findByIdAndDelete(id);

    if (!jefe) {
        throw new Error('Jefe de carrera no encontrado');
    }

    return jefe;
};