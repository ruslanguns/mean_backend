// Requires Importacion de librerias para que funcione el proyecto....
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var cors = require('cors');



// Inicializar variables
var app = express();


// ====================================
// CORS
// ====================================
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Contro-Allow-Methods", "POST, GET, PUT, DELETE");
//     next();
// });

app.use(cors());

app.get('/', function(req, res, next) {
    res.json({
        msg: 'This is CORS-enabled for all origins!'
    });
});
app.head('/', function(req, res, next) {
    res.json({
        msg: 'This is CORS-enabled for all origins!'
    });
});
app.post('/', function(req, res, next) {
    res.json({
        msg: 'This is CORS-enabled for all origins!'
    });
});
app.put('/', function(req, res, next) {
    res.json({
        msg: 'This is CORS-enabled for all origins!'
    });
});
app.delete('/', function(req, res, next) {
    res.json({
        msg: 'This is CORS-enabled for all origins!'
    });
});


// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); // parse application/json

// Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');
var settingsRoutes = require('./routes/settings');
// mailing routes
var mailRoutes = require('./routes/mail');
var resetPassRoutes = require('./routes/resetpass');


// ====================================
// conection a la base de datos
// ====================================
mongoose.set('useCreateIndex', true);
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', {
    useNewUrlParser: true
}, (err, res) => {

    if (err) throw err;

    console.log(`La base de datos ${ cverde }`, 'Online');
});


// ====================================
// Conection a la base de datos mlab
// ====================================

// var mongodbUri = 'mongodb://@ds227654.mlab.com:27654/ruslan';
// var mongodbUri = 'mongodb://ds127624.mlab.com:27624/hospitaldb';
// // mongoose.connect(mongodbUri, {
// mongoose.connect(mongodbUri, {
//     useNewUrlParser: true,
//     // auth: {
//     //     user: 'ruslan',
//     //     password: 'Ruslan123'
//     // }
//     auth: {
//         user: 'jcarlos2',
//         password: '101066jcarlos'
//     }
// })
// var conn = mongoose.connection;
// conn.on('error', console.error.bind(console, 'Hay una error en la conexión de la base de datos:'));

// conn.once('open', () => {
//     console.log(`La base de datos ${ cverde }`, 'Online')
// });


// Server index config — GESTOR DE ARCHIVOS se prueba ingresando al localhost:3000/uploads
////////////////////////////////////////
/*
var serverIndex = require('serve-index');
app.use(express.static(__dirname + '/'))
app.use('/uploads', serverIndex(__dirname + '/uploads'));
*/


// RUTAS
// midelwhere — se ejecuta antes de que se resuelvan otras rutas
app.use('/mail', mailRoutes);
app.use('/resetpass', resetPassRoutes);
app.use('/settings', settingsRoutes);
app.use('/usuario', usuarioRoutes); // se define arriba porque sino se colocarian abajo
app.use('/login', loginRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);

app.use('/', appRoutes);


// color consola
var cverde = '\x1b[32m%s\x1b[0m';

// Escuchar peticiones
app.listen(3000, () => {
    console.log(`El servidor Express esta corriendo en el puerto 3000: ${ cverde }`, 'Online');
});