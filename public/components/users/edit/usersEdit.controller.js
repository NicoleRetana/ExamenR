(() => {
  'use strict';
  angular
    .module('Hoteleria')
    .controller('usersEditController', usersEditController);

  usersEditController.$inject = ['$http', '$stateParams', '$state', 'userService'];

  function usersEditController($http, $stateParams, $state, userService) {

    let vm = this;

    vm.newUserData = {};

    let userParams = JSON.parse($stateParams.objTempUser);
    let selectedUser = Object.assign(new Client(), userParams);

    vm.newUserData.id = selectedUser.id;
    vm.newUserData.firstName = selectedUser.firstName;
    vm.newUserData.secondName = selectedUser.secondName;
    vm.newUserData.firstSurname = selectedUser.firstSurname;
    vm.newUserData.secondSurname = selectedUser.secondSurname;
    vm.newUserData.email = selectedUser.email;
    vm.newUserData.password = selectedUser.password;
    vm.newUserData.birthdate = new Date(selectedUser.birthdate);
    vm.newUserData.phone = selectedUser.phone;

    vm.updateUserData = (pupdateuser) => {
      let success = userService.updateUser(pupdateuser);
    };
  }
})();