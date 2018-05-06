(() => {
    'use strict';
    angular
      .module('randajad')
      .controller('ModificarEmpleadoControlador', ModificarEmpleadoControlador);
  
      ModificarEmpleadoControlador.$inject = ['$state', '$http','imageService',  'servicioEmpleados', 'Upload'];
  
    function ModificarEmpleadoControlador($state, $http,imageService, servicioEmpleados, Upload) {
      let vm = this;
  
      vm.modifyEmpleado = {};
  
      vm.objNewEmpleado = {};
  
    
      let EmpleadoToModify = JSON.parse($stateParams.tempEmpleado);
      vm.objNewEmpleado = Object.assign(new Empleado(), EmpleadoToModify);
      vm.objNewEmpleado.setId(EmpleadoToModify._id);
      // }
  
      vm.modifyEmpleado.nombreCompleto= vm.objNewHotel.nombreCompleto;
      vm.modifyEmpleado.codigo = objNewEmpleado.codigo;
      vm.modifyEmpleado.photo = objNewEmpleado.photo;
      vm.modifyEmpleado.fecha = objNewEmpleado.fecha;
      vm.modifyEmpleado.edad = objNewEmpleado.edad;
      vm.modifyEmpleado.correo = objNewEmpleado.correo;
      vm.modifyEmpleado.contrasena = objNewEmpleado.contrasena;
      
      
  
  
      vm.cloudObj = imageService.getConfiguration();
  
      vm.preEditEmpleado = (pempleadoRegistar) => {
        vm.cloudObj.data.file = pempleadoRegistar.photo[0];
        Upload.upload(vm.cloudObj).success((data) => {
          vm.modifHotel(pempleadoRegistar, data.url);
        });
      }
  
     
  
      vm.modifEmpleado = (pEmpleado, url) => {
        let empleadosBD = dataStorageFactory.retornarEmpleados()
  
        pEmpleado.photo = url;
       
  
        empleadosBD.forEach(objEmpleado => {
          if (objEmpleado._id == vm.objNewEmpleado._id) {
            objEmpleado.nombreCompleto = pEmpleado.nombreCompleto;
            objEmpleado.codigo = pEmpleado.codigo;
            objEmpleado.photo = pEmpleado.photo;
            objEmpleado.fecha = pEmpleado.fecha;
            objEmpleado.edad = pEmpleado.edad;
            objEmpleado.correo= pEmpleado.correo;
            objEmpleado.contrasena = pEmpleado.contrasena;
            objEmpleado.servicePhone = pEmpleado.servicePhone;
            objEmpleado.serviceEmail = pEmpleado.serviceEmail;
            objEmpleado.reservationPhone = pEmpleado.reservationPhone;
            objEmpleado.reservationEmail = pEmpleado.reservationEmail;
            objEmpleado.photo = pHotel.photo;
  
  
            servicioEmpleados.updateHotelData(objEmpleado);
  
          }
        });
        swal("Edición exitosa", "Empleado modificado correctamente", "success", {
          button: "Aceptar",
        });
        $location.path('/listaEmpleados');
  
        
      }
    }
  
  })();








(() => {
  'use strict'

  angular
  .module('randajad')
  .controller('ModificarEmpleadoControlador', ModificarEmpleadoControlador)

  ModificarEmpleadoControlador.$inject = ['$state', '$http','imageService',  'servicioEmpleados', 'Upload'];

  function ModificarEmpleadoControlador($state, $http,imageService, servicioEmpleados, Upload){

      const empleadoEditarCodigo = servicioEmpleados.empleadoActivo();

      if(empleadoEditarCodigo == undefined){
          $state.go('/listaEmpleados');
      }
      let empleadoActivoInfo = servicioEmpleados.obtenerInfoEmpleado(empleadoEditarCodigo);
      
      let vm = this;

      vm.empleado = {
        nombreCompleto: empleadoActivoInfo.nombreCompleto,
        codigo: Number(empleadoActivoInfo.codigo),
        photo: empleadoActivoInfo.photo,
        edad: empleadoActivoInfo.edad,
        correo: empleadoActivoInfo.correo,
        contrasena: empleadoActivoInfo.contrasena,
      }

      vm.cloudObj = imageService.getConfiguration();


      vm.preEditarEmpleado = (peditarEmpleado) => {

        vm.cloudObj.data.file = peditarEmpleado.photo[0];
          Upload.upload(vm.cloudObj).success((data) => {

              vm.editarEmpleado(peditarEmpleado, data.url);
          });
      }

      vm.editarEmpleado = (peditarEmpleado, imgUrl) => {
          let nuevoEmpleado = new Empleado (peditarEmpleado.nombreCompleto,peditarEmpleado.codigo, imgUrl, peditarEmpleado.fecha, edad,peditarEmpleado.correo, peditarEmpleado.contrasena, );
          
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