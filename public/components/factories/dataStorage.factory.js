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
          updateEmpleadoData: _updateEmpleadoData,
          
          sendMail: _sendMail,
          agregarTarea: _agregarTarea,
          retornarTareas: _retornarTareas,
          updateTareaData: _updateTarea
          
          

           

         
          
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
                  'estado': data.getEstado()
                 
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


      function _agregarTarea(data){
        let response;

        let peticion = $.ajax({
            url: 'http://localhost:4000/api/registrar_tarea',
            type: 'post',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            dataType: 'json',
            async: false,
            data: {
                'nombreTarea': data.nombreTarea,
                'descripcion': data.descripcion,
                'fecha': data.fecha,
                'prioridad': data.prioridad,
                'estado': data.estado,
                'costo': data.costo,
                'proyecto': data.proyecto,
                'estadoTarea': data.getEstadoTarea()
               
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
              empleados.forEach(objEmpleado => {
                let empleadoTemp = Object.assign(new Empleado(), objEmpleado);
      
                
          });
          peticion.fail(() => {
              empleadosBD = [];
              console.log('Error en la petición');
          });
        
        });
        return empleadosBD;
    }


    
    function _retornartareas(){
      let tareasBD = [];

      let peticion = $.ajax({
          url: 'http://localhost:4000/api/retornar_tareas',
          type: 'get',
          contentType: 'application/x-www-form-urlencoded; charset=utf-8',
          dataType: 'json',
          async: false,
          data: {}                
      });

      peticion.done((tareas) => {
          tareasBD = tareas;
          tareas.forEach(objTarea => {
            let tareaTemp = Object.assign(new Tarea(), objTarea);
  
            
      });
      peticion.fail(() => {
          tareasBD = [];
          console.log('Error en la petición');
      });
    
    });
    return tareasBD;
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

    

    function _obtenerListaPorEstados(pestado) {
        let listaEmpleados = _obtenerlistadeEmpleados(),
            listaFiltrada = [];
  
        for(let i = 0; i < listaEmpleados.length; i++){
          if(listaEmpleados[i].getEstado() == pestado){
            listaFiltrada.push(listaEmpleados[i]);
          }
        }
        return listaFiltrada;
      }


   

    function _updateEmpleadoData(data) {
        let response;
  
        let petition = $.ajax({
          url: 'http://localhost:4000/api/actualizar_empleado',
          type: 'put',
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
            'estado': data.estado,
                
          }
        });
  
        petition.done((datos) => {
          response = datos.success;
          console.log('Petición realizada con éxito');
        });
        petition.fail(error => {
          response = error;
          console.log('Ocurrió un error');
        });
  
        return response;
      }


      function _updateTareaData(data) {
        let response;
  
        let petition = $.ajax({
          url: 'http://localhost:4000/api/actualizar_tarea',
          type: 'put',
          contentType: 'application/x-www-form-urlencoded; charset=utf-8',
          dataType: 'json',
          async: false,
          data: {
            'nombreTarea': data.nombreTarea,
            'descripcion': data.descripcion,
            'fecha': data.fecha,
            'prioridad': data.prioridad,
            'estado': data.estado,
            'costo': data.costo,
            'proyecto': data.proyecto,
            'estadoTarea': data.estadoTarea,
                
          }
        });
  
        petition.done((datos) => {
          response = datos.success;
          console.log('Petición realizada con éxito');
        });
        petition.fail(error => {
          response = error;
          console.log('Ocurrió un error');
        });
  
        return response;
      }



   
    
  }
})();