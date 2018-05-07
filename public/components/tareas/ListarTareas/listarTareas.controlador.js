(() => {
    'use strict'
    angular
        .module('randajad')
        .controller('listaTareasControlador', listaTareasControlador);

    listaTareasControlador.$inject = ['$window', '$state', '$stateParams', 'servicioTareas'];

    function listaTareasControlador($window, $state, $stateParams, servicioTareas) {
        let vm = this;

        let empleadoTemp = JSON.parse($stateParams.tempEmpleado);
        let empleado = Object.assign(new Empleado(), empleadoTemp);

        vm.retornarTareas = listarTareas();

        
        function listarTareas(){
            let listaTareasBD = servicioTareas.retornarTareas();
            let listaTareas= [];
            for (let i = 0; i < listaTareasBD.length; i++) {
                if(listaTareasBD[i].empleado == empleado.codigo){
                    listaTareas.push(listaTareasBD[i]);
                }
            }
            console.log(listaTareas);
            return listaTareas;
        }


        vm.modificarTarea = (tarea) => {
            $state.go('modificarTareas', { tempTarea: JSON.stringify(tarea) });
        }

        vm.desactivaTareas = (tarea) => {
            tarea.setEstadoTarea(false);

            servicioTareas.updateTarea(tarea);
            $window.location.reload();
        }

        vm.activaTareas = (tarea) => {
            tarea.setEstadoTarea(true);

            servicioTareas.updateTarea(tarea);
            $window.location.reload();

        }
    }
})();