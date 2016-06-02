/* global */
'use strict';

angular
    .module('lilotech')
    .controller("LoginController_2", LoginController_2);

LoginController_2.$inject = ['LoginService_2', 'ApiService2','UtilService', '$state', '$scope', 'ionicToast', '$http', 'localStorageService'];

function LoginController_2(LoginService_2, ApiService2,UtilService, $state, $scope, ionicToast, $http, localStorageService) {

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
            }
            /*toast = document.querySelector('.ionic_toast');
            toast.setAttribute("id", "custom_toast");*/


        manillaElement = document.getElementById('manillaButton');
        manillaElement.addEventListener("transitionend", _animateTheDoor, true);
        vm.onClickLogin = _onClickLogin;
    }

    function _onClickLogin() {

        LoginService_2
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

        var jwtToken;

        vm.cargando = true;
        LoginService_2
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
                        console.log(response);

                        localStorageService.set(jwtToken, response.data.token);
                        ApiService2
                            .getArrayRequest('/api/getdevices',false)
                            .then(function (response) {
                                var device = response[0].Device;
                                var data = {token:device.token}
                                ApiService2.changeApiPath('device',device);
                                //ApiService2.changeApiPath();
                                //console.log(response);
                                return  ApiService2.postRequest('/api/logintoken',data,false,'urlencoded');
                                
                            })
                            .then (function (response) {
                                localStorageService.set(jwtToken, response.token);
                                console.log(response.token);
                                return  ApiService2.getArrayRequest('/api/getrooms',false);
                                
                            })
                            .then(function(response) {
                                console.log(response);

                                response.forEach(function (element) {
                                    console.log("Mi nombre es: " +element.Room.name);
                                })
                                return  ApiService2.getRequest('/api/getroom/:room_id',{room_id:1});
                            })
                            .then(function(response) {
                                console.log(response);
                            })

                        //$state.go('home');
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