var express = require('express');

// inicializarlo
var app = express();

//  Importacion del modelo de usuarios
var Usuario = require('../models/usuario');

// Rutas
app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img role')
        .exec(
            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar los usuarios',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });

            });



});

module.exports = app;