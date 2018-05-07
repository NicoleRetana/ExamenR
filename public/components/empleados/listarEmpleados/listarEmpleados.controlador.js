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
      })
  }

  vm.modificarEmpleado = (empleado) => {
    $state.go('modificarEmpleados', { tempEmpleado: JSON.stringify(empleado) });
}

vm.listarTareas = (empleado) => {
    $state.go('listaTareas', { tempEmpleado: JSON.stringify(empleado) });
}

vm.desactivaEmpleados = (empleado) => {
    empleado.setEstado(false);

    servicioEmpleados.updateEmpleado(usuario);
    $window.location.reload();
}

vm.activaEmpleados= (empleado) => {
    empleado.setEstado(true);

    servicioEmpleados.updateEmpleado(empleado);
    $window.location.reload();
    
}
  }
})();