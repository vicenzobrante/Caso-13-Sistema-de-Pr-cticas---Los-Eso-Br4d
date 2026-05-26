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
const GraphQLJSON = require('graphql-type-json');

const Alumno = require('./models/Alumno'); //check
const Usuario = require('./models/Usuario'); //check
const Notificacion = require('./models/Notificacion');//check
const Practica = require('./models/Practica');//check
const Documento = require('./models/Documento');//check
const InformePractica = require('./models/InformePractica');//check
const Acta1 = require('./models/Acta1');//check
const Acta2 = require('./models/Acta2');//check
const ActaFinal = require('./models/ActaFinal');//check
const Carrera = require('./models/Carrera');//check
const CentroPractica = require('./models/CentroPractica');//check
const CoordinadorCarrera = require('./models/CoordinadorCarrera');//check
const Docente  = require('./models/Docente');//check
const DocumentoApoyo = require('./models/DocumentoApoyo');//check
const Empleador = require('./models/Empleador');//check
const EvaluacionInformePractica = require('./models/EvaluacionInformePractica');//check
const Formulario = require('./models/Formulario');//check
const JefeCarrera = require('./models/JefeCarrera');//check
const Sede = require('./models/Sede');//check


const typeDefs = gql`
    #Cosas miscelaneas
    scalar JSON
    type Carrera {
        id: ID!
        nombre: String!
    }
    type Sede {
        id: ID!
        nombre: String!
        ubicacion: String!
    }
    type Notificacion {
        id: ID!
        usuario: Usuario!
        mensaje: String!
        leido: Boolean!
        fechaEnvio: String!
    }
    type CentroPractica {
        id: ID!
        nombreEmpresa: String!
        direccion: String!
        telefono: String!
        rubro: String!
    }
    # Usuarios....
    type Usuario {
        id: ID!
        nombre: String!
        apellido: String!
        correo: String!
        contrasena: String!
        telefono: String!
    }

    type Alumno {
        id: ID!
        usuario: Usuario!
        carrera: Carrera!
        semestre: Int!
    }
    type Docente {
        id: ID!
        usuario: Usuario!
        carrera: Carrera!
        sede: Sede!
    }
    type CoordinadorCarrera {
        id: ID!
        usuario: Usuario!
        carrera: Carrera!
        sede: Sede!
    }
    type Empleador {
        id: ID!
        usuario: Usuario!
        empresa: CentroPractica!
        cargo: String!
    }
    type JefeCarrera {
        id: ID!
        usuario: Usuario!
        carrera: Carrera!
        sede: Sede!
    }
    
    
    #Documentos!!!!
    type Documento {
        id: ID!
        nombre: String!
        fechaSubida: String!
        urlArchivo: String!
    }
    type InformePractica {
        id: ID!
        documento: Documento!
        estado: Boolean!
        observaciones: String
    }
    type DocumentoApoyo {
        id: ID!
        documento: Documento!
        nombre: String!
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
    #Formularios !!!!!
    type Formulario {
        id: ID!
        fecha: String!
        estado: Boolean!
    }
    type Acta1 {
        id: ID!
        formulario: Formulario!
        centrodepractica: CentroPractica!
        online: Boolean!
    }
    type Acta2 {
        id: ID!
        formulario: Formulario!
        criterios: JSON!
        notaPonderada: Float
                
    }
    type EvaluacionInformePractica {
        id: ID!
        formulario: Formulario!
        criterios: JSON!
        informePractica: InformePractica!
        notaPonderada: Float

    }
    type ActaFinal {
        id: ID!
        formulario: Formulario!
        acta2: Acta2!
        evaluacionInformePractica: EvaluacionInformePractica!
        notaPonderada: Float
        
    }
    #TODO: QUERIES PARA EL REST BASICO PARA TODOS LOS TYPEDEFS
    #TODO: MUTATIONS PARA TODOS LOS TYPEDEFS
    type Query {
        getActa1(id: ID!): Acta1
        getActas1: [Acta1]
        
        getActa2(id: ID!): Acta2
        getActas2: [Acta2]
        
        getActaFinal(id: ID!): ActaFinal
        getActasFinal: [ActaFinal]

        getAlumno(id: ID!): Alumno
        getAlumnos: [Alumno]
        
        getCarrera(id: ID!): Carrera
        getCarreras: [Carrera]
        
        getCentroPractica(id: ID!): CentroPractica
        getCentrosPractica: [CentroPractica]
        
        getCoordinadorCarrera(id: ID!): CoordinadorCarrera
        getCoordinadoresCarrera: [CoordinadorCarrera]
        
        getDocente(id: ID!): Docente
        getDocentes: [Docente]
        
        getDocumento(id: ID!): Documento
        getDocumentos: [Documento]
        
        getDocumentoApoyo(id: ID!): DocumentoApoyo
        getDocumentosApoyo: [DocumentoApoyo]
        
        getEmpleador(id: ID!): Empleador
        getEmpleadores: [Empleador]
        
        getEvaluacionInformePractica(id: ID!): EvaluacionInformePractica
        getEvaluacionesInformesPractica: [EvaluacionInformePractica]
        
        getFormulario(id: ID!): Formulario
        getFormularios: [Formulario]
        
        getInformePractica(id: ID!): InformePractica
        getInformesPractica: [InformePractica]
        
        getJefeCarrera(id: ID!): JefeCarrera
        getJefesCarrera: [JefeCarrera]
        
        getNotificacion(id: ID!): Notificacion
        getNotifiaciones: [Notificacion]

        getPracticas: [Practica]
        getPractica(id: ID!): Practica
        
        getSede(id: ID!): Sede
        getSedes: [Sede]
        
        getUsuario(id: ID!): Usuario
        getUsuarios: [Usuario]
        
    }
    
    #Favor colocar las mutations aca debajo de las queries solo por un tema de orden
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