(() => {
  'use strict'
  
  angular
  .module('randajad')
  .controller('controladorPerfilEmpleado', controladorPerfilEmpleado);

  controladorPerfilEmpleado.$inject = ['$state', 'servicioEmpleados'];

  function controladorPerfilEmpleado($state, servicioEmpleados){

      const empleadoCodigo = servicioEmpleados.empleadoActivo();

      let empleadoActivoInfo = servicioEmpleados.obtenerInfoEmpleado(empleadoCodigo);
      let vm = this;

      vm.infoEmpleado = empleadoActivoInfo;
  }
})();