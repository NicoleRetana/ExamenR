(() => {
  'use strict';
  angular
      .module('randajad')
      .controller('controladorModificarEmpleado', controladorModificarEmpleado);

  controladorModificarEmpleado.$inject = ['$http', '$stateParams', '$state', 'servicioEmpleados', 'imageService', 'Upload'];

  function controladorModificarEmpleado($http, $stateParams, $state, servicioEmpleados, imageService, Upload) {
      const vm = this;

      vm.modifyEmpleado = {};

      vm.objNuevoEmpleado = {};

    //   if(!$stateParams.idUsuario){
        //   $state.go('listaEmpleados');
    //   }

      
      let empleadoModificar = JSON.parse($stateParams.tempEmpleado);
      vm.objNuevoEmpleado = Object.assign(new Empleado(), empleadoModificar);
      vm.objNuevoEmpleado.setId(empleadoModificar.codigo);
   
      vm.modifyEmpleado.nombreCompleto = vm.objNuevoEmpleado.nombreCompleto;
      vm.modifyEmpleado.codigo = vm.objNuevoEmpleado.codigo;
      vm.modifyEmpleado.photo = vm.objNuevoEmpleado.photo;
      vm.modifyEmpleado.fecha = new Date(vm.objNuevoEmpleado.fecha);
      vm.modifyEmpleado.correo = vm.objNuevoEmpleado.correo;
      vm.modifyEmpleado.contrasena = vm.objNuevoEmpleado.contrasena;
      

      vm.modificarEmpleado = (pempleadoRegistar) => {

          let pempleadoModificar= Object.assign(new Empleado(),pempleadoRegistar);
          vm.empleadoPorEditar.fecha = new Date(vm.empleadoPorEditar.fecha);



          let success = servicioEmpleados.updateEmpleado(pempleadoModificar);

          if (success == true) {
              swal({
                  title: "Registro exitoso",
                  text: "El empleado se ha editado correctamente",
                  icon: "success",
                  button: "Aceptar"
              });
              vm.empleadoPorEditar = null;
              $state.go('listaEmpleados');
          } else {
              swal({
                  title: "Edición fallida",
                  text: "Ha ocurrido un error, inténtelo nuevamente más tarde",
                  icon: "error",
                  button: "Aceptar"
              });
          }
      }

  }

})();











