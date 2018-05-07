(() => {
  'use strict'

  angular
  .module('randajad')
  .service('servicioEmpleados', servicioEmpleados);

  servicioEmpleados.$inject = ['$q', '$log', '$http','dataStorageFactory'];

  function servicioEmpleados($q, $log, $http, dataStorageFactory){
      const key= 'empleado';
      const publicAPI = {
          agregarEmpleado: _agregarEmpleado,
          retornarEmpleados: _retornarEmpleados,
          actualizarEmpleado: _actualizarEmpleado,
          addTareaEmpleado:_addTareaEmpleado
         

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

                  let nuevoRegistroEmpleado = new Empleado(obj.nombreCompleto,obj.codigo, obj.photo, obj.fecha, obj.edad, obj.correo,obj.contrasena);
                  nuevoRegistroEmpleado.listaTareas=obj.listaTareas;
                  todosLosEmpleados.push(nuevoRegistroEmpleado);

              });
          }
          return todosLosEmpleados
      }

      function _obtenerListaPorEstados(pestado) {
        let empleadosBD = dataStorageFactory.retornarEmpleados(),
            listaFiltrada = [];
  
        for(let i = 0; i < empleadosBD .length; i++){
          if(empleadosBD [i].getEstado() == pestado){
            listaFiltrada.push(empleadosBD [i]);
          }
        }
        return listaFiltrada;
      }

     

    function _actualizarEmpleado(pempleado){
        dataStorageFactory.updateEmpleadoData(pempleado);
        
    }


     
        function _addTareaEmpleado(pNuevaTarea) {
            let empleadosBD = dataStorageFactory.retornarEmpleados();
            let registroExitoso = false;
            let empleado = {};
            for (let i = 0; i < empleadosBD.length; i++) {
              if (empleadosBD[i].codigo == pNuevaTarea.empleado) {
                empleado = dataStorageFactory.buscarEmpleadoPorCodigo(empleadosBD[i].codigo);
              }
            }
      
            registroExitoso = dataStorageFactory.agregarTarea(pNuevaTarea);
            
            dataStorageFactory.agregarTareaEmpleado(empleado.codigo, pNuevaTarea);
        
            
            return registroExitoso;
          };

  
  }
})();