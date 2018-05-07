(() => {
    'use strict'
  
    angular
    .module('randajad')
    .service('servicioTareas', servicioTareas);
  
    servicioTareas.$inject = ['$q', '$log', '$http','dataStorageFactory'];
  
    function servicioTareas($q, $log, $http, dataStorageFactory){
        const key= 'tarea';
        const publicAPI = {
            agregarTarea: _agregarTarea,
            retornarTareas: _retornarTareas,
            actualizarTarea: _actualizarTarea
  
           
  
        }
        return publicAPI
  
        function _agregarTarea(ptareaAgregar){
            let tareasBD = _retornarTareas(),
                repetido = false;
                
            for(let i=0; i<tareasBD.length; i++){
                if(tareasBD[i].getId() == ptareasAgregar.getId()){
                    repetido = true;
                }
            }
  
            if(!repetido){
                dataStorageFactory.agregarTarea(ptareaAgregar)
            }
            return !repetido
        }
  
        function _retornarTareas(){
            let tareasBD = dataStorageFactory.retornarTareas(),
                todasLasTareas = [];
  
            if(tareasBD.length == 0){
            }else{
                tareasBD.forEach(obj => {
                    let nuevoRegistroTarea = new Tarea(obj.nombreTarea,obj.descripcion, obj.fecha, obj.prioridad, obj.estado, obj.costo,obj.proyecto,obj.proyecto,obj.empleado);
                    todasLasTareas.push(nuevoRegistroTarea);
                });
            }
            return todasLasTareas
        }
  
        
  
       
  
      function _actualizarTarea(ptarea){
          dataStorageFactory.updateTareaData(ptarea);
          
      }
  
    
    }
  })();