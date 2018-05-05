(() => {
  'use strict'

  angular
  .module('randajad')
  .service('servicioEmpleados', servicioEmpleados);

  servicioEmpleados.$inject = ['$q', '$log', '$http','dataStorageFactory'];

  function servicioEmpleados($q, $log, $http, dataStorageFactory){
      let publicAPI = {
          agregarEmpleado: _agregarEmpleado,
          retornarEmpleados: _retornarEmpleados
      }
      return publicAPI

      function _agregarEmpleado(pempleadoAgregar){
          let empleadosBD = _retornarEmpleados(),
              repetido = false;
               {
                let objEmail = {
                  to: pempleadoAgregar.getCorreo(),
                  subject: 'Te damos la bienvenida a Randajad',
                  text: 'Hola'
                };
                dataStorageFactory.sendMail(objEmail);
                
              }
          for(let i=0; i<empleadosBD.length; i++){
              if(empleadosBD[i].getId() == pempleadoAgregar.getId()){
                  repetido = true;
              }
          }

          if(!repetido){
              dataStorageFactory.agregarEmpleado(pempleadoAgregar)
          }
          return !repetido
      }

      function _retornarEmpleados(){
          let empleadosBD = dataStorageFactory.retornarEmpleados(),
              todosLosEmpleados = [];

          if(empleadosBD.length == 0){
          }else{
              empleadosBD.forEach(obj => {
                  let nuevoRegistroEmpleado = new Empleado(obj.nombreCompleto, obj.photo, obj.fecha, obj.edadMs, obj.correo,obj.contrasena);
                  todosLosEmpleados.push(nuevoRegistroEmpleado);
              });
          }
          return todosLosEmpleados
      }
  }
})();