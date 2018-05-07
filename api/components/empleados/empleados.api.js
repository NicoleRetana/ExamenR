const EmpleadoModel = require('./empleados.model');

module.exports.registrar = (req, res) => {

    var newEmpleado = new EmpleadoModel({
        nombreCompleto: req.body.nombreCompleto,
        codigo: req.body.codigo,
        photo: req.body.photo,
        fecha: req.body.fecha,
        edad: req.body.edad,
        correo: req.body.correo,
        contrasena: req.body.contrasena,
        listaTareas: req.body.listaTareas,
      
    

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
    EmpleadoModel.find().then((empleados) => {
        res.send(empleados);
    })
}

module.exports.update = (req,res) => {
    EmpleadoModel.update({codigo: req.body.codigo}, req.body, (err, empleado) => {
      console.log(req.body.codigo);
              if (err){
        res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});
  
      } else{
        res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
      }
    });
  };
  
  module.exports.buscar_empleado_por_codigo = function(req, res){
    EmpleadoModel.findById({codigo : req.body.codigo}).then(
        function(empleado){
            res.send(empleado);
        });
  }; 
  

  module.exports.agregar_tarea_empleado = function (req, res) {

    EmpleadoModel.update({ codigo: req.body.codigo }, { $push: { 'listaTareas': { _id: req.body._id } } },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se ha actualizado la tarea debido al siguiente error: ' + handleError(error) });
            } else {
                res.json({ success: true, msg: 'El usuario ha sido modificado con éxito' });
            }
  
        });
  
  };


