// Requires Importacion de librerias para que funcione el proyecto....
var express = require('express');
var mongoose = require('mongoose');



// Inicializar variables
var app = express();


// Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');


// conection a la base de datos
mongoose.connection.openUri('mongodb://127.0.0.1:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log(`La base de datos ${ cverde }`, 'Online');
});


// midelwhere — se ejecuta antes de que se resuelvan otras rutas
app.use('/usuario', usuarioRoutes); // se define arriba porque sino se colocarian abajo
app.use('/', appRoutes);


// color consola
var cverde = '\x1b[32m%s\x1b[0m';


// Escuchar peticiones
app.listen(3000, () => {
    console.log(`El servidor Express esta corriendo en el puerto 3000: ${ cverde }`, 'Online');
});