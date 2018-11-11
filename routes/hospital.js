var express = require('express');
var jwt = require('jsonwebtoken');


var mdAutenticacion = require('../middlewares/autenticacion');



// inicializarlo
var app = express();



//  Importacion del modelo de hospitales
var Hospital = require('../models/hospital');

// ====================================
// GET — Obtener lista de hospitales
// ====================================
app.get('/', (req, res, next) => {

    Hospital.find({}, 'nombre img usuario')
        .exec(
            (err, hospitales) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar los hospitales',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    hospitales: hospitales
                });
            });
});


// ====================================
// PUT — Actualizar a un hospital
// ====================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Hospital.findById(id, (err, hospital) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar al hospital',
                errors: err
            });
        }

        if (!hospital) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El hospital con el id' + id + 'no existe',
                errors: { message: 'No exite un hospital con ese ID' }
            });
        }

        hospital.nombre = body.nombre;

        hospital.save((err, hospitalGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar al hospital',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                hospital: hospitalGuardado
            });
        });
    });
});


// ====================================
// POST — Crear un nuevo hospital
// ====================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var hospital = new Hospital({
        nombre: body.nombre,
        img: body.img,
    });

    // aqui mostramos como guaradar al usuario...
    hospital.save((err, hospitalGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear al hospital',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            hospital: hospitalGuardado,
            usuarioToken: req.usuario
        });
    });
});


// ====================================
// DELETE — Eliminar a un hospital
// ====================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Hospital.findByIdAndRemove(id, (err, hospitalBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar hospital',
                errors: err
            });
        }

        if (!hospitalBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un hospital con ese ID',
                errors: { message: 'No existe un hospital con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            hospital: hospitalBorrado
        });
    });
});

module.exports = app;