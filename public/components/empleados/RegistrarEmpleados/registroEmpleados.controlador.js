(() => {
  'use strict'

  angular
  .module('randajad')
  .controller('controladorRegistroEmpleados', controladorRegistroEmpleados);

  controladorRegistroEmpleados.$inject = ['$http','$state', 'servicioEmpleados', 'imageService','Upload'];
  
  function controladorRegistroEmpleados($http, $state, servicioEmpleados, imageService, Upload){
      let vm = this;
      vm.cloudObj = imageService.getConfiguration();
      vm.preRegistrarEmpleado = (pempleadoRegistar) => {
        vm.cloudObj.data.file = pempleadoRegistar.photo[0];
        Upload.upload(vm.cloudObj).success((data) =>{
          vm.registrarEmpleado(pempleadoRegistar, data.url);
       });
      }

      vm.registrarEmpleado = (pempleadoRegistar, imgUrl) => {
          pempleadoRegistar.photo = imgUrl;
          let edadValida = verificarEdad(pempleadoRegistar.fecha),
              contrasenasValidas = validarContrasenias(pempleadoRegistar.contrasena, pempleadoRegistar.confirmarContrasena);

          if(!edadValida || !contrasenasValidas){
              swal({
                  title: 'Error de registro',
                  text: 'Asegurese de que el empleado sea mayor de edad y que sus contraseñas coincidan',
                  icon: 'error',
                  button: 'Aceptar'
              });
          }else{
              let nuevoRegistroEmpleado = new Empleado(pempleadoRegistar.nombreCompleto, pempleadoRegistar.photo, pempleadoRegistar.fecha, pempleadoRegistar.edadMs,pempleadoRegistar.correo,pempleadoRegistar.contrasena,  pempleadoRegistar.confirmarContrasena);

              let exito = servicioEmpleados.agregarEmpleado(nuevoRegistroEmpleado);

              if(!exito){
                  swal({
                      title: 'No se pudo registrar',
                      text: 'El empleado no puede ser registrado, intente más tarde',
                      icon: 'error',
                      button: 'Aceptar'
                  });
              }else{
                  swal({
                      title: 'Registro finalizado',
                      text: 'El empleado ha sido agregado',
                      icon: 'success',
                      button: 'Aceptar'
                  });
                  $state.go('landingPage')
              }
          }
      }

      function verificarEdad(pnacimiento){
          let menor = false,
              edadMs = new Date() - pnacimiento;
    
          if(edadMs/31536000000<18){
            menor = true
          }
          return !menor
        }
    
        function validarContrasenias(pcontrasena, pconfirmarContrasena){
          let diferentes = false;
    
          if(pcontrasena != pconfirmarContrasena){
            diferentes = true
          }
    
          return !diferentes
        }
  }
})();