const EmpleadoModel = require('./empleados.model');

module.exports.registrar = (req, res) => {

    var newEmpleado = new EmpleadoModel({
        nombreCompleto: req.body.nombreCompleto,
        photo: req.body.photo,
        fecha: req.body.fecha,
        edad: req.body.edad,
        correo: req.body.correo,
        contrasena: req.body.contrasena,

    });

    newEmpleado.save((err) => {
        if(err){
            res.json({success:false, msj: 'Problemas en la petición' + err});
        }else{
            res.json({success:true, msj: 'Se registro correctamente'});
        }
    });
}

module.exports.retornar = (req, res) => {
    EmpleadoModel.find().then((usuarios) => {
        res.send(usuarios);
    })
}




