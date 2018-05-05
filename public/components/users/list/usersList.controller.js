(() => {
  angular
  .module('Hoteleria')
  .controller('usersListController', usersListController);

  usersListController.$inject = ['$stateParams', '$state','userService'];

  function usersListController($stateParams, $state, userService){
    const vm = this;
    vm.usersList = listDBUsers();

    function listDBUsers(){
      let dbUserList = userService.getUsers();
      let users=[];
      dbUserList.forEach(user =>{
        if(user.userRole == '2'){
          users.push(user);
        }
      });
      return users;
    }
    vm.edit = (pUser) => {
      // console.log(pUser);
      $state.go('usersEdit', { objTempUser: JSON.stringify(pUser) })
    }
  }
})();