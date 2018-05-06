(() => {
  'use strict';
  angular
    .module('Hoteleria')
    .controller('hotelsEditController', hotelsEditController);

  hotelsEditController.$inject = ['$http', '$stateParams', '$state', 'hotelsService'];

  function usersEditController($http, $stateParams, $state, hotelsService) {

    let vm = this;

    vm.newHotelData = {};

    let userParams = JSON.parse($stateParams.objTempUser);
    let selectedHotel = Object.assign(new Hotel(), userParams);

    vm.newHotelData.hotelName = selectedHotel.hotelName;
    vm.newHotelData.photo = selectedHotel.secondName;
    vm.newHotelData.latitude = selectedHotel.latitude;
    vm.newHotelData.longitude = selectedHotel.longitude;
    vm.newHotelData.provincia = selectedHotel.provincia;
    vm.newHotelData.canton = selectedHotel.canton;
    vm.newHotelData.distrito = selectedHotel.distrito;
    vm.newHotelData.address = selectedHotel.address;
    vm.newHotelData.phone = selectedHotel.phone;
    vm.newHotelData.custServEmail = selectedHotel.custServEmail;
    vm.newHotelData.reservEmail = selectedHotel.reservEmail;
    vm.newHotelData.reservPhone = selectedHotel.reservPhone;

    vm.actualizarEmpleado = (pupdatehotel) => {
      let success = userService.actualizarEmpleado(pupdatehotel);
    };
  }
})();