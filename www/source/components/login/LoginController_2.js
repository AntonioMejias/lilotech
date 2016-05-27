/* global */
'use strict';

angular
    .module('lilotech')
    .controller("LoginController_2", LoginController_2);

LoginController_2.$inject = ['LoginService_2', '$state', '$scope', 'ionicToast', '$http'];

function LoginController_2(LoginService_2, $state, $scope, ionicToast, $http) {

    var vm = this;
    constructor();

    function constructor() {
        var manillaElement;
        vm.cargando = false;
        vm.user = {};
        vm.animate = {
            "cerradura": '',
            "puerta": '',
            "manilla": ''
        }

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
                /*$cordovaToast.show(response.message, 'short', 'bottom').then(function(success) {
                    console.log("The toast was shown");
                }, function(error) {
                    console.log("The toast was not shown due to " + error);
                });*/

                ionicToast.show(response.message, 'bottom', false, 1500);

                console.log(response.message);
            })
    }

    function _login() {
        vm.cargando = true;
        LoginService_2
            .login(vm.user)
            .then(function(response) {
                console.log("existe una respuesta");
                    if(!response.data.result) {
                        vm.cargando = false;
                        vm.animate.puerta = "";
                        vm.animate.manilla = "";
                        ionicToast.show('Email o Contraseña incorrecta', 'bottom', false, 2000);
                    } else {
                        $state.go('home');
                    }
                    
                },
                function(error) {
                    console.log(error);
                }
            );

        /*var request = {
            url: 'https://device.lilotechnology.com/api/login',
            data: vm.user,
            config: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: function(obj) {
                    var str = [];
                    for (var p in obj)
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    return str.join("&");
                }
            }
        }

        //self.animate.manilla = 'cerraduraAnimate';

        $http
            .post(request.url, request.data, request.config)
            .then(function(response) { // success callback
                    console.log(response);
                },
                function(response) { // failure callback

                })*/
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