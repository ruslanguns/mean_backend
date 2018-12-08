var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var settingsSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre	es necesario']
    },
    logo: {
        type: String,
        required: false
    },
    calle: {
        type: String,
        required: false,
        default: ''
    },
    ciudad: {
        type: String,
        required: false,
        default: ''
    },
    provincia: {
        type: String,
        required: false,
        default: ''
    },
    zip: {
        type: String,
        required: false,
        default: ''
    },
    pais: {
        type: String,
        required: false,
        default: ''
    },
    telefono: {
        type: String,
        required: false,
        default: ''
    },
    vat: {
        type: String,
        required: false,
        default: ''
    },
    web: {
        type: String,
        required: false,
        default: ''
    }
});

module.exports = mongoose.model('Settings', settingsSchema);