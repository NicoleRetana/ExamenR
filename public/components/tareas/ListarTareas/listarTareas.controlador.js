(() => {
  'use strict'
  angular
    .module('randajad')
    .controller('listaTareasControlador', listaTareasControlador);

  listaTareasControlador.$inject = [ '$window','$state', '$stateParams',  'servicioTareas'];

  function listaTareasControlador($window, $state, $stateParams,servicioTareas ) {
    let vm = this;

    vm.retornarTareas= servicioTareas.retornarTareas();
    vm.eliminarTarea = (ptarea) => {
      let eliminar = swal({
          title: '¿Desea eliminar este empleado',
          body: 'Se eliminará el empleado',
          buttons: ['Cancelar', 'Continuar'],
          icon: 'info'
      }).then((confirmacion) => {
          if(confirmacion){
            servicioTareas.eliminarEmpleado(ptarea);
              $state.reload();
          }
      })
  }

  vm.modificarTarea = (tarea) => {
    $state.go('modificarTareas', { tempTarea: JSON.stringify(tarea) });
}

vm.desactivaTareas = (tarea) => {
    tarea.setEstadoTarea(false);

    servicioTareas.updateTarea(tarea);
    $window.location.reload();
}

vm.activaTareas= (tarea) => {
    tarea.setEstadoTarea(true);

    servicioTareas.updateTarea(tarea);
    $window.location.reload();
    
}
  }
})();