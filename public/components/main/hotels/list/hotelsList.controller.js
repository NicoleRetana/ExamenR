(() => {
  angular
  .module('Hoteleria')
  .controller('hotelsListController', hotelsListController);

  hotelsListController.$inject =['$state','hotelService','loginService'];

  function hotelsListController($state, hotelService, loginService){
    const vm = this;
    
    vm.allHotels = hotelService.getHotel();

    console.log(vm.allHotels);
  }
})();