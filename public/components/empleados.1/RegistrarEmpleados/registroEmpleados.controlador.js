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
          let edad = calcularEdad(pempleadoRegistar.fecha),
                edadValida = verificarEdad(edad),
              contrasenasValidas = validarContrasenias(pempleadoRegistar.contrasena, pempleadoRegistar.confirmarContrasena);


          let tempEmpleado = Object.assign(new Empleado(), pempleadoRegistar);
        //   let confirmation = servicioEmpleados.agregarEmpleado(tempEmpleado);


          if(!edadValida || !contrasenasValidas){
              swal({
                  title: 'Error de registro',
                  text: 'Asegurese de que el empleado sea mayor de edad y que sus contraseñas coincidan',
                  icon: 'error',
                  button: 'Aceptar'
              });
          }else{
              let nuevoRegistroEmpleado = new Empleado(pempleadoRegistar.nombreCompleto, pempleadoRegistar.codigo, imgUrl, pempleadoRegistar.fecha, edad,pempleadoRegistar.correo,pempleadoRegistar.contrasena);


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

      function calcularEdad(pnacimiento){
        let edad = (new Date() - pnacimiento) / 31536000000;

        return Math.trunc(edad);
      }

      function verificarEdad(pedad){
          let menor = false;
    
          if(pedad<18){
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