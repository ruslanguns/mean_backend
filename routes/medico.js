var express = require('express');
var jwt = require('jsonwebtoken');


var mdAutenticacion = require('../middlewares/autenticacion');



// inicializarlo
var app = express();


//  Importacion del modelo de medicos
var Medico = require('../models/medico');


// ====================================
// GET — Obtener lista de medicos
// ====================================
app.get('/', (req, res, next) => {

    Medico.find({}, 'nombre img usuario hospital')
        .exec(
            (err, medico) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error al cargar los medico',
                        errors: err
                    });
                }

                res.status(200).json({
                    ok: true,
                    medico: medico
                });
            });
});

// ====================================
// PUT — Actualizar / Modificar a un médico
// ====================================
app.put('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Medico.findById(id, (err, medico) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar al médico',
                errors: err
            });
        }

        if (!medico) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El médico con el id ' + id + ' no existe',
                errors: { message: 'No exite un médico con ese ID' }
            });
        }

        medico.nombre = body.nombre;

        medico.save((err, medicoGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar al médico',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                hospital: medicoGuardado
            });
        });
    });
});

// ====================================
// POST — Crear a un medico
// ====================================
app.post('/', mdAutenticacion.verificaToken, (req, res) => {

    var body = req.body;

    var medico = new Medico({
        nombre: body.nombre,
        img: body.img,
        usuario: body.usuario,
        hospital: body.hospital
    });

    // aqui mostramos como guaradar al medico...
    medico.save((err, medicoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear al médico',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            medico: medicoGuardado,
            usuarioToken: req.usuario
        });
    });
});

// ====================================
// DELETE — Eliminar a un médico
// ====================================
app.delete('/:id', mdAutenticacion.verificaToken, (req, res) => {

    var id = req.params.id;

    Medico.findByIdAndRemove(id, (err, medicoBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar al médico',
                errors: err
            });
        }

        if (!medicoBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un médico con ese ID',
                errors: { message: 'No existe un médico con ese ID' }
            });
        }

        res.status(200).json({
            ok: true,
            medico: medicoBorrado
        });
    });
});



module.exports = app;