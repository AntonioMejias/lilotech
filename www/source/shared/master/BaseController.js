/* global */
'use strict';

angular
    .module('lilotech')
    .controller("BaseController", BaseController);

BaseController.$inject = ['Rooms', 'localStorageService', 'UtilService', '$state', '$stateParams', '$ionicPopup'];

function BaseController(Rooms, localStorageService, UtilService, $state, $stateParams, $ionicPopup) {
    var vm = this;
    constructor();

    function constructor() {
        vm.onClickBack = _onClickBack;
        vm.onClickDetail = _onClickDetail;
        vm.idRoomSelected = $stateParams.idRoom;


        vm.obj = UtilService.utilObject;

        if (Rooms === null) {
            vm.classHeader = "bar-header-lg";
            vm.onClickModal = _onClickModal;
        } else {
            //console.log(Rooms);
            vm.rooms = Rooms;
        }
    }

    function _onClickBack() {

        $state.go('home');

    }

    function _onClickDetail(idRoom){
        $state.go('principal', {"idRoom" : idRoom});

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
                    localStorageService.clearAll();
                    console.log(localStorageService.get("jwtToken"));
                    $state.go('index');
                }
            });

    }
}