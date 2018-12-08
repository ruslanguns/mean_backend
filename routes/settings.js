var express = require('express');

var mdAutenticacion = require('../middlewares/autenticacion');

// inicializarlo
var app = express();

//  Importacion del modelo de settings
var Settings = require('../models/settings');

// ====================================
// GET — Obtener listos settings
// ====================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0; // si viene un parametro, sino es cero
    desde = Number(desde);

    Settings.find({}, 'nombre logo calle ciudad provincia zip pais telefono vat web')
        .skip(desde)
        .limit(5)
        .exec(
            (err, settings) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar los settings',
                        errors: err
                    });
                }

                Settings.countDocuments({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        settings: settings
                    });
                });

            });
});

// ====================================
// PUT — Actualizar / Modificar las settings
// ====================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Settings.findById(id, (err, settings) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar las settings',
                errors: err
            });
        }

        if (!settings) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El settings con el id ' + id + ' no existe',
                errors: {
                    message: 'Estas settings no coinciden con la ID'
                }
            });
        }

        settings.nombre = body.nombre;
        settings.calle = body.calle;
        settings.ciudad = body.ciudad;
        settings.provincia = body.provincia;
        settings.zip = body.zip;
        settings.pais = body.pais;
        settings.telefono = body.telefono;
        settings.vat = body.vat;
        // settings.web = body.web;

        settings.save((err, settingsGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar al settings',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                settings: settingsGuardado
            });
        });
    });
});


// ====================================
// POST — Settings
// ====================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var settings = new Settings({
        nombre: body.nombre,
        logo: body.logo,
        calle: body.calle,
        ciudad: body.ciudad,
        provincia: body.provincia,
        zip: body.zip,
        pais: body.pais,
        telefono: body.telefono,
        vat: body.vat,
        web: body.web
    });

    // aqui mostramos como guaradar al medico...
    settings.save((err, settingsGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear la setting',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            settings: settingsGuardado
        });
    });
});

module.exports = app;