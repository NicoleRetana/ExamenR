(() => {
  'use strict';
  angular
    .module('Hoteleria')
    .controller('mainController', mainController);

    mainController.$inject = ['$state', 'loginService']

  function mainController($state, loginService){
    let vm = this;

    vm.authUser = loginService.getAuthUser();
    vm.userRole = vm.authUser.getUserRole();

    if(!vm.authUser){
      $state.go('logIn');
    }
  }
})();