/* global */
'use strict';

angular
    .module('lilotech')
    .controller("LoginController", LoginController);

LoginController.$inject = ['LoginService','UtilService', '$state', '$scope', 'ionicToast', 'localStorageService', 'DeviceService'];

function LoginController(LoginService, UtilService, $state, $scope, ionicToast, localStorageService, DeviceService) {

    var vm = this;
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
        vm.user.email = "lilo@lilotechnology.com";
        vm.user.password = "asdasd";

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
                        vm.cargando = false;
                        vm.animate.puerta = "";
                        vm.animate.manilla = "";
                        ionicToast.show('Email o Contraseña incorrecta', 'bottom', false, 2000);
                    } else {

                        localStorageService.set("jwtToken", response.data.token);

                        DeviceService.getDeviceToken().then (
                            function (response) {
                                localStorageService.set("jwtToken", response.token);                                
                                $state.go('home');
                            },
                            function(error){
                                console.log(error);
                            }
                        );

                    }

                },
                function(error) {
                    console.log(error);
                }
            );
    }

    function _animateTheDoor(argument) {
        console.log("termino la transition");
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