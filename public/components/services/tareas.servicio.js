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
                if(tareasBD[i]._id == ptareaAgregar._id){
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
                    obj.fecha = new Date(obj.fecha);
                    let nuevoRegistroTarea = Object.assign(new Tarea(), obj);
                    todasLasTareas.push(nuevoRegistroTarea);
                });
            }
            console.log(todasLasTareas);
            return todasLasTareas
            
        }
  
        
  
       
  
      function _actualizarTarea(ptarea){
          dataStorageFactory.updateTareaData(ptarea);
          
      }
  
    
    }
  })();