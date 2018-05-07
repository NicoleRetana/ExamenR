(() => {
    'use strict'

    angular
        .module('randajad')
        .controller('controladorRegistroTareas', controladorRegistroTareas);

    controladorRegistroTareas.$inject = ['$http', '$state', 'servicioTareas', 'servicioEmpleados'];

    function controladorRegistroTareas($http, $state, servicioTareas, servicioEmpleados) {
        let vm = this;
        vm.retornarEmpleados = servicioEmpleados.retornarEmpleados();
        vm.registrarTarea = (ptareasRegistar) => {
        let today = new Date();
            if (ptareasRegistar.costo > 0) {

                if (ptareasRegistar.fecha < today) {
                    let tempTarea = Object.assign(new Tarea(), ptareasRegistar);

                    let exito = servicioTareas.agregarTarea(tempTarea);

                    if (!exito) {
                        swal({
                            title: 'No se pudo registrar',
                            text: 'La tarea no puede ser registrada, intente más tarde',
                            icon: 'error',
                            button: 'Aceptar'
                        });
                    } else {
                        swal({
                            title: 'Registro finalizado',
                            text: 'La tarea ha sido agregada',
                            icon: 'success',
                            button: 'Aceptar'
                        });
                        $state.go('landingPage')
                    }
                }
                else{
                    swal({
                        title: 'No se pudo registrar',
                        text: 'No puede registrar fechas futuras',
                        icon: 'error',
                        button: 'Aceptar'
                    });
                }
            } else {
                swal({
                    title: 'No se pudo registrar',
                    text: 'Ingrese un costo mayor a 0',
                    icon: 'error',
                    button: 'Aceptar'
                });
            }

        }



    }

})();