/* global */
'use strict';

angular
    .module('lilotech')
    .controller("DetailController", DetailController);

DetailController.$inject = ['RoomService', '$stateParams', 'MockService'];

function DetailController(RoomService, $stateParams, MockService) {

    var vm = this;
    constructor();

    function constructor(){
        var idRoom = $stateParams.idRoom;

        if(idRoom){
            //Existe un idRoom
            RoomService.getRoom(idRoom).then(
                function(response){
                    vm.Client = response.Client;
                    vm.Room = response.Room;

                    console.log("Client", vm.Client);
                    console.log("Room", vm.Room);
                }, 
                function(error){
                    console.log(error);
                }
            );
        }else{
            //idRoom === undefined
        }

        vm.elementsD = MockService.elementsD;

    }


}