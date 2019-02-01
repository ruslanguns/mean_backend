var jwt = require('jsonwebtoken');


var SEED = require('../config/config').SEED;

// ====================================
// VERIFICAR TOKEN — API  Midleware
// ====================================
exports.verificaToken = function(req, res, next) {

    // app.use('/', (req, res, next) => {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'El token es inválido',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();
        // res.status(200).json({
        //     ok: true,
        //     decoded: decoded
        // });
    });
    // });
};

// ====================================
// VERIFICA ADMIN
// ====================================
exports.verificaADMIN_ROLE = function(req, res, next) {


    var usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        // SI ES VALIDO VAMOS A EJECUTAR LOS PROCESOS
        next();
        return;
    } else {
        // SI NO ES UN USUARIO ADMIN MANDA ERROR

        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto — No es administrador',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });
    }

};

// ====================================
// VERIFICA ADMIN
// ====================================
exports.verificaADMIN_ROLE_o_MismoUsuario = function(req, res, next) {


    var usuario = req.usuario;
    var id = req.params.id;

    if (usuario.role === 'ADMIN_ROLE' || usuario._id === id) {
        // SI ES VALIDO VAMOS A EJECUTAR LOS PROCESOS
        next();
        return;
    } else {
        // SI NO ES UN USUARIO ADMIN MANDA ERROR

        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto — No es administrador ni es el mismo usuario',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });
    }

};