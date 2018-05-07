(() => {
  'use strict'

  angular
  .module('randajad')
  .controller('controladorRegistroTareas', controladorRegistroTareas);

  controladorRegistroTareas.$inject = ['$http','$state', 'servicioTareas'];
  
  function controladorRegistroTareas($http, $state, servicioTareas){
      let vm = this;
      vm.registrarTarea = (ptareasRegistar) => {
          
          let tempTarea = Object.assign(new Tarea(), ptareasRegistar);
  
              let exito = servicioTareas.agregarTarea(nuevoRegistroTarea);

              if(!exito){
                  swal({
                      title: 'No se pudo registrar',
                      text: 'La tarea no puede ser registrada, intente más tarde',
                      icon: 'error',
                      button: 'Aceptar'
                  });
              }else{
                  swal({
                      title: 'Registro finalizado',
                      text: 'La tarea ha sido agregada',
                      icon: 'success',
                      button: 'Aceptar'
                  });
                  $state.go('landingPage')
              }
          }
      

    
  }

})();