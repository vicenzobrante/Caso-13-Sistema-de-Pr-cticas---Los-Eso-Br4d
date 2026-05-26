const { gql } = require('apollo-server-express');

const typeDefs = gql`
    scalar JSON
    type Carrera { id: ID! nombre: String! }
    type Sede { id: ID! nombre: String! ubicacion: String! }
    type Notificacion { id: ID! usuario: Usuario! mensaje: String! leido: Boolean! fechaEnvio: String! }
    type CentroPractica { id: ID! nombreEmpresa: String! direccion: String! telefono: String! rubro: String! }

    type Usuario { id: ID! nombre: String! apellido: String! correo: String! contrasena: String! telefono: String! }

    type Alumno { id: ID! usuario: Usuario! matricula: String! carrera: Carrera! semestre: Int! sede: Sede! }
    type Docente { id: ID! usuario: Usuario! carrera: Carrera! sede: Sede! }
    type CoordinadorCarrera { id: ID! usuario: Usuario! carrera: Carrera! sede: Sede! }
    type Empleador { id: ID! usuario: Usuario! empresa: CentroPractica! cargo: String! }
    type JefeCarrera { id: ID! usuario: Usuario! carrera: Carrera! sede: Sede! }

    input AlumnoInput { usuario: ID! matricula: String! carrera: ID! semestre: Int! sede: ID! }
    input AlumnoUpdateInput { usuario: ID matricula: String carrera: ID semestre: Int sede: ID }

    input UsuarioInput { nombre: String! apellido: String! correo: String! contrasena: String! telefono: String }
    input UsuarioUpdateInput { nombre: String apellido: String correo: String contrasena: String telefono: String }

    input CarreraInput { nombre: String! }
    input CarreraUpdateInput { nombre: String }

    input SedeInput { nombre: String! ubicacion: String! }
    input SedeUpdateInput { nombre: String ubicacion: String }

    input CentroPracticaInput { nombreEmpresa: String! direccion: String! telefono: String rubro: String }
    input CentroPracticaUpdateInput { nombreEmpresa: String direccion: String telefono: String rubro: String }

    input DocumentoInput { nombre: String! fechaSubida: String urlArchivo: String! }
    input DocumentoUpdateInput { nombre: String fechaSubida: String urlArchivo: String }

    input DocumentoApoyoInput { documento: ID! nombre: String! }
    input DocumentoApoyoUpdateInput { documento: ID nombre: String }

    input InformePracticaInput { documento: ID! estado: Boolean observaciones: String }
    input InformePracticaUpdateInput { documento: ID estado: Boolean observaciones: String }

    input PracticaInput { alumno: ID! docente: ID centro: ID! informe: ID fechaInicio: String! fechaTermino: String! tipo: String! estado: String }
    input PracticaUpdateInput { alumno: ID docente: ID centro: ID informe: ID fechaInicio: String fechaTermino: String tipo: String estado: String }

    input FormularioInput { fecha: String estado: Boolean }
    input FormularioUpdateInput { fecha: String estado: Boolean }

    input Acta1Input { formulario: ID! centroDePractica: ID! online: Boolean tareas: String! fechaTermino: String! }
    input Acta1UpdateInput { formulario: ID centroDePractica: ID online: Boolean tareas: String fechaTermino: String }

    input Acta2Input { formulario: ID! criterios: JSON! notaPonderada: Float }
    input Acta2UpdateInput { formulario: ID criterios: JSON notaPonderada: Float }

    input EvaluacionInformePracticaInput { formulario: ID! criterios: JSON! informePractica: ID! notaPonderada: Float }
    input EvaluacionInformePracticaUpdateInput { formulario: ID criterios: JSON informePractica: ID notaPonderada: Float }

    input ActaFinalInput { formulario: ID! acta2: ID! evaluacionInformePractica: ID! notaPonderada: Float }
    input ActaFinalUpdateInput { formulario: ID acta2: ID evaluacionInformePractica: ID notaPonderada: Float }

    input CoordinadorCarreraInput { usuario: ID! carrera: ID! sede: ID! }
    input CoordinadorCarreraUpdateInput { usuario: ID carrera: ID sede: ID }

    input DocenteInput { usuario: ID! carrera: ID! sede: ID! }
    input DocenteUpdateInput { usuario: ID carrera: ID sede: ID }

    input EmpleadorInput { usuario: ID! empresa: ID! cargo: String }
    input EmpleadorUpdateInput { usuario: ID empresa: ID cargo: String }

    input JefeCarreraInput { usuario: ID! carrera: ID! sede: ID! }
    input JefeCarreraUpdateInput { usuario: ID carrera: ID sede: ID }

    input NotificacionInput { usuario: ID! mensaje: String! leido: Boolean fechaEnvio: String }
    input NotificacionUpdateInput { usuario: ID mensaje: String leido: Boolean fechaEnvio: String }

    type Mutation {
        createAlumno(input: AlumnoInput!): Alumno
        updateAlumno(id: ID!, input: AlumnoUpdateInput!): Alumno
        deleteAlumno(id: ID!): Alumno

        createUsuario(input: UsuarioInput!): Usuario
        updateUsuario(id: ID!, input: UsuarioUpdateInput!): Usuario
        deleteUsuario(id: ID!): Usuario

        createCarrera(input: CarreraInput!): Carrera
        updateCarrera(id: ID!, input: CarreraUpdateInput!): Carrera
        deleteCarrera(id: ID!): Carrera

        createSede(input: SedeInput!): Sede
        updateSede(id: ID!, input: SedeUpdateInput!): Sede
        deleteSede(id: ID!): Sede

        createCentroPractica(input: CentroPracticaInput!): CentroPractica
        updateCentroPractica(id: ID!, input: CentroPracticaUpdateInput!): CentroPractica
        deleteCentroPractica(id: ID!): CentroPractica

        createDocumento(input: DocumentoInput!): Documento
        updateDocumento(id: ID!, input: DocumentoUpdateInput!): Documento
        deleteDocumento(id: ID!): Documento

        createDocumentoApoyo(input: DocumentoApoyoInput!): DocumentoApoyo
        updateDocumentoApoyo(id: ID!, input: DocumentoApoyoUpdateInput!): DocumentoApoyo
        deleteDocumentoApoyo(id: ID!): DocumentoApoyo

        createInformePractica(input: InformePracticaInput!): InformePractica
        updateInformePractica(id: ID!, input: InformePracticaUpdateInput!): InformePractica
        deleteInformePractica(id: ID!): InformePractica

        createPractica(input: PracticaInput!): Practica
        updatePractica(id: ID!, input: PracticaUpdateInput!): Practica
        deletePractica(id: ID!): Practica

        createFormulario(input: FormularioInput!): Formulario
        updateFormulario(id: ID!, input: FormularioUpdateInput!): Formulario
        deleteFormulario(id: ID!): Formulario

        createActa1(input: Acta1Input!): Acta1
        updateActa1(id: ID!, input: Acta1UpdateInput!): Acta1
        deleteActa1(id: ID!): Acta1

        createActa2(input: Acta2Input!): Acta2
        updateActa2(id: ID!, input: Acta2UpdateInput!): Acta2
        deleteActa2(id: ID!): Acta2

        createEvaluacionInformePractica(input: EvaluacionInformePracticaInput!): EvaluacionInformePractica
        updateEvaluacionInformePractica(id: ID!, input: EvaluacionInformePracticaUpdateInput!): EvaluacionInformePractica
        deleteEvaluacionInformePractica(id: ID!): EvaluacionInformePractica

        createActaFinal(input: ActaFinalInput!): ActaFinal
        updateActaFinal(id: ID!, input: ActaFinalUpdateInput!): ActaFinal
        deleteActaFinal(id: ID!): ActaFinal

        createCoordinadorCarrera(input: CoordinadorCarreraInput!): CoordinadorCarrera
        updateCoordinadorCarrera(id: ID!, input: CoordinadorCarreraUpdateInput!): CoordinadorCarrera
        deleteCoordinadorCarrera(id: ID!): CoordinadorCarrera

        createDocente(input: DocenteInput!): Docente
        updateDocente(id: ID!, input: DocenteUpdateInput!): Docente
        deleteDocente(id: ID!): Docente

        createEmpleador(input: EmpleadorInput!): Empleador
        updateEmpleador(id: ID!, input: EmpleadorUpdateInput!): Empleador
        deleteEmpleador(id: ID!): Empleador

        createJefeCarrera(input: JefeCarreraInput!): JefeCarrera
        updateJefeCarrera(id: ID!, input: JefeCarreraUpdateInput!): JefeCarrera
        deleteJefeCarrera(id: ID!): JefeCarrera

        createNotificacion(input: NotificacionInput!): Notificacion
        updateNotificacion(id: ID!, input: NotificacionUpdateInput!): Notificacion
        deleteNotificacion(id: ID!): Notificacion
    }

    type Documento { id: ID! nombre: String! fechaSubida: String! urlArchivo: String! }
    type InformePractica { id: ID! documento: Documento! estado: Boolean! observaciones: String }
    type DocumentoApoyo { id: ID! documento: Documento! nombre: String! }

    type Practica { id: ID! alumno: Alumno! docente: Docente centro: CentroPractica! informe: InformePractica fechaInicio: String! fechaTermino: String! tipo: String! estado: String! }
    type Formulario { id: ID! fecha: String! estado: Boolean! }
    type Acta1 { id: ID! formulario: Formulario! centroDePractica: CentroPractica! online: Boolean! tareas: String! fechaTermino: String! }
    type Acta2 { id: ID! formulario: Formulario! criterios: JSON! notaPonderada: Float }
    type EvaluacionInformePractica { id: ID! formulario: Formulario! criterios: JSON! informePractica: InformePractica! notaPonderada: Float }
    type ActaFinal { id: ID! formulario: Formulario! acta2: Acta2! evaluacionInformePractica: EvaluacionInformePractica! notaPonderada: Float }

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
        getNotificaciones: [Notificacion]
        getPractica(id: ID!): Practica
        getPracticas: [Practica]
        getSede(id: ID!): Sede
        getSedes: [Sede]
        getUsuario(id: ID!): Usuario
        getUsuarios: [Usuario]
    }
`;

module.exports = typeDefs;
