(() => {
  angular
  .module('Hoteleria')
  .controller('userRegistrationController', userRegistrationController);

  userRegistrationController.$inject = ['userService'];

  function userRegistrationController(userService){
    const vm = this;
    vm.newUser = {};

    vm.registerUser = (pNewUser) => {
      pNewUser.userRole = 2;
      let newUser = Object.assign(new Client(), pNewUser);
      let success = userService.setUser(newUser);

      if(success == true){
        swal({
          title: "Registro Exitoso",
          text: "El usuario se ha registrado correctamente",
          icon: "sucess",
          button: "Aceptar",
        });
        vm.newUser = null;
      }else{
        swal({
          title: "Registro Fallido",
          text: "Ha ocurrido un error, inténtelo más tarde",
          icon: "error",
          button: "Aceptar",
        })
      }
    }
  }
})();