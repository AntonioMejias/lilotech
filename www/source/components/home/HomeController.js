/* global */
'use strict';

angular
    .module('lilotech')
    .controller("HomeController", HomeController);

HomeController.$inject = ['MockService','$state', 'RoomService', 'localStorageService'];

function HomeController(MockService, $state, RoomService, localStorageService) {

    var vm = this;
    vm.prueba = 0;
    constructor();

    function constructor(){
    	vm.cargando = true;
        vm.onClickDetail = _onClickDetail;
        vm.aumentar = _aumentar;

        RoomService.getRooms().then(function(response) {
            vm.rooms = response;
            vm.cargando = false;
            console.log("cargado los cuartos");
        });
    }

    function _onClickDetail(idRoom){
        console.log("probando");
        //localStorageService.set('lastRoomSelected', idRoom);
    	$state.go('principal', {"idRoom" : idRoom});
    }


    function _aumentar (argument) {
            vm.prueba++;
    }

}