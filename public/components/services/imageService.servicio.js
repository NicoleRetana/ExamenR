(()=>{
  'use strict';
  angular
  .module('randajad')
  .service('imageService', imageService);
  
  imageService.$inject = ['$http'];
  
  function imageService($http){

    let cloudObj = {
      url:'https://api.cloudinary.com/v1_1/dilbn0a8p/image/upload',
      data:{
        upload_preset: 'empleados',
        tags:'Any',
        context:'photo=test'
      }
    };

    let publicAPI = {
      getConfiguration: _getConfiguration
    }
    return publicAPI;

    function _getConfiguration(){
      return cloudObj;
    }
  }
})();