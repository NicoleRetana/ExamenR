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

         

          crearSesion: _crearSesion,
          empleadoActivo: _empleadoActivo,
          borrarSesion: _borrarSesion,
          obtenerInfoEmpleado: _obtenerInfoEmpleado
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

      function _crearSesion(pcodigo){
        let exito = dataStorageFactory.crearSesion(key, pcodigo);

        return exito
    }

    function _actualizarEmpleado(pempleado){
        let exito = dataStorageFactory.actualizarEmpleado(pempleado);
        return exito
    }
    
    function _empleadoActivo(){
        let sesionActiva = dataStorageFactory.retornarSesionActiva(key),
            codigoActivo;

        if(!sesionActiva){
            codigoActivo = undefined;
        }else{
            codigoActivo = sesionActiva;
        }
        return codigoActivo
    }

    function _obtenerInfoEmpleado(pcodigo){
        let empleadosBD = _retornarEmpleados(),
            empleadoActivo = [];

        for(let i=0; i<empleadosBD.length; i++){
            if(empleadosBD[i].getId() == pcodigo){
                empleadoActivo = empleadosBD[i];
            }
        }
        return empleadoActivo
    }

    function _borrarSesion(){
        dataStorageFactory.eliminarSesion(key);
    }
  
  }
})();