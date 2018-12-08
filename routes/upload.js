var express = require('express');
var fileUpload = require('express-fileupload');

// inicializarlo
var app = express();
var fs = require('fs');

var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');
var Settings = require('../models/settings');


// ====================================
// CARGAR IMAGEN CON VALIDACIONES
// ====================================

// default options
app.use(fileUpload());



// Usamos PUT porque solo actualizaremos y añadiremos esta imagen...
////////////////////////////////////////

app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

    // Tipos de coleccion
    ////////////////////////////////////////
    var tiposValidos = ['hospitales', 'medicos', 'usuarios', 'settings'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de coleccion no es valida',
            errors: {
                message: 'Tipo de coleccion no es valida'
            }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No se selecciono nada',
            errors: {
                message: 'Debe de seleccionar una imagen'
            }
        });
    }


    // Obtener nombre del archivo
    ////////////////////////////////////////
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Solo estas extensiones aceptamos
    ////////////////////////////////////////
    var extensionesValidas = ['png', 'jpg', 'git', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no válida',
            errors: {
                message: 'Las extensiones válidas son ' + 'jpeg, git, jpg, png'
            }
        });
    }

    // Tener un nombre de archivo personalizado
    ////////////////////////////////////////
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${extensionArchivo}`;


    // Mover el archivo del temporal a un path especifico
    ////////////////////////////////////////
    var path = `./uploads/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover el archivo',
                errors: err
            });
        }

        subirPorTipo(tipo, id, nombreArchivo, res);


    });
});


function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'usuarios') {

        // necesitamos el modelo
        Usuario.findById(id, (err, usuario) => {


            if (!usuario) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Usuario no existe',
                    errors: {
                        message: 'Usuario no existe'
                    }
                });
            }

            var pathViejo = './uploads/usuarios/' + usuario.img;

            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }


            usuario.img = nombreArchivo;

            usuario.save((err, usuarioActualizado) => {

                usuarioActualizado.password = ':)';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                });

            });

        });
    }

    if (tipo === 'medicos') {

        // necesitamos el modelo
        Medico.findById(id, (err, medico) => {


            if (!medico) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Medico no existe',
                    errors: {
                        message: 'Medico no existe'
                    }
                });
            }

            var pathViejo = './uploads/medicos/' + medico.img;

            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }


            medico.img = nombreArchivo;

            medico.save((err, medicoActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen del medico actualizada',
                    medico: medicoActualizado
                });

            });

        });
    }

    if (tipo === 'hospitales') {
        // necesitamos el modelo
        Hospital.findById(id, (err, hospital) => {


            if (!hospital) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Hospital no existe',
                    errors: {
                        message: 'Hospital no existe'
                    }
                });
            }

            var pathViejo = './uploads/hospitales/' + hospital.img;

            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }


            hospital.img = nombreArchivo;

            hospital.save((err, hospitalActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen del hospital actualizada',
                    hospital: hospitalActualizado
                });

            });

        });
    }


    if (tipo === 'settings') {
        // necesitamos el modelo
        Settings.findById(id, (err, settings) => {


            if (!settings) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Setting no existe',
                    errors: {
                        message: 'Setting no existe'
                    }
                });
            }

            var pathViejo = './uploads/setttings/' + settings.logo;

            // si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo);
            }


            settings.logo = nombreArchivo;

            settings.save((err, settingsActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'El logo ha sido actualizado',
                    hospital: settingsActualizado
                });

            });

        });
    }


}


module.exports = app;