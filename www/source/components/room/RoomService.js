'use strict'

angular
	.module('lilotech')
	.service("RoomService", RoomService);

RoomService.$inject = ['ApiService', '$q', 'BaseUrl', 'localStorageService'];

function RoomService(ApiService, $q, BaseUrl, localStorageService) {
	var vm = this;

    vm.getRooms = _getRooms;
	vm.getRoom = _getRoom;

	vm.Room = [];

	function _getRooms(){
        return ApiService.getArrayRequest(localStorageService.get('baseUrlDevice') + '/api/getrooms',false);
	}

    function _getRoom(room_id){
    	return ApiService.getRequest(localStorageService.get('baseUrlDevice') + '/api/getroom/'+room_id,null);
    }
}