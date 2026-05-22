const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const {ApolloServer, gql} = require('apollo-server-express');

//const {graphqlExpress, graphiqlExpress} = require('graphql-server-express');
//const {makeExecutableSchema} = require('graphql-tools');
const {merge} = require('lodash');
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));


const Alumno = require('./models/Alumno');
const Usuario = require('./models/Usuario');
const Notificacion = require('./models/Notificacion');
const Practica = require('./models/Practica');
const Documento = require('./models/Documento');
const InformePractica = require('./models/InformePractica');

const typeDefs = gql`
    type Usuario {
        id: ID!
        nombre: String!
        apellido: String!
        correo: String!
        contrasena: String!
        telefono: String!
    }

    type Alumno {
        idAlumno: ID!
        usuario: Usuario!
        carrera: String!
        semestre: Int!
    }

    type Notificacion {
        idNotificacion: ID!
        usuario: Usuario!
        mensaje: String!
        leido: Boolean!
        fechaEnvio: String!
    }

    type Query {
        getUsuarios: [Usuario]
        getAlumnos: [Alumno]
        getNotificaciones: [Notificacion]
        getAlumno(id: ID!): Alumno
        getPracticas: [Practica]
        getPractica(id: ID!): Practica
    }

    type Documento {
        idDocumento: ID!
        nombre: String!
        fechaSubida: String!
        urlArchivo: String!
    }

    type Docente {
        id: ID!
    }

    type CentroPractica {
        idCentro: ID!
        nombreEmpresa: String!
        direccion: String!
        telefono: String!
        rubro: String!
    }

    type InformePractica {
        id: ID!
        documento: Documento!
        estado: Boolean!
        observaciones: String
    }

    type Practica {
        id: ID!
        alumno: Alumno!
        docente: Docente
        centro: CentroPractica!
        informe: InformePractica
        fechaInicio: String!
        fechaTermino: String!
        tipo: String!
        estado: String!
    }

`;

const resolvers = {
    Query: {
        getUsuarios: async () => await Usuario.find(),
        getAlumnos: async () => await Alumno.find().populate('usuario'),
        getNotificaciones: async () => await Notificacion.find().populate('usuario'),
        getAlumno: async (parent, args) => await Alumno.findById(args.id).populate('usuario'),
        getPracticas: async () => await Practica.find().populate('alumno').populate('docente').populate('centro').populate({path: 'informe', populate: {path: 'documento'}}),
        getPractica: async (parent, args) => await Practica.findById(args.id).populate('alumno').populate('docente').populate('centro').populate({path: 'informe', populate: {path: 'documento'}}),
    },
};

const server = new ApolloServer({typeDefs, resolvers});