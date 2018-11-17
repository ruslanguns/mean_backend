// Requires Importacion de librerias para que funcione el proyecto....
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');



// Inicializar variables
var app = express();



// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse application/json

// Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');


// conection a la base de datos
mongoose.set('useCreateIndex', true);
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', { useNewUrlParser: true }, (err, res) => {

    if (err) throw err;

    console.log(`La base de datos ${ cverde }`, 'Online');
});

// RUTAS
// midelwhere — se ejecuta antes de que se resuelvan otras rutas
app.use('/usuario', usuarioRoutes); // se define arriba porque sino se colocarian abajo
app.use('/login', loginRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);

app.use('/', appRoutes);


// color consola
var cverde = '\x1b[32m%s\x1b[0m';

// Escuchar peticiones
app.listen(3000, () => {
    console.log(`El servidor Express esta corriendo en el puerto 3000: ${ cverde }`, 'Online');
});