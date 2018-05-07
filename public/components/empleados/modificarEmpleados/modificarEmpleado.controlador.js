(() => {
  'use strict';
  angular
      .module('randajad')
      .controller('controladorModificarEmpleado', controladorModificarEmpleado);

  controladorModificarEmpleado.$inject = ['$location','$http', '$stateParams', '$state', 'servicioEmpleados', 'imageService', 'Upload'];

  function controladorModificarEmpleado($location, $http, $stateParams, $state, servicioEmpleados, imageService, Upload) {
      const vm = this;

      vm.modifyEmpleado = {};

      vm.objNuevoEmpleado = {};

      //   if(!$stateParams.idUsuario){
      //   $state.go('listaEmpleados');
      //   }

      let empleadoModificar = JSON.parse($stateParams.tempEmpleado);
      vm.objNuevoEmpleado = Object.assign(new Empleado(), empleadoModificar);
     
      vm.modifyEmpleado.nombreCompleto = vm.objNuevoEmpleado.nombreCompleto;
      vm.modifyEmpleado.codigo = vm.objNuevoEmpleado.codigo;
      vm.modifyEmpleado.photo = vm.objNuevoEmpleado.photo;
      vm.modifyEmpleado.fecha = new Date(vm.objNuevoEmpleado.fecha);
      vm.modifyEmpleado.correo = vm.objNuevoEmpleado.correo;
      vm.modifyEmpleado.contrasena = vm.objNuevoEmpleado.contrasena;
      vm.modifyEmpleado.estado = vm.objNuevoEmpleado.estado;

      

      vm.modifEmpleado = (pEmpleado) => {
          let empleadosBD = servicioEmpleados.retornarEmpleados();
    
         
          
          empleadosBD.forEach(objEmpleado => {
            if (objEmpleado._id == vm.objNuevoEmpleado._id) {
              objEmpleado.nombreCompleto = pEmpleado.nombreCompleto;
              
              objEmpleado.photo = pEmpleado.photo;
              objEmpleado.fecha = pEmpleado.fecha;
              objEmpleado.correo = pEmpleado.correo;
              objEmpleado.contrasena = pEmpleado.contrasena;
              objEmpleado.estado = pEmpleado.estado;
              
    
    
              servicioEmpleados.actualizarEmpleado(objEmpleado);
    
            }
          });
          swal("Edición exitosa", "Empleado modificado correctamente", "success", {
            button: "Aceptar",
          });
          $location.path('/listaEmpleados');
    
        
        }


  }

})();
