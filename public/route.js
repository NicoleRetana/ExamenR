(() => {
  'use strict'
  angular
    .module('appRoutes', ['ui.router', 'oc.lazyLoad', 'uiRouterTitle'])
    .config(routing);

  routing.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routing($stateProvider, $urlRouterProvider, $oclazyLoad) {
    $stateProvider
      .state('landingPage', {
        url: '/',
        templateUrl: './components/landingPage/landingPage.view.html',
        data: {
          pageTitle: 'Inicio'
        }
      })

      .state('registroEmpleados', {
        url: '/registroEmpleados',
        templateUrl: './components/empleados/RegistrarEmpleados/registroEmpleados.vista.html',
        data: {
          pageTitle: 'Randajad| Registro de empleados'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/empleados/RegistrarEmpleados/registroEmpleados.controlador.js')
          }]
        },
        controller: 'controladorRegistroEmpleados',
        controllerAs: 'vm'
      })


      .state('registroTareas', {
        url: '/registroTareas',
        templateUrl: './components/tareas/RegistrarTareas/registroTareas.vista.html',
        data: {
          pageTitle: 'Randajad| Registro de tareas'
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/tareas/RegistrarTareas/registroTareas.controlador.js')
          }]
        },
        controller: 'controladorRegistroTareas',
        controllerAs: 'vm'
      })

      .state('listaEmpleados', {
        url: '/listaEmpleados',
        templateUrl: './components/empleados/listarEmpleados/listarEmpleados.vista.html',
        data: {
          pageTitle: 'Lista de empleados'
        },
        params: {
          tempEmpleado: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/empleados/listarEmpleados/listarEmpleados.controlador.js')
          }]
        },
        controller: 'listaEmpleadosControlador',
        controllerAs: 'vm'
      })

      .state('listaTareas', {
        url: '/listaTareas',
        templateUrl: './components/tareas/ListarTareas/listarTareas.vista.html',
        data: {
          pageTitle: 'Lista de tareas'
        },
        params: {
          tempEmpleado: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/tareas/ListarTareas/listarTareas.controlador.js')
          }]
        },
        controller: 'listaTareasControlador',
        controllerAs: 'vm'
      })
     


      .state('listaEmpleadosDeshabilitados', {
        url: '/listaEmpleadosDeshabilitados',
        templateUrl: './components/empleados/empleadosDeshabilitados/listarDeshabilitados.vista.html',
        data: {
          pageTitle: 'Lista de empleados'
        },
        params: {
          tempEmpleado: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/empleados/empleadosDeshabilitados/listarDeshabilitados.controller.js')
          }]
        },
        controller: 'empleadosDeshabilitadosControlador',
        controllerAs: 'vm'
      })
      .state('modificarEmpleados', {
        url: '/modificarEmpleado',
        templateUrl: './components/empleados/modificarEmpleados/modificarEmpleado.vista.html',
        data: {
          pageTitle: 'Modificsr empleados'
        },
        params: {
          tempEmpleado: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/empleados/modificarEmpleados/modificarEmpleado.controlador.js')
          }]
        },
        controller: 'controladorModificarEmpleado',
        controllerAs: 'vm'
      })

      .state('modificarTarea', {
        url: '/modificarTarea',
        templateUrl: './components/tareas/ModificarTareas/modificarTarea.vista.html',
        data: {
          pageTitle: 'Modificar tareas'
        },
        params: {
          tempTarea: ''
        },
        resolve: {
          load: ['$ocLazyLoad', ($ocLazyLoad) => {
            return $ocLazyLoad.load('./components/tareas/ModificarTareas/modificarTarea.controlador.js')
          }]
        },
        controller: 'controladorModificarTarea',
        controllerAs: 'vm'
      })

      
      


    $urlRouterProvider.otherwise('/');
  }
})();