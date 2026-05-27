require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

// El gateway es el único punto de entrada para el frontend.
// No tiene base de datos propia: todo lo delega a los microservicios via HTTP REST.
// Si en el futuro se necesita autenticación, se puede agregar acá en el contexto.

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Por ahora solo pasamos los headers por si algún microservicio necesita
    // validar un token en el futuro
    return { headers: req.headers };
  },
  formatError: (err) => {
    // Evitar exponer stack traces en producción
    console.error('[gateway] Error GraphQL:', err.message);
    return {
      message: err.message,
      locations: err.locations,
      path: err.path,
    };
  },
});

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`\n🚀 Gateway GraphQL listo en ${url}`);
  console.log(`   Microservicio Usuarios      → ${process.env.MS_USUARIOS_URL || 'http://localhost:4001'}`);
  console.log(`   Microservicio Practicas     → ${process.env.MS_PRACTICAS_URL || 'http://localhost:4002'}`);
  console.log(`   Microservicio Evaluaciones  → ${process.env.MS_EVALUACIONES_URL || 'http://localhost:4003'}`);
  console.log(`   Microservicio Documentos    → ${process.env.MS_DOCUMENTOS_URL || 'http://localhost:4004'}`);
  console.log(`   Microservicio Notificaciones→ ${process.env.MS_NOTIFICACIONES_URL || 'http://localhost:4005'}\n`);
});
