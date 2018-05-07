(() => {
  'use strict'

  angular
  .module('randajad')
  .controller('controladorRegistroTareas', controladorRegistroTareas);

  controladorRegistroTareas.$inject = ['$http','$state', 'servicioTareas','servicioEmpleados'];
  
  function controladorRegistroTareas($http, $state, servicioTareas,servicioEmpleados){
      let vm = this;
      vm.retornarEmpleados= servicioEmpleados.retornarEmpleados();
      vm.registrarTarea = (ptareasRegistar) => {
          
          let tempTarea = Object.assign(new Tarea(), ptareasRegistar);
        //   let nuevoRegistroTarea = new Tarea(ptareasRegistar.nombreTarea, ptareasRegistar.descripcion, ptareasRegistar.fecha ,ptareasRegistar.prioridad, ptareasRegistar.estado,ptareasRegistar.costo,ptareasRegistar.proyecto);
              
              let exito = servicioTareas.agregarTarea(tempTarea);

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