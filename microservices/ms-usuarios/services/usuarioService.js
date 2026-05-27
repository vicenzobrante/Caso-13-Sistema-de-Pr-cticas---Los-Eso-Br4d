const Usuario = require('../models/Usuario');

const {
    hashPassword,
    comparePassword
} = require('../utils/hashPassword');

const jwt = require('jsonwebtoken');

exports.getUsuarios = async () => {

    return await Usuario.find();
};

exports.getUsuarioById = async (id) => {

    const usuario = await Usuario.findById(id);

    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    return usuario;
};

exports.crearUsuario = async (data) => {

    const existe = await Usuario.findOne({
        correo: data.correo
    });

    if (existe) {
        throw new Error('El correo ya está registrado');
    }

    const passwordHasheada =
        await hashPassword(data.contrasena);

    const nuevoUsuario = new Usuario({
        ...data,
        contrasena: passwordHasheada
    });

    return await nuevoUsuario.save();
};

exports.loginUsuario = async (data) => {

    const usuario = await Usuario.findOne({
        correo: data.correo
    });

    if (!usuario) {
        throw new Error('Credenciales inválidas');
    }

    const passwordCorrecta =
        await comparePassword(
            data.contrasena,
            usuario.contrasena
        );

    if (!passwordCorrecta) {
        throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign(
        {
            id: usuario._id,
            correo: usuario.correo
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    );

    return {
        token,
        usuario
    };
};

exports.actualizarUsuario = async (
    id,
    data
) => {

    if (data.contrasena) {

        data.contrasena =
            await hashPassword(data.contrasena);
    }

    const usuario =
        await Usuario.findByIdAndUpdate(
            id,
            data,
            {
                new: true
            }
        );

    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    return usuario;
};

exports.eliminarUsuario = async (id) => {

    const usuario =
        await Usuario.findByIdAndDelete(id);

    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }

    return {
        message:
            'Usuario eliminado correctamente'
    };
};