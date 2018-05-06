(() => {
  'use strict'

  angular
  .module('randajad')
  .controller('ModificarEmpleadoControlador', ModificarEmpleadoControlador)

  ModificarEmpleadoControlador.$inject = ['$state', '$http',  'servicioEmpleados', 'imageService','Upload'];

  function ModificarEmpleadoControlador($state, $http, servicioEmpleados, imageService, Upload){

      const empleadoEditarCodigo = servicioEmpleados.empleadoActivo();

      if(empleadoEditarCodigo == undefined){
          $state.go('/listaEmpleados');
      }
      let empleadoActivoInfo = servicioEmpleados.obtenerInfoEmpleado(empleadoEditarCodigo);
      
      let vm = this;

      vm.empleado = {
        codigo: Number(empleadoActivoInfo.codigo),
        nombreCompleto: empleadoActivoInfo.nombreCompleto,
        foto: empleadoActivoInfo.foto,
        fecha: empleadoActivoInfo.fecha,
        correo: empleadoActivoInfo.correo,
        contrasena: empleadoActivoInfo.contrasena,
      }

      vm.nube = imageService.getConfiguration();


      vm.preEditarEmpleado = (peditarEmpleado) => {
          

          vm.nube.data.file = peditarEmpleado.foto[0];
          Upload.upload(vm.nube).success((data) => {

              vm.editarEmpleado(peditarEmpleado, data.url);
          });
      }

      vm.editarEmpleado = (peditarEmpleado, urlFoto) => {
          let nuevoEmpleado = new Empleado (peditarEmpleado.nombreCompleto, urlFoto, peditarEmpleado.fecha, peditarEmpleado.correo, peditarEmpleado.contrasena, peditarEmpleado.codigo);

          
          let exito = servicioEmpleados.actualizarEmpleado(nuevoEmpleado);

          if(!exito){
              swal({
                  title: 'El empleado no se pudo modificar',
                  text: 'Intente más tarde',
                  icon: 'error',
                  button: 'Aceptar'
              });
          }else{
              swal({
                  title: 'Empleado editado',
                  text: 'Ahora la nueva informacion podrá ser vista por los visitantes',
                  icon: 'success',
                  button: 'Aceptar'
              });
              $state.go('/listaEmpleados');
          }
      }

      vm.borrarSesion = () => {
          $state.go('/listaEmpleados');
      }
  }
})();