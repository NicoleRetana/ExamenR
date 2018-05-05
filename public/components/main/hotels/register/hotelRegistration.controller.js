(() => {
  'use strict';
  angular
    .module('Hoteleria')
    .controller('hotelRegistrationController', hotelRegistrationController);

  hotelRegistrationController.$inject = ['$http', 'imageUpload', 'NgMap', 'Upload', 'hotelService'];

  function hotelRegistrationController($http, imageUpload, NgMap, Upload, hotelService) {
      const vm = this;

      vm.current = '';


    // carga de datos para las provincias, cantones y distritos
      vm.provincias = $http({
          method: 'GET',
          url: './sources/data/provincias.json'
      }).then((success) => {
          vm.provincias = success.data;
      }, (error) => {
          console.log("Ocurrió un error " + error.data);
      });

      vm.loadCantones = (pidProvincia) => {
          vm.cantones = $http({
              method: 'GET',
              url: './sources/data/cantones.json'
          }).then((success) => {
              let cantones = [];
              for (let i = 0; i < success.data.length; i++) {
                  if (pidProvincia == success.data[i].idProvincia) {
                      cantones.push(success.data[i]);
                  }
              }
              vm.cantones = cantones;
          }, (error) => {
              console.log("Ocurrió un error " + error.data)
          });
      }

      vm.loadDistritos = (pidCanton) => {
          vm.distritos = $http({
              method: 'GET',
              url: './sources/data/distritos.json'
          }).then((success) => {
              let distritos = [];
              for (let i = 0; i < success.data.length; i++) {
                  if (pidCanton == success.data[i].idCanton) {
                      distritos.push(success.data[i]);
                  }
              }
              vm.distritos = distritos;
          }, (error) => {
              console.log("Ocurrió un error " + error.data);
          });
      }

      NgMap.getMap("map").then((map) => {
          console.log(map.getCenter());
          console.log('markers', map.markers);
          console.log('shapes', map.shapes);
          vm.map = map;
      });

      vm.getCurrentLocation = ($event) => {
          let postion = [$event.latLng.lat(), $event.latLng.lng()];
          console.log(postion);
          vm.current = postion;
      }

      vm.newHotel = {};

      vm.cloudObj = imageUpload.getConfiguration();

      vm.preRegisterHotel = (pnewHotel) => {
          vm.cloudObj.data.file = pnewHotel.photo[0];
          Upload.upload(vm.cloudObj).success((data) => {
              vm.registerHotel(pnewHotel, data.url);
          });
      }

      vm.registerHotel = (pnewHotel, urlImage) => {
          pnewHotel._id = 0;
          pnewHotel.latitude = vm.current[0];
          pnewHotel.longitude = vm.current[1];
          pnewHotel.photo = urlImage;
          console.log(pnewHotel);

          let newHotel = Object.assign(new Hotel(), pnewHotel);

          let success = hotelService.setHotel(newHotel);

          if (success == true) {
              swal({
                  title: "Registro exitoso",
                  text: "El usuario se ha registrado correctamente",
                  icon: "success",
                  button: "Aceptar"
              });
              vm.newHotel = null;
          } else {
              swal({
                  title: "Registro fallido",
                  text: "Ha ocurrido un error, inténtelo nuevamente más tarde",
                  icon: "error",
                  button: "Aceptar"
              });
          }
      }

  }
})();