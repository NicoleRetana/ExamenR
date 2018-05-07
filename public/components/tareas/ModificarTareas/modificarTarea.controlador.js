(() => {
  'use strict';
  angular
      .module('randajad')
      .controller('controladorModificarTarea', controladorModificarTarea);

  controladorModificarTarea.$inject = ['$http', '$stateParams', '$state', 'servicioTareas'];

  function controladorModificarTarea( $http, $stateParams, $state, servicioTareas) {
      const vm = this;

      vm.modifyTarea = {};

      vm.objNuevaTarea = {};

     

      let tareaModificar = JSON.parse($stateParams.tempTarea);
      vm.objNuevaTarea = Object.assign(new Empleado(), tareaModificar);
      vm.objNuevaTarea.setId(tareaModificar._id);
     
      vm.modifyTarea.nombreTarea = vm.objNuevaTarea.nombreTarea;
      vm.modifyTarea.descripcion = vm.objNuevaTarea.descripcion;
      vm.modifyTarea.fecha = vm.objNuevaTarea.fecha;
      vm.modifyTarea.prioridad = new Date(vm.objNuevaTarea.prioridad);
      vm.modifyTarea.estado = vm.objNuevaTarea.estado;
      vm.modifyTarea.costo = vm.objNuevaTarea.costo;
      vm.modifyTarea.proyecto = vm.objNuevaTarea.proyecto;
      vm.modifyTarea.empleado= vm.objNuevaTarea.empleado;
      vm.modifyTarea.estadoTarea = vm.objNuevaTarea.estadoTarea;

      

      vm.modifTarea = (pTarea) => {
          let tareasBD = servicioTareas.retornarTareas();
    
         
          
          tareasBD.forEach(objTarea => {
            if (objTarea.codigo == vm.objNuevaTarea.codigo) {
              objTarea.nombreTarea = pTarea.nombreTarea;
              
              objTarea.descripcion = pTarea.descripcion;
              objTarea.fecha = pTarea.fecha;
              objTarea.prioridad = pTarea.prioridad;
              objTarea.estado = pTarea.estado;
              objTarea.costo = pTarea.costo;
              objTarea.proyecto = pTarea.proyecto;
              
              
    
    
              servicioTareas.actualizarTarea(objTarea);
    
            }
          });
          swal("Edición exitosa", "Tarea modificada correctamente", "success", {
            button: "Aceptar",
          });
          $location.path('/listaTareas');
    
        
        }


  }

})();
