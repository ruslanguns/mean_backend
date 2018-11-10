// Requires Importacion de librerias para que funcione el proyecto....
var express = require('express');
var mongoose = require('mongoose');



// Inicializar variables
var app = express();



// conection a la base de datos
mongoose.connection.openUri('mongodb://127.0.0.1:27017/hospitalDB', (err, res) => {

    if (err) throw err;

    console.log(`La base de datos ${ cverde }`, 'Online');
});



// Rutas
app.get('/', (req, res, next) => {

    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });

});


// color consola
var cverde = '\x1b[32m%s\x1b[0m';






// Escuchar peticiones
app.listen(3000, () => {
    console.log(`El servidor Express esta corriendo en el puerto 3000: ${ cverde }`, 'Online');
});