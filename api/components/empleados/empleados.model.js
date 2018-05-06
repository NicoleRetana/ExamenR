const mongoose = require('mongoose');

var EmpleadoSchema = new mongoose.Schema({
    nombreCompleto: {type: String},
    codigo: {type: String},
    photo: {type: String},
    fecha: {type: String},
    edad: {type: String},
    correo: {type: String},
    contrasena: {type: String},
   
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);