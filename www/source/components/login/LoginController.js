/* global */
'use strict';

angular
    .module('lilotech')
    .controller("LoginController", LoginController);

LoginController.$inject = ['LoginService', 'ApiService','UtilService', '$state', '$scope', 'ionicToast', '$http', 'localStorageService'];

function LoginController(LoginService, ApiService,UtilService, $state, $scope, ionicToast, $http, localStorageService) {

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

        var jwtToken;

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
                        console.log(response);

                        localStorageService.set(jwtToken, response.data.token);
                        ApiService
                            .getArrayRequest('/api/getdevices',false)
                            .then(function (response) {
                                var device = response[0].Device;
                                var data = {token:device.token}
                                ApiService.changeApiPath('device',device);
                                //ApiService.changeApiPath();
                                //console.log(response);
                                return  ApiService.postRequest('/api/logintoken',data,false,'urlencoded');
                                
                            })
                            .then (function (response) {
                                localStorageService.set(jwtToken, response.token);
                                //UtilService.prueba = "estoy comunicando mis controladores";
                                $state.go('detail');
                                console.log(response.token);
                                //return  ApiService.getArrayRequest('/api/getrooms',false);
                                
                            })


                        //$state.go('detail');
                    }

                    /*ApiService
                        .getArrayRequest('/api/getrooms',false)
                        .then(function(response) {
                                    console.log(response);

                                    response.forEach(function (element) {
                                        console.log("Mi nombre es: " +element.Room.name);
                                    })
                                    //return  ApiService.getRequest('/api/getroom/:room_id',{room_id:1});
                                })
                        .then(function(response) {
                                console.log(response);

                                response.forEach(function (element) {
                                    console.log("Mi nombre es: " +element.Room.name);
                                })
                                return  ApiService.getRequest('/api/getroom/:room_id',{room_id:1});
                            })
                        .then(function(response) {
                                console.log(response);
                            })*/

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