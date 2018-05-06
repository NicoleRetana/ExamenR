(() => {
    'use strict';
    angular
        .module('randajad')
        .controller('empleadosDeshabilitadosControlador', empleadosDeshabilitadosControlador);

        empleadosDeshabilitadosControlador.$inject = ['$http', '$stateParams', '$state', 'servicioEmpleados'];

    function empleadosDeshabilitadosControlador( $http, $stateParams, $state, servicioEmpleados) {
        let vm = this;

        vm.retornarEmpleados= servicioEmpleados.retornarEmpleados();
       

        vm.deshabilitarEmpleado = (empleado) => {
            empleado.setEstado(false);

            servicioEmpleados.updateEmpleado(empleado);
            $state.go('listaEmpleadosDeshabilitados');
        }

        vm.habilitarEmpleado = (empleado) => {
            empleado.setEstado(true);

            servicioEmpleados.updateEmpleado(empleado);
            $state.go('/listaEmpleados');
            
        }

        vm.listarEmpleadosDeshabilitados = servicioEmpleados.obtenerListaPorEstados(false);
    }
})();