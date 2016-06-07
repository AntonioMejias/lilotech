/* global */
'use strict';

angular
    .module('lilotech')
    .controller("PrincipalController", PrincipalController);

PrincipalController.$inject = ['RoomService', '$stateParams', 'MockService'];

function PrincipalController(RoomService, $stateParams, MockService, $ImageCacheFactory) {

    var vm = this;
    constructor();

    function constructor(){
        var idRoom = $stateParams.idRoom;
        vm.prueba = 0;

        if(idRoom){
            //Existe un idRoom
           /* RoomService.getRoom(idRoom).then(
                function(response){
                    vm.Client = response.Client;
                    vm.Room = response.Room;

                    console.log("Client", vm.Client);
                    console.log("Room", vm.Room);
                }, 
                function(error){
                    console.log(error);
                }
            );*/
        }else{
            //idRoom === undefined
        }

        vm.elementsD = MockService.elementsD;
        vm.aumentar = _aumentar;

        
    }

    function _aumentar (argument) {
            vm.prueba++;
    }

}