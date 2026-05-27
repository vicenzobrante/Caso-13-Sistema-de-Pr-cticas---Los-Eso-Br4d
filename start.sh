#!/bin/bash

# Start all microservices in background
echo "Starting microservices..."

npm run ms-usuarios &
npm run ms-practicas &
npm run ms-evaluaciones &
npm run ms-documentos &
npm run ms-notificaciones &

# Wait a bit for services to boot before starting gateway
sleep 2
npm run gateway &

echo "All services started. Press Ctrl+C to stop all."

# Wait and kill all background jobs on Ctrl+C
wait
