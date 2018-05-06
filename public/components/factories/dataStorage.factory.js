(() => {
  'use strict'

  angular
  .module('randajad')
  .factory('dataStorageFactory', dataStorageFactory);

  dataStorageFactory.$inject = [];
  function dataStorageFactory(){
      let dataAPI = {
          agregarEmpleado: _agregarEmpleado,
          retornarEmpleados: _retornarEmpleados,
          actualizarEmpleado: _actualizarEmpleado,
          
          sendMail: _sendMail,

          crearSesion: _crearSesion,
          eliminarSesion: _eliminarSesion,
          retornarSesionActiva: _retornarSesionActiva
          
      }
      return dataAPI

      function _agregarEmpleado(data){
          let response;

          let peticion = $.ajax({
              url: 'http://localhost:4000/api/registrar_empleado',
              type: 'post',
              contentType: 'application/x-www-form-urlencoded; charset=utf-8',
              dataType: 'json',
              async: false,
              data: {
                  'nombreCompleto': data.nombreCompleto,
                  'codigo': data.codigo,
                  'photo': data.photo,
                  'fecha': data.fecha,
                  'edad': data.edad,
                  'correo': data.correo,
                  'contrasena': data.contrasena,
                  
              }
          });
          peticion.done((datos) => {
              response = datos.success;
          });
          peticion.fail((err) => {
              response = err
          });
          return response;
      }

      function _retornarEmpleados(){
          let empleadosBD = [];

          let peticion = $.ajax({
              url: 'http://localhost:4000/api/retornar_empleados',
              type: 'get',
              contentType: 'application/x-www-form-urlencoded; charset=utf-8',
              dataType: 'json',
              async: false,
              data: {}                
          });

          peticion.done((empleados) => {
              empleadosBD = empleados;
          });
          peticion.fail(() => {
              empleadosBD = [];
              console.log('Error en la petición');
          });
          return empleadosBD
      }

      
    function _sendMail(data) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/mail',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'to': data.to,
          'subject': data.subject,
          'text': data.text
        }
      });

      peticion.done((datos) => {
        console.log(datos);
      });
      peticion.fail((error) => {
        response = error;
        console.log(error);
      });
    }

    function _actualizarEmpleado(data){
        let response;

        let peticion = $.ajax({
            url: 'http://localhost:4000/api/update_empleado',
            type: 'put',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            async: false,
            data: {
                'nombreCompleto': data.nombreCompleto,
                'codigo': data.codigo,
                'photo': data.photo,
                'fecha': data.fecha,
                'correo': data.correo,
                'contrasena': data.contrasena,
               
            }
        });
        peticion.done((datos) => {
            response = datos.success;
        });
        peticion.fail((err) => {
            response = err
        });
        return response;
    }
    function _crearSesion(key, value){
        let exito = true;
        sessionStorage.setItem(key, JSON.stringify(value));

        return exito
    }

    function _eliminarSesion(key){
        sessionStorage.removeItem(key);
    }

    function _retornarSesionActiva(key){
        return JSON.parse(sessionStorage.getItem(key));
    }
    
  }
})();