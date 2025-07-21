// Importa el framework Express para manejar las solicitudes HTTP
const express = require('express');
// Importa Morgan para el registro de solicitudes HTTP
const morgan = require('morgan');
// Importa las rutas definidas en el archivo routes.js
const routes = require('./routes');

// Crea una instancia de la aplicación Express
const app = express();

// Configura el puerto del servidor, utiliza el puerto proporcionado por el entorno o el puerto 3000 por defecto
app.set('port', process.env.PORT || 3000);

// Usa Morgan para registrar las solicitudes HTTP en el formato 'dev'
app.use(morgan('dev'));
// Habilita el análisis del cuerpo de solicitudes HTTP en formato JSON
app.use(express.json());
// Habilita el análisis del cuerpo de solicitudes HTTP en formato URL-encoded
app.use(express.urlencoded({ extended: false }));

// Monta las rutas definidas en el archivo routes.js en la raíz '/'
app.use('/', routes);

// Hace que el servidor escuche en el puerto configurado y muestra un mensaje de conexión exitosa
app.listen(app.get('port'), function () {
    console.log("Servidor conectado en puerto " + app.get('port'));
});

