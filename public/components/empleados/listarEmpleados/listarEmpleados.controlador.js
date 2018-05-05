(() => {
  'use strict'
  angular
    .module('randajad')
    .controller('listaEmpleadosControlador', listaEmpleadosControlador);

  listaEmpleadosControlador.$inject = ['$state', '$stateParams',  'servicioEmpleados'];

  function listaEmpleadosControlador($state, $stateParams,servicioEmpleados ) {
    let vm = this;

    vm.retornarEmpleados= servicioEmpleados.retornarEmpleados();

  }
})();