/* global */
'use strict';

angular
    .module('lilotech')
    .controller("BaseController", BaseController);

BaseController.$inject = ['Rooms','localStorageService', '$state', '$stateParams', '$ionicPopup'];

function BaseController(Rooms,localStorageService, $state, $stateParams, $ionicPopup) {
    var vm = this;
    constructor();

    function constructor() {
        vm.onClickBack = _onClickBack;
        vm.idRoomSelected = $stateParams.idRoom;

        if (Rooms === null) {
            vm.classHeader = "bar-header-lg";
            vm.onClickModal = _onClickModal;
        } else {
            vm.rooms = Rooms;
        }
    }

    function _onClickBack() {

        $state.go('home');

    }

    function _onClickModal() {
        var confirmPopup = $ionicPopup.confirm({
            title: '',
            templateUrl: 'source/components/modal/modalView.html',
            cancelText: 'Cancelar',
            okText: 'Salir'
        });

        confirmPopup
            .then(function(answer) {
                if (answer) {
                    localStorageService.set("jwtToken",'');
                    console.log(localStorageService.get("jwtToken"));
                    $state.go('index');
                }
            });

    }
}