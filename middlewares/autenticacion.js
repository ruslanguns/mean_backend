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