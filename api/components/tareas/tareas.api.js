const TareaModel = require('./tareas.model');

module.exports.registrar = (req, res) => {

    var newTarea = new TareaModel({
        nombreTarea: req.body.nombreTarea,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        prioridad: req.body.prioridad,
        estado: req.body.estado,
        costo: req.body.costo,
        proyecto: req.body.proyecto,
        
    

    });

    newTarea.save((err) => {
        if(err){
            res.json({success:false, msj: 'Problemas en la petición' + err});
        }else{
            res.json({success:true, msj: 'Se registro correctamente'});
        }
    });
}

module.exports.retornar = (req, res) => {
    TareaModel.find().then((tareas) => {
        res.send(tareas);
    })
}

module.exports.update = (req,res) => {
    TareaModel.update({_id: req.body._id}, req.body, (err, tarea) => {
      console.log(req.body._id);
              if (err){
        res.json({success:false,msg:'No se ha actualizado.' + handleError(err)});
  
      } else{
        res.json({success:true,msg:'Se ha actualizado correctamente.' + res});
      }
    });
  };
  
  
  




