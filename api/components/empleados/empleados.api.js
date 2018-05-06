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
    req.body.rating = JSON.parse(req.body.rating);
    EmpleadosModel.update({_id: req.body._id}, req.body, (err, empleado) => {
      if (err){
        res.json({success:false, msg: 'No se ha actualizado.' + handleError(err)});
      } else{
        res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
        console.log(req.body);
      }
    });
  };
  
  module.exports.search_hotel_by_id = function(req, res){
    EmpleadoModel.findById({_id : req.body.id}).then(
        function(empleadp){
            res.send(empleado);
        });
  };
  




