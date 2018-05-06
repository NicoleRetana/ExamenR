(() => {
  'use strict'
  angular
    .module('randajad')
    .controller('listaEmpleadosControlador', listaEmpleadosControlador);

  listaEmpleadosControlador.$inject = ['$state', '$stateParams',  'servicioEmpleados'];

  function listaEmpleadosControlador($state, $stateParams,servicioEmpleados ) {
    let vm = this;

    vm.retornarEmpleados= servicioEmpleados.retornarEmpleados();
    vm.eliminarEmpleado = (pempleado) => {
      let eliminar = swal({
          title: '¿Desea eliminar este empleado',
          body: 'Se eliminará el empleado',
          buttons: ['Cancelar', 'Continuar'],
          icon: 'info'
      }).then((confirmacion) => {
          if(confirmacion){
            servicioEmpleados.eliminarEmpleado(pempleado);
              $state.reload();
          }
      });
  }

  vm.modifyEmpleado = (pempleado) => {
    $state.go('main.modifyHotel', { tempHotel: JSON.stringify(pHotel) });
  };
  }
})();