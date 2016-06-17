/* global */
'use strict';

angular
    .module('lilotech')
    .controller("LoginController", LoginController);

LoginController.$inject = ['$rootScope','LoginService', 'RoomService', 'UtilService', '$state', '$scope', 'ionicToast', 'localStorageService', 'DeviceService'];

function LoginController($rootScope, LoginService, RoomService, UtilService, $state, $scope, ionicToast, localStorageService, DeviceService) {

    var vm = this;
    sessionRedirect();
    constructor();

    function constructor() {
        var manillaElement;
        var toast;
        vm.cargando = false;
        vm.user = {};
        vm.animate = {
            "cerradura": '',
            "puerta": '',
            "manilla": ''
        };

        manillaElement = document.getElementById('manillaButton');
        manillaElement.addEventListener("transitionend", _animateTheDoor, true);
        vm.onClickLogin = _onClickLogin;


        //Only Debug Mode
        //vm.user.email = "lilo@lilotechnology.com"; //"antonio@hostienda.com"
        //vm.user.password = "asdasd";

        /*$rootScope.$on("$ionicView.beforeEnter", function(event, data) {
            // handle event
            console.log("HOLAAAAAAAAAAAAAAAAAA");
        });*/

    }

    function _onClickLogin() {

        LoginService
            .validateEmptyInput(vm.user)
            .then(function(success) { //success
                console.log("campos bien");
                vm.animate.manilla = 'manillaAnimate';
            }, function(response) { // error

                ionicToast.show(response.message, 'bottom', false, 1500);


                console.log(response.message);
            })
    }

    function _login() {

        vm.cargando = true;
        LoginService
            .login(vm.user)
            .then(function(response) {
                var data;
                console.log("existe una respuesta");
                if (!response.data.result) {
                    _cleanAnimation();
                    ionicToast.show('Email o Contraseña incorrecta', 'bottom', false, 2000);
                } else {

                    localStorageService.set("jwtToken", response.data.token);

                    return DeviceService.getDeviceToken(); //Retorna una promesa
                }
            }, function(error) {
                _cleanAnimation();
                console.log(error);
            })
            .then(function(response) {
                localStorageService.set("jwtToken", response.token);

                return RoomService.getRooms(); //Retorna una promesa

            }, function(error) {
                if (error.NotDeviceException) {
                    _cleanAnimation();
                    ionicToast.show('Su cuenta no posee ningún dispositivo asociado', 'bottom', false, 2000);
                } else
                    console.log(error);
            })
            .then(function(rooms) {
                if (rooms.length > 0)
                    $state.go('principal', {
                        "idRoom": rooms[0].Room.id
                    })
                else
                    $state.go('principal', {
                        "idRoom": false
                    });
            }, function(error) {
                _cleanAnimation();
                console.log(error);
            })
    }

    function sessionRedirect() {

    }

    function _cleanAnimation() {
        vm.cargando = false;
        vm.animate.puerta = "";
        vm.animate.manilla = "";
    }

    function _animateTheDoor(argument) {
        $scope.$apply(function() {
            vm.animate.puerta = "openingDoor";
            setTimeout(function() {
                $scope.$apply(function() {
                    _login()
                });
            }, 750)
        });
    }
}