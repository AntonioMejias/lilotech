/* global */
'use strict';

angular
    .module('lilotech')
    .controller("HomeController", HomeController);

HomeController.$inject = ['MockService','$state', 'RoomService'];

function HomeController(MockService, $state, RoomService) {

    var vm = this;
    constructor();

    function constructor(){
    	console.log("home");
        vm.onClickDetail = _onClickDetail;

        RoomService.getRooms().then(function(response) {
            vm.rooms = response;
        });
    }

    function _onClickDetail(idRoom){
    	$state.go('detail', {"idRoom" : idRoom});
    }
}