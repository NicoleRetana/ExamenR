const mongoose = require('mongoose');

var TareaSchema = new mongoose.Schema({
    nombreTarea: {type: String},
    descripcion: {type: String},
    fecha: {type: String},
    prioridad: {type: String},
    estado: {type: String},
    costo: {type: String},
    proyecto: {type: String},
    estadoTarea : {type : String},
  
   
});

module.exports = mongoose.model('Tarea', TareaSchema);