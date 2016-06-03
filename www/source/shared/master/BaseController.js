/* global */
'use strict';

angular
    .module('lilotech')
    .controller("BaseController", BaseController);

BaseController.$inject = ['Rooms' ,'$state', '$stateParams'];

function BaseController(Rooms, $state, $stateParams) {
    var vm = this;
    constructor();

    function constructor(){
        vm.onClickBack = _onClickBack;
        vm.idRoomSelected = $stateParams.idRoom;
                
    	if(Rooms === null){
    		vm.classHeader = "bar-header-lg";
    	}else{
            vm.rooms = Rooms;
    	}
        
    	console.log("base");
    }

    function _onClickBack(){

        $state.go('home');
       
    }
}