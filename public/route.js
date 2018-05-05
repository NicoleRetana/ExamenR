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

     

     

      
      


    $urlRouterProvider.otherwise('/');
  }
})();